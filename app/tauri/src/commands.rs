// Originally was only meant to have the commands, though due to the global mutex values adding a few extra for convenience for now
// Will tidy up in the future

use std::sync::Mutex;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri::{Builder, Icon, PhysicalSize, Runtime, Wry};
use tauri::{
    menu::{MenuBuilder, MenuItemBuilder},
    tray::{ClickType, TrayIconBuilder},
};

use tauri::Manager;
use base64;
use base64::Engine;
use base64::engine::general_purpose;

#[non_exhaustive]
struct WindowSize;

impl WindowSize {

    // Not sure why, if its due to UI scaling or what though these values seem to size smaller than the same values on electron
    pub const MIN: PhysicalSize<u32> = PhysicalSize { width : 420, height: 602};
    pub const COMPACT: PhysicalSize<u32> = PhysicalSize { width : 420, height: 80};
}

static ORIGINAL_SIZE: Mutex<PhysicalSize<u32>> = Mutex::new(WindowSize::MIN);

static HAS_DECORATIONS: Mutex<bool> = Mutex::new(true);
static IS_COMPACT: Mutex<bool> = Mutex::new(false);

#[tauri::command]
fn set_minimize<R: Runtime>(minimize_to_tray: bool, window: tauri::Window<R>) {
    println!("Minimize! {}", minimize_to_tray.to_string().as_str());
    if minimize_to_tray {
        window.hide().unwrap();
    } else {
        window.close().unwrap();
    }
}

#[tauri::command]
fn set_close<R: Runtime>(close_to_tray: bool, window: tauri::Window<R>) {
    println!("set_close! {}", close_to_tray);
    if close_to_tray {
        window.hide().unwrap();
    } else {
        window.close().unwrap();
    }
}

#[tauri::command]
fn set_show<R: Runtime>(_window: tauri::Window<R>) {
    println!("set_show!");
}

#[tauri::command]
fn set_always_on_top<R: Runtime>(always_on_top: bool, window: tauri::Window<R>) {
    println!("set_always_on_top! {}", always_on_top);
    try_set_always_on_top(always_on_top, &window);
}

#[tauri::command]
fn set_fullscreen_break<R: Runtime>(should_fullscreen: bool, always_on_top: bool, window: tauri::Window<R>) {
    println!("set_fullscreen_break! {} {}", should_fullscreen, always_on_top);
    try_set_always_on_top(always_on_top, &window);
    try_set_fullscreen(should_fullscreen, &window);
}

fn try_set_fullscreen<R: Runtime>(fullscreen: bool, window: &tauri::Window<R>) {
    match window.set_fullscreen(fullscreen) {
        Ok(_) => (),
        Err(e) => println!("There was a problem setting fullscreen: {}", e),
    }
}

fn try_set_always_on_top<R: Runtime>(always_on_top: bool, window: &tauri::Window<R>) {
    match window.set_always_on_top(always_on_top) {
        Ok(_) => (),
        Err(e) => println!("There was a problem altering always on top: {}", e),
    }
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

fn try_set_resizeable<R: Runtime>(resizeable: bool, window: &tauri::Window<R>) {
    println!("Window resizeable {:?}", resizeable);
    match window.set_resizable(resizeable) {
        Ok(_) => (),
        Err(e) => println!("There was a problem making the window resizeable {:?}", e)
    }
}

// Atm resizeable seems to cause a problem where the size cannot be set smaller than a certain amount
// https://github.com/tauri-apps/tao/issues/561, just use resizeable until this is fixed.
fn set_window_fixed_size<R: Runtime>(size: PhysicalSize<u32>, window: &tauri::Window<R>) {
    let decorations = HAS_DECORATIONS.lock().unwrap();
    let new_height = size.height + (if *decorations { 0 } else { 34 });
    let new_size = PhysicalSize { width : size.width, height: new_height};
    try_set_size(new_size, window);
    try_set_resizeable(false, window);
}

fn set_window_resizeable<R: Runtime>(min_size: PhysicalSize<u32>, size: PhysicalSize<u32>, window: &tauri::Window<R>) {
    try_set_resizeable(true, window);
    try_set_size(size, window);
    try_set_min_size(Some(min_size), window);
}


#[tauri::command]
fn set_compact_mode<R: Runtime>(compact_mode: bool, window: tauri::Window<R>) {
    {
        let mut compact = IS_COMPACT.lock().unwrap();
        *compact = compact_mode;
        drop(compact);
    }
    if compact_mode {
        {
            let mut size = ORIGINAL_SIZE.lock().unwrap();
            *size = window.outer_size().unwrap().clone();
        }
        set_window_fixed_size(WindowSize::COMPACT, &window);
    } else {
        set_window_resizeable(WindowSize::MIN, ORIGINAL_SIZE.lock().unwrap().clone(), &window);
    }
}

#[tauri::command]
fn set_ui_theme<R: Runtime>(is_dark_mode: bool, _window: tauri::Window<R>) {
    println!("set_ui_theme! {}", is_dark_mode);
}

#[tauri::command]
fn set_native_titlebar<R: Runtime>(use_native_titlebar: bool, window: tauri::Window<R>) {
    {
        let mut decorations = HAS_DECORATIONS.lock().unwrap();
        if *decorations == use_native_titlebar {
            println!("set_native_titlebar! {} already set", use_native_titlebar);
            return;
        }
        *decorations = use_native_titlebar;
        drop(decorations);
    }
    match window.set_decorations(use_native_titlebar) {
        Ok(_) => (),
        Err(e) => println!("There was a problem setting the window decorations! {:?}", e),
    }
    window.start_dragging();
    println!("set_native_titlebar! {}", use_native_titlebar);
}

#[tauri::command]
fn tray_icon_update<R: Runtime>(data_url: String, window: tauri::Window<R>) {
    println!("tray_icon_update!");
    let base64_str = data_url.trim_start_matches("data:image/png;base64,");

    let decoded_vec = match general_purpose::STANDARD.decode(base64_str) {
        Ok(vec) => vec,
        Err(e) => {
            eprintln!("Error decoding Base64 string: {}", e);
            return;
        }
    };

    let icon: Icon = Icon::Raw(decoded_vec);
    let tray = window.app_handle().tray();

    if let Some(tray) = tray {
        if let Err(e) = tray.set_icon(Some(icon)) {
            eprintln!("Error setting tray icon: {}", e);
        }
    }
}

/**
 * We could do this by passing the object into a custom function that adds the commands but I wanted
 * to practice more with rust. Plus it makes the setup cleaner.

 * Switch to a function that takes and returns tauri::Builder<Wry> or uses a reference if we need to
 * switch it.
 */
pub trait PomatezExtras {
    fn register_pomatez_commands(self) -> tauri::Builder<Wry>;
    fn set_pomatez_system_tray(self) -> tauri::Builder<Wry>;
}

impl PomatezExtras for Builder<Wry> {
    fn register_pomatez_commands(self) -> tauri::Builder<Wry> {
        self.invoke_handler(tauri::generate_handler![set_show, set_always_on_top,
            set_fullscreen_break, set_compact_mode, set_ui_theme, set_native_titlebar,
            tray_icon_update, set_close, set_minimize])
    }

    fn set_pomatez_system_tray(self) -> tauri::Builder<Wry> {
        println!("Setting system tray");
        self.setup(|app| {
            // Was defined in tauri.config.json to start in v1
            // That was created with an id of 1 though this gives more control

            let show = MenuItemBuilder::with_id("show", "Show").build(app);
            let quit = MenuItemBuilder::with_id("quit", "Quit").build(app);
            let menu = MenuBuilder::new(app).items(&[&show, &quit]).build()?;
            let tray = TrayIconBuilder::new()
                .menu(&menu)
                .tooltip("Pomatez")
                .on_menu_event(move |app, event| match event.id().as_ref() {
                    "show" => {
                        let window = app.get_window("main").unwrap();
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                })
                .on_tray_event(|tray, event| {
                    if event.click_type == ClickType::Left {
                        let app = tray.app_handle();
                        let window = app.get_window("main").unwrap();
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                })
                .icon(Icon::File("./icons/icon.png".into()))
                .build(app)?;
            Ok(())
        })
    }
}
