#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use tauri::RunEvent;
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_global_shortcut::GlobalShortcutExt;
use tauri_plugin_window;

#[macro_use]
mod commands;
mod system_tray;
mod global_shortcuts;

use commands::PomatezCommands;
use system_tray::PomatezTray;
use global_shortcuts::{PomatezGlobalShortcutsSetup, PomatezGlobalShortcutsRegister};

fn main() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, None))
        .plugin(tauri_plugin_window::init())
        .register_pomatez_commands()
        .setup(|app| {
            app.setup_global_shortcuts();
            app.set_pomatez_system_tray();

            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    app.run(|app_handle, e| match e {
        RunEvent::Ready => {
            app_handle.register_global_shortcuts();
            println!("Pomatez is ready");
        }
        _ => {}
    });
}
