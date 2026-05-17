use tauri::{Manager, RunEvent};
use tauri_plugin_autostart::MacosLauncher;

#[macro_use]
mod commands;
mod system_tray;

#[cfg(desktop)]
mod global_shortcuts;
#[cfg(desktop)]
mod updater;

#[cfg(target_os = "macos")]
use crate::commands::try_set_native_titlebar;

use commands::PomatezCommands;
use system_tray::PomatezTray;

#[cfg(desktop)]
use global_shortcuts::{PomatezGlobalShortcutsRegister, PomatezGlobalShortcutsSetup};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let context = tauri::generate_context!();

    let updater_enabled = context.config().plugins.0.contains_key("updater");

    #[allow(unused_mut)]
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            None,
        ))
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init());

    #[cfg(desktop)]
    {
        if updater_enabled {
            builder = builder.plugin(tauri_plugin_updater::Builder::new().build());
        }
    }

    let app = builder
        .register_pomatez_commands()
        .setup(|app| {
            #[cfg(desktop)]
            {
                app.setup_global_shortcuts();
                app.set_pomatez_system_tray();
            }
            Ok(())
        })
        .build(context)
        .expect("error while running tauri application");

    #[cfg(desktop)]
    app.run(|app_handle, e| {
        if let RunEvent::Ready = e {
            app_handle.register_global_shortcuts();

            #[cfg(any(target_os = "macos", debug_assertions))]
            let window = app_handle
                .get_webview_window("main")
                .expect("Failed to get main window");

            // There is a bug on mac where the size is not properly respected initially, though this seems to fix it.
            #[cfg(target_os = "macos")]
            {
                try_set_native_titlebar(false, &window);
                try_set_native_titlebar(true, &window);
            }

            #[cfg(debug_assertions)]
            window.open_devtools();

            println!("Pomatez is ready");
        }
    });
}
