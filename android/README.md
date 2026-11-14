# SarvSeva Android app

The installable Android build of the SarvSeva web app. This branch (`android`) exists so the mobile wrapper stays separate from the web site on `main`.

The app is a thin native shell around the same static site: a single `Activity` with a `WebView`, and an in-process HTTP server that serves the bundled files from `assets/www/` over `127.0.0.1`. Serving over a real `http://` origin (rather than `file://`) is what makes `localStorage`, the intro video and the background music behave exactly as they do on the web. Nothing is fetched from the network, so the app works offline.

## Layout

```
android/
├── AndroidManifest.xml          package com.sarvseva.app, minSdk 24, targetSdk 35
├── build.sh                     full build: stage → compile → dex → link → pack → align → sign
├── pack.js                      rebuilds the APK zip (asset paths + classes.dex)
├── src/com/sarvseva/app/
│   ├── MainActivity.java        WebView host
│   └── AssetServer.java         loopback file server with range support
├── res/                         app name + launcher icon
└── keystore/sarvseva.jks           self-signed key (store/key password: sarvseva123)
```

The web app itself is **not** duplicated here. `build.sh` copies it from the repository root at build time, so there is a single source of truth on `main`.

## Building

You need a JDK 17 and the Android build-tools plus one platform `android.jar` — no Android Studio or Gradle required.

```bash
export JAVA_HOME=/path/to/jdk-17
export BUILD_TOOLS=/path/to/build-tools/34.0.0
export ANDROID_JAR=/path/to/platforms/android-35/android.jar

./android/build.sh
```

The script writes `android/SarvSeva.apk`.

## Installing

Copy `SarvSeva.apk` to the phone, tap it, allow installs from that app, and confirm. Because it is signed with a local key rather than a Play key, Play Protect may ask you to install anyway.

## Notes

- **Asset paths:** aapt2 on Windows writes bundled asset names with backslashes (`assets/www\app.js`), which `AssetManager` refuses to open. `pack.js` rebuilds those entries with forward slashes; without it the app launches to a blank page.
- **Updates:** the site is bundled at build time. To ship content changes, rebuild and reinstall.
- **Signing key:** `keystore/sarvseva.jks` is a throwaway key for sideloading. Use your own key and keep it out of the repo before publishing anywhere.
- **Not yet verified on hardware:** the wrapper was validated by compiling, signing and by exercising `AssetServer` over loopback on a desktop JVM. A device run is still worth doing.
