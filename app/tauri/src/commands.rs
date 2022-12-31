
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri::{Builder, Wry};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn set_minimize() {
    println!("Minimize!");
}

#[tauri::command]
fn set_close() {
    println!("set_close!");
}

#[tauri::command]
fn set_show() {
    println!("set_show!");
}

#[tauri::command]
fn set_always_on_top() {
    println!("set_always_on_top!");
}

#[tauri::command]
fn set_fullscreen_break() {
    println!("set_fullscreen_break!");
}

#[tauri::command]
fn set_compact_mode() {
    println!("set_compact_mode!");
}

#[tauri::command]
fn set_ui_theme() {
    println!("set_ui_theme!");
}

#[tauri::command]
fn set_native_titlebar() {
    println!("set_native_titlebar!");
}

#[tauri::command]
fn tray_icon_update() {
    println!("tray_icon_update!");
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
        self.invoke_handler(tauri::generate_handler![greet, set_show, set_always_on_top,
            set_fullscreen_break, set_compact_mode, set_ui_theme, set_native_titlebar,
            tray_icon_update, set_close, set_minimize])
    }
}
