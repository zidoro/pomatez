use lazy_static::lazy_static;
use tauri::{App, AppHandle, Manager};
use tauri_plugin_global_shortcut::Code;
use tauri_plugin_global_shortcut::{GlobalShortcutExt, Modifiers, Shortcut};

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
        let window = self.get_window("main").expect("Failed to get window");
        let global_shortcut_plugin = {
            tauri_plugin_global_shortcut::Builder::with_handler(move |_app_handle, shortcut| {
                println!("Shortcut pressed: {:?}", shortcut);
                match shortcut.id() {
                    key if SHOW_SHORTCUT.id() == key => {
                        match window.show() {
                            Ok(_) => {}
                            Err(e) => {
                                println!("Failed to show window: {:?}", e);
                            }
                        }
                        match window.set_focus() {
                            Ok(_) => {}
                            Err(e) => {
                                println!("Failed to focus window: {:?}", e);
                            }
                        }
                    }
                    key if HIDE_SHORTCUT.id() == key => match window.hide() {
                        Ok(_) => {}
                        Err(e) => {
                            println!("Failed to hide window: {:?}", e);
                        }
                    },
                    _ => println!("Shortcut pressed: {:?}", shortcut),
                }
                if shortcut.matches(Modifiers::ALT | Modifiers::SHIFT, Code::KeyH) {
                    match window.hide() {
                        Ok(_) => {}
                        Err(e) => {
                            println!("Failed to hide window: {:?}", e);
                        }
                    }
                } else {
                    println!("Shortcut pressed: {:?}", shortcut);
                }
            })
            .build()
        };
        let app_handle = self.handle();

        match app_handle.plugin(global_shortcut_plugin) {
            Ok(_) => {}
            Err(e) => {
                println!("Failed to register global shortcut plugin: {:?}", e);
            }
        }

        println!("Registered global shortcut plugin");
    }
}

pub trait PomatezGlobalShortcutsRegister {
    fn register_global_shortcuts(&self);
}

impl PomatezGlobalShortcutsRegister for AppHandle {
    fn register_global_shortcuts(&self) {
        let global_shortcut = self.global_shortcut();
        match global_shortcut.register(SHOW_SHORTCUT.clone()) {
            Ok(_) => {}
            Err(e) => {
                println!("Failed to register global shortcut: {:?}", e);
            }
        };
        match global_shortcut.register(HIDE_SHORTCUT.clone()) {
            Ok(_) => {}
            Err(e) => {
                println!("Failed to register global shortcut: {:?}", e);
            }
        };

        println!("Registered global shortcuts");
    }
}
