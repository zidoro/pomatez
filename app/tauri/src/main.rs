#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager};
use tauri::{RunEvent};
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_window;

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

    let mut app = tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            None,
        ))
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init());



    if config.tauri.bundle.updater.active {
        app = app.plugin(tauri_plugin_updater::Builder::new().build());
    }

    let app = app
        .register_pomatez_commands()
        .setup(|app| {
            #[cfg(desktop)]
            {
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

            let window = app_handle.get_window("main").unwrap();

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
