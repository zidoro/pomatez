use serde::Deserialize;
use tauri::{App};
use tauri_plugin_updater::UpdaterExt;
use url::Url;

pub trait PomatezUpdater {
    fn check_for_update(&self);
}

#[derive(Deserialize, Debug)]
struct LatestRelease {
    // While we could get the latest version or other info, we just want to find the tauri-release.json asset.
    assets: Vec<Asset>,
}

#[derive(Deserialize, Debug)]
struct Asset {
    name: String,
    browser_download_url: String,
}

impl PomatezUpdater for App {
    fn check_for_update(&self) {
        let handle = self.handle().clone();
        tauri::async_runtime::spawn(async move {
            // Todo maybe check that its a supported platform first e.g. windows, macos, linux (AppImage)

            // If its not a supported platform maybe open the release page.

            println!("Checking for updates");
            // Custom configure the updater.
            // If we use this endpoint even if the url changes e.g. org name change or project name change the updates should still follow.
            let github_releases_endpoint = "https://api.github.com/repos/sekwah41/pomatez/releases/latest";
            let github_releases_endpoint = match Url::parse(github_releases_endpoint) {
                Ok(url) => url,
                Err(e) => {
                    println!("Failed to parse url: {:?}. Failed to check for updates", e);
                    return;
                }
            };
            let client = reqwest::Client::new();
            let req = client.get(github_releases_endpoint.clone())
                .header("Content-Type", "application/json")
                // If this is not set you will get a 403 forbidden error.
                .header("User-Agent", "pomatez");
            let response = req.send().await.expect("Failed to send request");
            if response.status() != reqwest::StatusCode::OK {
                println!("Non OK status code: {:?}. Failed to check for updates", response.status());
                return;
            }
            let latest_release = response.json::<LatestRelease>().await.expect("Failed to parse latest release response");

            // Find an asset named "tauri-release.json".
            let tauri_release_asset = latest_release.assets.iter().find(|asset| asset.name == "tauri-release.json");

            // If we found the asset, set it as the updater endpoint.
            let tauri_release_asset = match tauri_release_asset {
                Some(tauri_release_asset) => tauri_release_asset,
                None => {
                    println!("Failed to find tauri-release.json asset. Failed to check for updates\n\nFound Assets are:");
                    // Print a list of the assets found
                    for asset in latest_release.assets {
                        println!("  {:?}", asset.name);
                    }
                    return;
                }
            };

            let tauri_release_endpoint = match Url::parse(&tauri_release_asset.browser_download_url) {
                Ok(url) => url,
                Err(e) => {
                    println!("Failed to parse url: {:?}. Failed to check for updates", e);
                    return;
                }
            };
            let updater_builder = handle.updater_builder().endpoints(vec!(tauri_release_endpoint));
            let updater = updater_builder.build()
                .expect("could not build updater");
            println!("Checking for updates");
            let response = updater.check().await;
            println!("Update check response: {:?}", response);
        });
    }
}