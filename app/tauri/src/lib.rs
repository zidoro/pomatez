#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

#[cfg(desktop)]
use tauri::{Manager};
use tauri::{RunEvent};
#[cfg(desktop)]
use tauri_plugin_autostart::MacosLauncher;
#[cfg(desktop)]
use tauri_plugin_updater::Builder;
use tauri_plugin_window;

#[cfg(desktop)]
mod desktop;

#[cfg(desktop)]
use desktop::{
    commands::PomatezCommands,
    global_shortcuts::{PomatezGlobalShortcutsRegister, PomatezGlobalShortcutsSetup},
    system_tray::PomatezTray,
};

#[cfg(target_os = "macos")]
use crate::commands::try_set_native_titlebar;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let context = tauri::generate_context!();

    #[cfg(desktop)]
    let mut context = context;

    #[cfg(desktop)]
    let config = context.config_mut();

    let app = tauri::Builder::default();

    #[cfg(desktop)]
    let app = app.plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            None,
        ));

    let app = app.plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_os::init());

    #[cfg(desktop)]
    let mut app = app;

    #[cfg(desktop)]
    if config.tauri.bundle.updater.active {
        app = app.plugin(Builder::new().build());
    }

    #[cfg(desktop)]
    let app = app.register_pomatez_commands();

    #[allow(unused_variables)]
    let app = app.setup(|app| {
            #[cfg(desktop)]
            {
                app.setup_global_shortcuts();
                app.set_pomatez_system_tray();
            }

            Ok(())
        });

    let app = app.build(context)
        .expect("error while running tauri application");

    #[allow(unused_variables)]
    app.run(|app_handle, e| match e {
        RunEvent::Ready => {
            #[cfg(desktop)]
            {
                app_handle.register_global_shortcuts();

                let window = app_handle.get_window("main").unwrap();

                // There is a bug on mac where the size is not properly respected initially, though this seems to fix it.
                #[cfg(target_os = "macos")]
                {
                    try_set_native_titlebar(false, &window);
                    try_set_native_titlebar(true, &window);
                }

                #[cfg(debug_assertions)]
                window.open_devtools();
            }


            println!("Pomatez is ready");
        }
        _ => {}
    });
}
