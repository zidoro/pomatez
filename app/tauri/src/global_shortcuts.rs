use lazy_static::lazy_static;
use tauri::{App, AppHandle, Manager};
use tauri_plugin_global_shortcut::Code;
use tauri_plugin_global_shortcut::{GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};

lazy_static! {
    static ref SHOW_SHORTCUT: Shortcut =
        Shortcut::new(Some(Modifiers::SHIFT | Modifiers::ALT), Code::KeyS);
    static ref HIDE_SHORTCUT: Shortcut =
        Shortcut::new(Some(Modifiers::SHIFT | Modifiers::ALT), Code::KeyH);
    static ref REFRESH: Shortcut = Shortcut::new(None, Code::F5);
}

pub trait PomatezGlobalShortcutsSetup {
    fn setup_global_shortcuts(&self);
}

impl PomatezGlobalShortcutsSetup for App {
    fn setup_global_shortcuts(&self) {
        let window = self
            .get_webview_window("main")
            .expect("Failed to get main window");

        let global_shortcut_plugin = tauri_plugin_global_shortcut::Builder::new()
            .with_handler(move |_app_handle, shortcut, event| {
                // Only react on key press, not on release.
                if event.state() != ShortcutState::Pressed {
                    return;
                }

                println!("Shortcut pressed: {:?}", shortcut);
                match shortcut.id() {
                    key if SHOW_SHORTCUT.id() == key => {
                        if let Err(e) = window.show() {
                            println!("Failed to show window: {:?}", e);
                        }
                        if let Err(e) = window.set_focus() {
                            println!("Failed to focus window: {:?}", e);
                        }
                    }
                    key if HIDE_SHORTCUT.id() == key => {
                        if let Err(e) = window.hide() {
                            println!("Failed to hide window: {:?}", e);
                        }
                    }
                    _ => println!("Unhandled shortcut: {:?}", shortcut),
                }
            })
            .build();

        let app_handle = self.handle();

        if let Err(e) = app_handle.plugin(global_shortcut_plugin) {
            println!("Failed to register global shortcut plugin: {:?}", e);
        } else {
            println!("Registered global shortcut plugin");
        }
    }
}

pub trait PomatezGlobalShortcutsRegister {
    fn register_global_shortcuts(&self);
}

impl PomatezGlobalShortcutsRegister for AppHandle {
    fn register_global_shortcuts(&self) {
        let global_shortcut = self.global_shortcut();
        if let Err(e) = global_shortcut.register(SHOW_SHORTCUT.clone()) {
            println!("Failed to register show shortcut: {:?}", e);
        }
        if let Err(e) = global_shortcut.register(HIDE_SHORTCUT.clone()) {
            println!("Failed to register hide shortcut: {:?}", e);
        }
        println!("Registered global shortcuts");
    }
}
