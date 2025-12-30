#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::time::{Duration, Instant};
use tauri::{Manager, RunEvent, WindowEvent};
use tauri_plugin_window_state::{AppHandleExt, StateFlags, WindowExt};
use tauri_plugin_autostart::MacosLauncher;

#[macro_use]
mod commands;
mod global_shortcuts;
mod system_tray;
mod updater;

#[cfg(target_os = "macos")]
use crate::commands::try_set_native_titlebar;

use commands::PomatezCommands;
use global_shortcuts::{PomatezGlobalShortcutsRegister, PomatezGlobalShortcutsSetup};
use system_tray::PomatezTray;

fn main() {
    let mut context = tauri::generate_context!();

    let config = context.config_mut();

    let updater_enabled = config.plugins.0.contains_key("updater");

    let mut app = tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            None,
        ))
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init());

    if updater_enabled {
        app = app.plugin(tauri_plugin_updater::Builder::new().build());
    }

    let app = app
        .register_pomatez_commands()
        .setup(|app| {
            #[cfg(desktop)]
            {
                app.handle()
                    .plugin(tauri_plugin_window_state::Builder::default().build())?;
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.restore_state(StateFlags::all());
                    #[cfg(debug_assertions)]
                    {
                        static LAST_SAVE: std::sync::Mutex<Option<Instant>> =
                            std::sync::Mutex::new(None);
                        let app_handle = app.handle().clone();
                        window.on_window_event(move |event| {
                            if matches!(event, WindowEvent::Moved(_)) {
                                let mut last_save = LAST_SAVE.lock().unwrap();
                                if let Some(last) = *last_save {
                                    if last.elapsed() < Duration::from_millis(500) {
                                        return;
                                    }
                                }
                                *last_save = Some(Instant::now());
                                let _ = app_handle.save_window_state(StateFlags::all());
                            }
                        });
                    }
                }
                app.setup_global_shortcuts();
                app.set_pomatez_system_tray();
            }

            Ok(())
        })
        .build(context)
        .expect("error while running tauri application");

    #[cfg(desktop)]
    app.run(|app_handle, e| match e {
        RunEvent::Ready => {
            app_handle.register_global_shortcuts();

            #[cfg(any(target_os = "macos", debug_assertions))]
            let window = app_handle.get_webview_window("main").unwrap();

            // There is a bug on mac where the size is not properly respected initially, though this seems to fix it.
            #[cfg(target_os = "macos")]
            {
                try_set_native_titlebar(false, &window);
                try_set_native_titlebar(true, &window);
            }

            #[cfg(debug_assertions)]
            window.open_devtools();

            println!("Pomatez is ready");
        }
        _ => {}
    });
}
