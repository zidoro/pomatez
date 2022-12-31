
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri::{Builder, Runtime, Wry};

#[tauri::command]
fn set_minimize<R: Runtime>(minimize_to_tray: bool, _window: tauri::Window<R>) {
    println!("Minimize! {}", minimize_to_tray.to_string().as_str());
}

#[tauri::command]
fn set_close<R: Runtime>(_window: tauri::Window<R>) {
    println!("set_close!");
}

#[tauri::command]
fn set_show<R: Runtime>(_window: tauri::Window<R>) {
    println!("set_show!");
}

#[tauri::command]
fn set_always_on_top<R: Runtime>(always_on_top: bool, _window: tauri::Window<R>) {
    println!("set_always_on_top! {}", always_on_top);
}

#[tauri::command]
fn set_fullscreen_break<R: Runtime>(should_fullscreen: bool, always_on_top: bool, _window: tauri::Window<R>) {
    println!("set_fullscreen_break! {} {}", should_fullscreen, always_on_top);
}

#[tauri::command]
fn set_compact_mode<R: Runtime>(compact_mode: bool, _window: tauri::Window<R>) {
    println!("set_compact_mode! {}", compact_mode);
}

#[tauri::command]
fn set_ui_theme<R: Runtime>(is_dark_mode: bool, _window: tauri::Window<R>) {
    println!("set_ui_theme! {}", is_dark_mode);
}

#[tauri::command]
fn set_native_titlebar<R: Runtime>(use_native_titlebar: bool, _window: tauri::Window<R>) {
    println!("set_native_titlebar! {}", use_native_titlebar);
}

#[tauri::command]
fn tray_icon_update<R: Runtime>(data_url: String, _window: tauri::Window<R>) {
    println!("tray_icon_update! {}", data_url);
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
        self.invoke_handler(tauri::generate_handler![set_show, set_always_on_top,
            set_fullscreen_break, set_compact_mode, set_ui_theme, set_native_titlebar,
            tray_icon_update, set_close, set_minimize])
    }
}
