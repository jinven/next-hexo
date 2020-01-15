---
title: android-webview
date: 2019-12-01 00:00:13
tags:
- android
---

# 1. 全局配置

## 1.1. 图标指定位置

`app/manifests/AndroidManifest.xml` 文件中的 application 节点的属性 `android:icon="@mipmap/ic_launcher"`

<!-- more -->

## 1.2. 修改

    1. 直接修改 `app -> res -> mipmap` 下面的 hdpi、mdpi、xhdpi、xxhdpi、xxxhdpi、anydpi-VERSION 的 `png、xml` 文件

    2. 新增指定名称的文件
    
## 1.3. 允许访问网络

 `app -> manifests -> AndroidManifest.xml` 文件中增加一行：

    <uses-permission android:name="android.permission.INTERNET"/>
    

# 2. 取得 webview

```java
WebView awv = findViewById(R.id.webview1);
```

# 3. 不使用外部浏览器：

```java
awv.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        view.loadUrl(url);
        return true;
    }
});
```

# 4. 配置设置

```java
WebView awv = findViewById(R.id.webview1);
WebSettings setting = awv.getSettings();
setting.setJavaScriptCanOpenWindowsAutomatically(true);
// 设置 web view 推荐使用的窗口
setting.setUseWideViewPort(true);
// 设置 web view 加载的页面的模式
setting.setLoadWithOverviewMode(true);
// 设置支持 javascript 脚本
setting.setJavaScriptEnabled(true);
// 允许访问文件
setting.setAllowFileAccess(true);
setting.setAppCacheEnabled(true);
setting.setCacheMode(WebSettings.LOAD_DEFAULT);
setting.setDomStorageEnabled(true);
// 隐藏 web view 缩放按钮
setting.setDisplayZoomControls(false);
// 设置显示缩放按钮
setting.setBuiltInZoomControls(true);
// 支持缩放
setting.setSupportZoom(true);

//主要用于平板，针对特定屏幕代码调整分辨率
DisplayMetrics metrics = new DisplayMetrics();
getWindowManager().getDefaultDisplay().getMetrics(metrics);
int mDensity = metrics.densityDpi;
if (mDensity == 240) {
    setting.setDefaultZoom(WebSettings.ZoomDensity.FAR);
} else if (mDensity == 160) {
    setting.setDefaultZoom(WebSettings.ZoomDensity.MEDIUM);
} else if (mDensity == 120) {
    setting.setDefaultZoom(WebSettings.ZoomDensity.CLOSE);
} else if (mDensity == DisplayMetrics.DENSITY_XHIGH) {
    setting.setDefaultZoom(WebSettings.ZoomDensity.FAR);
} else if (mDensity == DisplayMetrics.DENSITY_TV) {
    setting.setDefaultZoom(WebSettings.ZoomDensity.FAR);
} else {
    setting.setDefaultZoom(WebSettings.ZoomDensity.MEDIUM);
}
/**
    * 用WebView显示图片，可使用这个参数 设置网页布局类型：
    * 1、LayoutAlgorithm.NARROW_COLUMNS ：适应内容大小
    * 2、LayoutAlgorithm.SINGLE_COLUMN:适应屏幕，内容将自动缩放
    */
setting.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NARROW_COLUMNS);
```

# 5. 转到指定 url

```java
awv.loadUrl("https://www.bing.com");
```
