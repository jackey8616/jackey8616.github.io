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


