use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::{Emitter, Manager, Runtime};
use tauri_plugin_updater::{Update, UpdaterExt};
use url::Url;

static UPDATE_INFO: Mutex<Option<Update>> = Mutex::new(None);

#[derive(Deserialize, Debug)]
struct LatestRelease {
    // While we could get the latest version or other info, we just want to find the tauri-release.json asset.
    assets: Vec<Asset>,
}

#[derive(Deserialize, Debug)]
struct Asset {
    name: String,
    browser_download_url: String,
}

#[derive(Serialize, Debug, Clone)]
struct UpdateAvailable {
    version: String,
    body: Option<String>,
}

#[tauri::command]
pub fn check_for_updates<R: Runtime>(ignore_version: String, window: tauri::Window<R>) {
    let handle = window.app_handle().clone();

    if !handle.config().plugins.0.contains_key("updater") {
        return;
    }

    println!("Current version: {}", handle.package_info().version);

    tauri::async_runtime::spawn(async move {
        println!("Searching for update file on github.");
        // Custom configure the updater.
        // If we use this endpoint even if the url changes e.g. org name change or project name change the updates should still follow.
        let github_releases_endpoint =
            "https://api.github.com/repos/zidoro/pomatez/releases/latest";
        let github_releases_endpoint = match Url::parse(github_releases_endpoint) {
            Ok(url) => url,
            Err(e) => {
                println!("Failed to parse url: {:?}. Failed to check for updates", e);
                return;
            }
        };
        let client = reqwest::Client::new();
        let req = client
            .get(github_releases_endpoint.clone())
            .header("Content-Type", "application/json")
            // If this is not set you will get a 403 forbidden error.
            .header("User-Agent", "pomatez");
        let response = match req.send().await {
            Ok(response) => response,
            Err(e) => {
                println!(
                    "Failed to send request: {:?}. Failed to check for updates",
                    e
                );
                return;
            }
        };

        if response.status() != reqwest::StatusCode::OK {
            println!(
                "Non OK status code: {:?}. Failed to check for updates",
                response.status()
            );
            return;
        }
        let latest_release = match response.json::<LatestRelease>().await {
            Ok(latest_release) => latest_release,
            Err(e) => {
                println!(
                    "Failed to parse response: {:?}. Failed to check for updates",
                    e
                );
                return;
            }
        };

        // Find an asset named "tauri-release.json".
        let tauri_release_asset = latest_release
            .assets
            .iter()
            .find(|asset| asset.name == "tauri-updater.json");

        // If we found the asset, set it as the updater endpoint.
        let tauri_release_asset = match tauri_release_asset {
            Some(tauri_release_asset) => tauri_release_asset,
            None => {
                println!("Failed to find tauri-release.json asset. Failed to check for updates\n\nFound Assets are:");
                // Print a list of the assets found
                for asset in latest_release.assets {
                    println!("  {:?}", asset.name);
                }
                return;
            }
        };

        let tauri_release_endpoint = match Url::parse(&tauri_release_asset.browser_download_url) {
            Ok(url) => url,
            Err(e) => {
                println!("Failed to parse url: {:?}. Failed to check for updates", e);
                return;
            }
        };
        let updater_builder = handle.updater_builder();

        let updater_builder = match updater_builder.endpoints(vec![tauri_release_endpoint]) {
            Ok(updater_builder) => updater_builder,
            Err(e) => {
                println!(
                    "Failed to set updater endpoints: {:?}. Failed to check for updates",
                    e
                );
                return;
            }
        };

        let updater_builder = match updater_builder.header("User-Agent", "pomatez") {
            Ok(updater_builder) => updater_builder,
            Err(e) => {
                println!(
                    "Failed to set updater headers: {:?}. Failed to check for updates",
                    e
                );
                return;
            }
        };

        let updater = match updater_builder.build() {
            Ok(updater) => updater,
            Err(e) => {
                println!(
                    "Failed to build updater: {:?}. Failed to check for updates",
                    e
                );
                return;
            }
        };

        println!("Checking for updates");

        let response = updater.check().await;

        println!("Update check completed: {}", response.is_ok());

        match response {
            Ok(Some(update)) => {
                if ignore_version == update.version {
                    println!("Ignoring update as user has asked to ignore this version.");
                    return;
                }
                UPDATE_INFO.lock().unwrap().replace(update.clone());

                match window.emit(
                    "UPDATE_AVAILABLE",
                    Some(UpdateAvailable {
                        version: update.version,
                        body: update.body,
                    }),
                ) {
                    Ok(_) => {}
                    Err(e) => {
                        println!("Failed to emit update available event: {:?}", e);
                    }
                }
            }
            _ => {}
        }
    });
}

#[tauri::command]
pub async fn install_update<R: Runtime>(_window: tauri::Window<R>) {
    println!("Downloading and installing update!");

    let update = match UPDATE_INFO.lock().unwrap().clone() {
        Some(update) => update,
        None => {
            println!("No update found to install");
            return;
        }
    };

    let install_response = update.download_and_install(|_, _| {}, || {}).await;
    if let Err(e) = install_response {
        println!("Failed to install update: {:?}", e);
    } else {
        println!("Update installed");
    }
}
