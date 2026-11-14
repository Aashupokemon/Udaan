package com.udaan.app;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private static final String APP_BACKGROUND = "#06222c";

    private WebView webView;
    private AssetServer server;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();
        window.setBackgroundDrawable(new ColorDrawable(Color.parseColor(APP_BACKGROUND)));

        if (Build.VERSION.SDK_INT >= 30) {
            // Android 15 (API 35) forces edge-to-edge, and even older releases do
            // it once the bars are transparent, so the app handles the insets and
            // keeps the page out from under the status bar, notch and gesture bar.
            window.setDecorFitsSystemWindows(false);
        } else {
            window.setStatusBarColor(Color.parseColor(APP_BACKGROUND));
            window.setNavigationBarColor(Color.parseColor(APP_BACKGROUND));
        }
        // Dark chrome, so the system icons stay light on the teal background.
        window.getDecorView().setSystemUiVisibility(
                window.getDecorView().getSystemUiVisibility() & ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);

        try {
            server = new AssetServer(getAssets(), "www");
            server.start();
        } catch (Exception e) {
            throw new RuntimeException("Could not start the local asset server", e);
        }

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor(APP_BACKGROUND));
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(false);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(false);
        webView.setWebViewClient(new WebViewClient());
        applySystemBarInsets(webView);

        setContentView(webView);
        webView.loadUrl("http://127.0.0.1:" + server.getPort() + "/index.html");
    }

    /** Pads the page away from the status bar, display cutout and navigation bar. */
    private void applySystemBarInsets(final View view) {
        if (Build.VERSION.SDK_INT < 30) {
            return;
        }
        // Hard floor: punch-hole and island phones report wildly different insets
        // and some report none at all, so always reserve room for the status bar
        // plus breathing space. The page adds its own padding below this.
        final int minTop = Math.max(systemDimension("status_bar_height", 24), dip(40));
        view.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener() {
            @Override
            public WindowInsets onApplyWindowInsets(View v, WindowInsets insets) {
                android.graphics.Insets bars = insets.getInsets(
                        WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                v.setPadding(bars.left, Math.max(bars.top, minTop), bars.right, bars.bottom);
                return insets;
            }
        });
    }

    private int dip(int dp) {
        return Math.round(dp * getResources().getDisplayMetrics().density);
    }

    private int systemDimension(String name, int fallbackDp) {
        int id = getResources().getIdentifier(name, "dimen", "android");
        if (id > 0) {
            return getResources().getDimensionPixelSize(id);
        }
        return Math.round(fallbackDp * getResources().getDisplayMetrics().density);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (server != null) {
            server.stop();
        }
        super.onDestroy();
    }
}
