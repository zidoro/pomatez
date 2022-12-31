#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

#[macro_use]
mod commands;

use tauri::{Manager};
use commands::CommandRegister;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        }).register_pomatez_commands().run(tauri::generate_context!()).expect("error while running tauri application");
}
// fn register_commands<E>(app: Builder<Wry>) -> Builder<Wry> {
//     app.invoke_handler(tauri::generate_handler![greet])
// }
