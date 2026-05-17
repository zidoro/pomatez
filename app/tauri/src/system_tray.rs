use std::path::PathBuf;
use tauri::path::BaseDirectory;
use tauri::{
    image::Image,
    menu::{MenuBuilder, MenuItemBuilder},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    App, Manager, Runtime,
};

use base64::engine::general_purpose;
use base64::Engine;

const TRAY_ID: &str = "main";

#[tauri::command]
pub fn tray_icon_update<R: Runtime>(data_url: String, window: tauri::Window<R>) {
    let base64_str = data_url.trim_start_matches("data:image/png;base64,");

    let decoded_vec = match general_purpose::STANDARD.decode(base64_str) {
        Ok(vec) => vec,
        Err(e) => {
            eprintln!("Error decoding Base64 string: {}", e);
            return;
        }
    };

    let icon = match Image::from_bytes(&decoded_vec) {
        Ok(img) => img,
        Err(e) => {
            eprintln!("Error parsing tray icon image: {}", e);
            return;
        }
    };

    if let Some(tray) = window.app_handle().tray_by_id(TRAY_ID) {
        if let Err(e) = tray.set_icon(Some(icon)) {
            eprintln!("Error setting tray icon: {}", e);
        }
    }
}

pub trait PomatezTray {
    fn set_pomatez_system_tray(&self);
}

impl PomatezTray for App {
    /*
     * The icon is updated after rendering on the frontend so that is handled in the commands file.
     * However the initial setup and behavior is handled here.
     */
    fn set_pomatez_system_tray(&self) {
        println!("Setting system tray");

        let show = MenuItemBuilder::with_id("show", "Show")
            .build(self)
            .expect("failed to build show menu item");
        let quit = MenuItemBuilder::with_id("quit", "Quit")
            .build(self)
            .expect("failed to build quit menu item");
        let menu = MenuBuilder::new(self)
            .items(&[&show, &quit])
            .build()
            .expect("failed to build menu");

        let icon_path: PathBuf = self
            .path()
            .resolve("icons/icon.png", BaseDirectory::Resource)
            .expect("failed to resolve icon path; this should not happen as it is an internal file");

        let icon = Image::from_path(&icon_path).expect("failed to load tray icon image");

        let _ = TrayIconBuilder::with_id(TRAY_ID)
            .menu(&menu)
            .tooltip("Pomatez")
            .icon(icon)
            .on_menu_event(|app, event| match event.id().as_ref() {
                "show" => {
                    if let Some(window) = app.get_webview_window("main") {
                        let _ = window.show();
                        let _ = window.set_focus();
                    }
                }
                "quit" => {
                    app.exit(0);
                }
                _ => {}
            })
            .on_tray_icon_event(|tray, event| {
                if let TrayIconEvent::Click {
                    button: MouseButton::Left,
                    button_state: MouseButtonState::Up,
                    ..
                } = event
                {
                    let app = tray.app_handle();
                    if let Some(window) = app.get_webview_window("main") {
                        let _ = window.show();
                        let _ = window.set_focus();
                    }
                }
            })
            .build(self)
            .expect("failed to build tray icon");
    }
}
