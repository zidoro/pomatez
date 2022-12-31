
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri::{Builder, Wry};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn my_custom_command() {
    println!("I was invoked from JS!");
}

/**
 * We could do this by passing the object into a custom function that adds the commands but I wanted
 * to practice more with rust. Plus it makes the setup cleaner.

 * Switch to a function that takes and returns tauri::Builder<Wry> or uses a reference if we need to
 * switch it.
 */
pub trait CommandRegister {
    fn register_pomatez_commands(self) -> tauri::Builder<Wry>;
}

impl CommandRegister for Builder<Wry> {
    fn register_pomatez_commands(self) -> tauri::Builder<Wry> {
        self.invoke_handler(tauri::generate_handler![greet])
            .invoke_handler(tauri::generate_handler![my_custom_command])
    }
}
