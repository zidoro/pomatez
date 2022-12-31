#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

#[macro_use]
mod commands;

use commands::CommandRegister;

fn main() {
    tauri::Builder::default()
        .register_pomatez_commands().run(tauri::generate_context!())
        .expect("error while running tauri application");
}
