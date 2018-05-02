---
title: Cracking APK
date: 2018-05-01 19:31:54
tags:
  - Note
  - Android
categories:
  - LifeGeeking
---

謹記念某漫畫App Crack經歷。  
<!-- More -->

## Enviorement  
Ubuntu 16.04.02 LTS 64bit  
Java 7 or newer.(JRE)   
\*JDK only require jarsigner  
 
## Tools  
1. [Apktools](https://ibotpeaches.github.io/Apktool/install/)
2. [jd-gui](http://jd.benow.ca/)
3. [dex2jar](https://blog.techbridge.cc/2016/03/24/android-decompile-introduction/)\*
   
\* dex2jar裏面是一陀sh，載下來解壓縮就可以直接使用了。  
  
## Key  Generate 
```sh
keytool -genkey -v -keystore android.keystore -alias android.keystore -keyalg RSA -validity 20000
```  

## Apktools  
```sh
Decompile a apk
apktool d <APK_NAME.apk>  
Build to a apk
apktool b <APK_NAME.apk>
```  
Decompile will make a new folder same name as apk.  
Build will to into <APK_NAME>/dist/  

## Note Webs

[人人都會的 Android Apk 反編譯](https://blog.techbridge.cc/2016/03/24/android-decompile-introduction/)  
[Smali--Dalvik虚拟机指令语言-->【android\_smali语法学习一】](https://blog.csdn.net/wdaming1986/article/details/8299996)  
[補丁(patch)的製作與應用](https://goo.gl/smMv5X)  
[Android逆向之smali语法宝典](https://www.jianshu.com/p/ba9b374346dd)  
[smali语句类的静态成员查看，invoke-virtual、invoke-direct、invoke-super解释](http://www.cnblogs.com/Fang3s/p/3782903.html)  
[ImobileSdkAd](https://sppartner.i-mobile.co.jp/downloads/sdk/i-mobile_SDK_manual_for_Android.pdf)  
[直接從 Google Play 商店下載 app apk 檔到電腦](https://hkappschannel.com/2016/12/06/web-apk-downloader-sites-1/)  

