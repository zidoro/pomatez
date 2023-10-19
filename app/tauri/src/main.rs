#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_window;

#[macro_use]
mod commands;

mod system_tray;
mod global_shortcuts;

use commands::PomatezCommands;
use system_tray::PomatezTray;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, None))
        .plugin(tauri_plugin_window::init())
        .register_pomatez_commands()
        .set_pomatez_system_tray()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
