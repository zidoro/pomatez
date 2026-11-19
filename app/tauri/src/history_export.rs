use std::{
    fs::{self, OpenOptions},
    io::{ErrorKind, Write},
    path::{Path, PathBuf},
    sync::atomic::{AtomicU64, Ordering},
};
use tauri::{Manager, Runtime};

static NEXT_TEMP: AtomicU64 = AtomicU64::new(0);

struct TemporaryExport(PathBuf);

impl Drop for TemporaryExport {
    fn drop(&mut self) {
        let _ = fs::remove_file(&self.0);
    }
}

fn dates_filename(filename: &str) -> bool {
    let Some(dates) = filename.strip_prefix("pomatez-").and_then(|f| f.strip_suffix(".jsonl"))
        else { return false };
    let Some((first, last)) = dates.split_once('_') else { return false };
    [first, last].iter().all(|date| {
        date.len() == 10 && date.bytes().enumerate().all(|(i, b)| {
            if i == 4 || i == 7 { b == b'-' } else { b.is_ascii_digit() }
        })
    })
}

fn write_new(downloads: &Path, filename: &str, contents: &str) -> std::io::Result<PathBuf> {
    let (temporary, mut file) = loop {
        let path = downloads.join(format!(
            ".pomatez-{}-{}.partial",
            std::process::id(),
            NEXT_TEMP.fetch_add(1, Ordering::Relaxed)
        ));
        let mut options = OpenOptions::new();
        options.write(true).create_new(true);
        #[cfg(unix)]
        {
            use std::os::unix::fs::OpenOptionsExt;
            options.mode(0o600);
        }
        match options.open(&path) {
            Ok(file) => break (TemporaryExport(path), file),
            Err(error) if error.kind() == ErrorKind::AlreadyExists => continue,
            Err(error) => return Err(error),
        }
    };
    file.write_all(contents.as_bytes())?;
    file.sync_all()?;
    drop(file);
    let stem = filename.trim_end_matches(".jsonl");
    for index in 0..1000 {
        let destination = if index == 0 { downloads.join(filename) }
            else { downloads.join(format!("{stem}-{index}.jsonl")) };
        match fs::hard_link(&temporary.0, &destination) {
            Ok(()) => return Ok(destination),
            Err(error) if error.kind() == ErrorKind::AlreadyExists => continue,
            Err(error) => return Err(error),
        }
    }
    Err(std::io::Error::new(ErrorKind::AlreadyExists, "Too many existing exports"))
}

#[tauri::command]
pub async fn save_history_jsonl<R: Runtime>(
    window: tauri::Window<R>,
    filename: String,
    contents: String,
) -> Result<String, String> {
    if window.label() != "main" || !dates_filename(&filename) ||
        !contents.starts_with("{\"record_type\":\"export_header\"") ||
        !contents.ends_with('\n') || contents.len() > 32 * 1024 * 1024 {
        return Err("Invalid history export request".into());
    }
    let downloads = window.path().download_dir().map_err(|error| error.to_string())?;
    tauri::async_runtime::spawn_blocking(move || {
        write_new(&downloads, &filename, &contents)
            .map(|destination| destination.to_string_lossy().into_owned())
            .map_err(|error| error.to_string())
    }).await.map_err(|error| error.to_string())?
}
