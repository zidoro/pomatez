

#[cfg(debug_assertions)]
use tauri::{Manager};
use tauri::{RunEvent};
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_window;

#[macro_use]
mod commands;
mod system_tray;
mod global_shortcuts;
mod updater;

use commands::PomatezCommands;
use system_tray::PomatezTray;
use global_shortcuts::{PomatezGlobalShortcutsSetup, PomatezGlobalShortcutsRegister};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, None))
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .register_pomatez_commands()
        .setup(|app| {
            #[cfg(desktop)]
            {
                app.setup_global_shortcuts();
                app.set_pomatez_system_tray();
            }

            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    app.run(|app_handle, e| match e {
        RunEvent::Ready => {
            #[cfg(desktop)]
            app_handle.register_global_shortcuts();

            #[cfg(debug_assertions)]
            app_handle.get_window("main").unwrap().open_devtools();

            println!("Pomatez is ready");
        }
        _ => {}
    });
}