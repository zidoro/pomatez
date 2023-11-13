use tauri::{AppHandle, Manager, WindowBuilder};

pub static MAIN_WINDOW_ID: &str = "main";

pub fn create_main_window(handle: &AppHandle) {
    if handle.get_window(MAIN_WINDOW_ID).is_some() {
        return;
    }
    let window = WindowBuilder::new(handle, MAIN_WINDOW_ID, Default::default())
        .inner_size(340f64, 502f64)
        .resizable(true)
        .title("pomatez")
        .build()
        .unwrap();

    let window_clone = window.clone();
    window.on_window_event(move |e| match e {
        tauri::WindowEvent::CloseRequested { api, .. } => {
            api.prevent_close();
            window_clone.hide().unwrap();
        }
        _ => {}
    })
}
