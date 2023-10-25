use lazy_static::lazy_static;
use tauri::{Manager, AppHandle, App};
use tauri_plugin_global_shortcut::{GlobalShortcutExt, Modifiers, Shortcut};
use tauri_plugin_global_shortcut::Code;

lazy_static! {
    static ref SHOW_SHORTCUT: Shortcut = Shortcut::new(Some(Modifiers::SHIFT | Modifiers::ALT), Code::KeyS);
    static ref HIDE_SHORTCUT: Shortcut = Shortcut::new(Some(Modifiers::SHIFT | Modifiers::ALT), Code::KeyH);
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
                        window.show().expect("Failed to show window");
                        window.set_focus().expect("Failed to focus window");
                    }
                    key if HIDE_SHORTCUT.id() == key => {
                        window.hide().expect("Failed to hide window");
                    }
                    _ => println!("Shortcut pressed: {:?}", shortcut),
                }
                if shortcut.matches(Modifiers::ALT | Modifiers::SHIFT, Code::KeyH) {
                    window.hide().expect("Failed to hide window");
                } else {
                    println!("Shortcut pressed: {:?}", shortcut);
                }
            }).build()
        };
        let app_handle = self.handle();

        app_handle.plugin(global_shortcut_plugin).expect("failed to register global shortcut plugin");

        println!("Registered global shortcut plugin");
    }
}

pub trait PomatezGlobalShortcutsRegister {
    fn register_global_shortcuts(&self);
}

impl PomatezGlobalShortcutsRegister for AppHandle {
    fn register_global_shortcuts(&self) {
        let global_shortcut = self.global_shortcut();
        global_shortcut.register(SHOW_SHORTCUT.clone()).expect("failed to register global shortcut");
        global_shortcut.register(HIDE_SHORTCUT.clone()).expect("failed to register global shortcut");

        println!("Registered global shortcuts");
    }
}