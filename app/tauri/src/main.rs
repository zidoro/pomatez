// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    #[cfg(target_os = "linux")]
    // Workaround for WebKitGTK DMABUF renderer crash on Wayland
    // (Gdk Error 71, WebLoaderStrategy internallyFailedLoadTimerFired)
    std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");

    pomatez_lib::run();
}
