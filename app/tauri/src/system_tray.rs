use std::path::PathBuf;
use tauri::{App, Builder, Icon, Manager, Runtime, Wry};
use tauri::{
    menu::{MenuBuilder, MenuItemBuilder},
    tray::{ClickType, TrayIconBuilder},
};
use tauri::path::BaseDirectory;

use base64;
use base64::Engine;
use base64::engine::general_purpose;

#[tauri::command]
pub fn tray_icon_update<R: Runtime>(data_url: String, window: tauri::Window<R>) {
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
        // Was defined in tauri.config.json to start in v1
        // That was created with an id of 1 though this gives more control

        let show = MenuItemBuilder::with_id("show", "Show").build(self);
        let quit = MenuItemBuilder::with_id("quit", "Quit").build(self);
        let menu = MenuBuilder::new(self).items(&[&show, &quit]).build().expect("failed to build menu");

        let icon_path = self.path().resolve::<PathBuf>("icons/icon.png".into(), BaseDirectory::Resource)
            .expect("failed to resolve icon path, this should not happen as it is an internal file");

        let _ = TrayIconBuilder::new()
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
            .icon(Icon::File(icon_path))
            .build(self).expect("failed to build tray icon");
    }
}
