#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use tauri_plugin_autostart::MacosLauncher;

#[macro_use]
mod commands;

use commands::PomatezExtras;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, None))
        .set_pomatez_system_tray()
        .register_pomatez_commands().run(tauri::generate_context!())
        .expect("error while running tauri application");
}
