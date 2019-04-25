---
title: "慘讀: Automatic Memory Control of Multiple Virtual Machines on a Consolidated Server"
date: 2019-04-19 00:17:05
tags:
  - Note
  - Operating System
categories: Note
---

可撥，OS教授講話自成一種語言，滷蛋語沒人聽的懂，
上課的影片備份都是滷蛋，上字幕的人上到崩潰，
看來只好自己腦補PPT內容了。
<!-- More -->
隨意寫，有錯請指正。

# Concurrency vs Paralleism

並發 以及 並行的比較。
舉實際例子來看：
這是並發的示意圖。
![Concurrency](https://user-images.githubusercontent.com/4419992/35572695-ee6275c8-05b3-11e8-8460-2c1ac7081574.jpg)

在廚房裏面有一個廚師（Process），理所當然我們知道這個廚師同時只能做一件事情。  
反正我確定他不會左右互博，所以只能做一件事情zz。

廚師接到了一個訂單需要出一份普羅旺斯嫩春雞佐地中海初榨橄欖油米蘭空運羅勒葉的套餐。
所以他先把普羅旺斯嫩春雞放進去烤箱（Thread_A）去烤；
然後再去地中海找橄欖用榨汁器（Thread_B）來榨橄欖油；
那麼在這個烤以及榨汁的中間，廚師每一個時間點都要確認烤雞烤好沒？油榨夠了沒？

一旦烤雞烤好了，他就會中斷他現在的工作，然後去把烤雞拿出來，再接著繼續榨油，
直到雞好了、油也榨夠了、可以準備來炸鹹酥雞（普羅旺斯嫩春雞佐地中海初榨橄欖油米蘭空運羅勒葉）了。

