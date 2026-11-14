#!/usr/bin/env bash
# Builds SarvSeva.apk: bundles the static site from the repo root into a native
# WebView wrapper, then compiles, dexes, packages, aligns and signs it.
#
# Required environment:
#   JAVA_HOME     JDK 17
#   BUILD_TOOLS   Android build-tools dir (aapt2, zipalign, lib/d8.jar, lib/apksigner.jar)
#   ANDROID_JAR   platform android.jar (e.g. platforms/android-35/android.jar)
#
# Usage:  ./android/build.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
BUILD="$HERE/build"
OUT="$HERE/SarvSeva.apk"

: "${JAVA_HOME:?set JAVA_HOME to a JDK 17 install}"
: "${BUILD_TOOLS:?set BUILD_TOOLS to an Android build-tools directory}"
: "${ANDROID_JAR:?set ANDROID_JAR to a platform android.jar}"

AAPT2="$BUILD_TOOLS/aapt2"
ZIPALIGN="$BUILD_TOOLS/zipalign"
if [ -f "$AAPT2.exe" ]; then AAPT2="$AAPT2.exe"; fi
if [ -f "$ZIPALIGN.exe" ]; then ZIPALIGN="$ZIPALIGN.exe"; fi

JAVA="$JAVA_HOME/bin/java"
JAVAC="$JAVA_HOME/bin/javac"

echo "== staging the web app =="
rm -rf "$BUILD"
mkdir -p "$BUILD/classes" "$BUILD/dex" "$BUILD/assets/www"
cp "$ROOT/index.html" "$ROOT/app.js" "$ROOT/styles.css" "$ROOT/manifest.json" "$ROOT/coming-soon.html" "$BUILD/assets/www/"
cp -r "$ROOT/assets" "$BUILD/assets/www/assets"
# These two belong to the old teaser page, not the app.
rm -f "$BUILD/assets/www/assets/app.js" "$BUILD/assets/www/assets/styles.css"
du -sh "$BUILD/assets/www" | awk '{print "bundled payload: " $1}'

echo "== compiling java =="
"$JAVAC" -source 8 -target 8 -classpath "$ANDROID_JAR" -d "$BUILD/classes" $(find "$HERE/src" -name '*.java')

echo "== dexing =="
"$JAVA" -cp "$BUILD_TOOLS/lib/d8.jar" com.android.tools.r8.D8 \
  --lib "$ANDROID_JAR" --min-api 24 --output "$BUILD/dex" \
  $(find "$BUILD/classes" -name '*.class')

echo "== linking resources =="
"$AAPT2" compile --dir "$HERE/res" -o "$BUILD/res.zip"
"$AAPT2" link -o "$BUILD/base.apk" -I "$ANDROID_JAR" --manifest "$HERE/AndroidManifest.xml" "$BUILD/res.zip"

echo "== packing (forward-slash asset names) =="
node "$HERE/pack.js"

echo "== aligning =="
"$ZIPALIGN" -p -f 4 "$BUILD/repacked.apk" "$BUILD/aligned.apk"
"$ZIPALIGN" -c -p 4 "$BUILD/aligned.apk"

echo "== signing =="
"$JAVA" -jar "$BUILD_TOOLS/lib/apksigner.jar" sign \
  --ks "$HERE/keystore/sarvseva.jks" --ks-pass pass:sarvseva123 --key-pass pass:sarvseva123 \
  --ks-key-alias sarvseva --out "$OUT" "$BUILD/aligned.apk"
"$JAVA" -jar "$BUILD_TOOLS/lib/apksigner.jar" verify "$OUT"

echo
echo "built: $OUT"
ls -lh "$OUT" | awk '{print "size: " $5}'
