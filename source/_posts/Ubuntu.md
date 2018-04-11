---
title: Unix
date: 2018-04-11 15:08:16
tags:
  - Note
categories: Note
---

紀錄一下踩過Unix系的天坑。  
<!-- More -->
## System  
+ Ubuntu  
  OS: Unbuntu 16.04.4 LTS X86\_64  
  Kernel: 4.13.0-38.generic  
  Packages: 2230  
  Shell: fish 2.2.0  
  DE: GNOME 3.20.4  
+ Arch  
  還沒衝動。等我換SSD哈哈哈。  
  
## Software  
### gcin  
我一直不知道是什麼問題, 然後讓我的gcin完全沒辦法切換中文。
又用很莫名其妙的方法修好....
#### 無法切換中文  
除了把自己的config檢查好以外。  
我試過各種莫名其妙的方法去修，但是都修不好。  
最後誤打誤撞弄好的，我還是不知道發生什麼事情...  
```sh  
# 如果沒有gnome-language-selector  
$ sudo apt-get install language-selector-gnome  
# 重新安裝gcin 重裝最快了...  
$ sudo apt-get remove --purge gcin  
$ sudo apt-get install gcin
# 開啟gnome-language-selector  
$ gnome-language-selector  
```  
最後在輸入法選擇gcin，關閉。

#### phonetic-keyboard- is not valid  
#### Cannot open /usr/share/gcin/table/X@.kbm
在點擊gcin-tool -> gcin注音/詞音/拼音 設定的時候會跳出。  
兩種問題解決辦法都一樣...  
```sh  
$ rm ~/.gcin/config/phonetic-keyboard*
```  
Reference: [http://hyperrate.com](http://hyperrate.com/thread.php?tid=29563)  

### Dummy-Ouput  
安裝了一堆佈景, 有的用手裝, 有的從GitHub叉下來Make, 似乎弄壞很多東西。
音效卡就是其中一個。 大膽推測是因為之前在裝的過程有upgrade，所以有玩壞。  
找了一下Sol, 後遺症就是原本電腦用Fn + Volume的時候會有調整音量的聲音，這次修好之後， 就沒有了QQQ。  
```sh  
$ sudo apt-get remove --purge alsa-base
$ sudo apt-get remove --purge pulseaudio
$ sudo apt-get install alsa-base
$ sudo apt-get install pulseaudio
$ sudo alsa force-reload
```  
Reference: [Ubuntu Forums](https://ubuntuforums.org/showthread.php?t=1316634)  

