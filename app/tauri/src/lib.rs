

#[cfg(debug_assertions)]
use tauri::{Manager};
use tauri::{RunEvent};
#[cfg(desktop)]
use tauri_plugin_autostart::MacosLauncher;
#[cfg(desktop)]
use tauri_plugin_window;

use tauri_plugin_shell;

#[cfg(desktop)]
mod desktop;

#[cfg(desktop)]
use desktop::{
    commands::PomatezCommands,
    global_shortcuts::{PomatezGlobalShortcutsRegister, PomatezGlobalShortcutsSetup},
    system_tray::PomatezTray,
    updater,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default();

    #[cfg(desktop)]
    let builder = builder.plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, None))
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_updater::Builder::new().build());

    let builder = builder.plugin(tauri_plugin_shell::init());

    #[cfg(desktop)]
    let builder = builder.register_pomatez_commands();

    #[cfg(desktop)]
    {
        let builder = builder
            .setup(|app| {
                app.setup_global_shortcuts();
                app.set_pomatez_system_tray();

                Ok(())
            });
    }

    let app = builder.build(tauri::generate_context!())
        .expect("error while running tauri application");

    app.run(|app_handle, e| match e {
        RunEvent::Ready => {
            #[cfg(desktop)]
            app_handle.register_global_shortcuts();

            #[cfg(debug_assertions)]
            app_handle.get_window("main").unwrap().open_devtools();

            println!("Pomatez is ready");
        }
        _ => {}
    });
}