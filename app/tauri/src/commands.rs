use std::sync::Mutex;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri::{Builder, PhysicalSize, Runtime, Wry};

#[non_exhaustive]
struct WindowSize;

impl WindowSize {
    pub const MIN: PhysicalSize<u32> = PhysicalSize { width : 340, height: 502};
    pub const COMPACT: PhysicalSize<u32> = PhysicalSize { width : 340, height: 100};
}

static ORIGINAL_SIZE: Mutex<PhysicalSize<u32>> = Mutex::new(WindowSize::MIN);

#[tauri::command]
fn set_minimize<R: Runtime>(minimize_to_tray: bool, _window: tauri::Window<R>) {
    println!("Minimize! {}", minimize_to_tray.to_string().as_str());
}

#[tauri::command]
fn set_close<R: Runtime>(close_to_tray: bool, _window: tauri::Window<R>) {
    println!("set_close! {}", close_to_tray);
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

fn try_set_min_size<R: Runtime>(size: Option<PhysicalSize<u32>>, window: &tauri::Window<R>) {
    match window.set_min_size(size) {//Some(size)) {
        Ok(_) => (),
        Err(e) => println!("There was a problem setting min size! {:?}", e),
    }
}

fn try_set_size<R: Runtime>(size: PhysicalSize<u32>, window: &tauri::Window<R>) {
    match window.set_size(size) {
        Ok(_) => (),
        Err(e) => println!("There was a problem setting the window size! {:?}", e),
    }
    println!("Set size to {:?}", size);
}

// fn try_set_resizeable<R: Runtime>(resizeable: bool, window: &tauri::Window<R>) {
//     match window.set_resizable(resizeable) {
//         Ok(_) => (),
//         Err(e) => println!("There was a problem making the window resizeable {:?}", e)
//     }
// }

// Atm resizeable seems to cause a problem where the size cannot be set smaller than a certain amount
// https://github.com/tauri-apps/tao/issues/561, just use resizeable until this is fixed.
// fn set_window_fixed_size<R: Runtime>(size: PhysicalSize<u32>, window: &tauri::Window<R>) {
//     try_set_size(size, window);
//     try_set_resizeable(false, window);
// }

fn set_window_resizeable<R: Runtime>(min_size: PhysicalSize<u32>, size: PhysicalSize<u32>, window: &tauri::Window<R>) {
    // try_set_resizeable(true, window);
    try_set_min_size(Some(min_size), window);
    try_set_size(size, window);
}


#[tauri::command]
fn set_compact_mode<R: Runtime>(compact_mode: bool, window: tauri::Window<R>) {
    if compact_mode {
        {
            let mut size = ORIGINAL_SIZE.lock().unwrap();
            *size = window.outer_size().unwrap().clone();
        }
        set_window_resizeable(WindowSize::COMPACT, WindowSize::COMPACT, &window);
    } else {
        set_window_resizeable(WindowSize::MIN, ORIGINAL_SIZE.lock().unwrap().clone(), &window);
    }
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
