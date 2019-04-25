---
title: CH4 Multithreaded Programming
date: 2019-04-25 10:17:05
tags:
  - Note
  - Operating System
categories: Note
mathjax: true
---

可撥，OS教授講話自成一種語言，滷蛋語沒人聽的懂，
上課的影片備份都是滷蛋，上字幕的人上到崩潰，
看來只好自己腦補PPT內容了。
<!-- More -->
隨意寫，有錯請指正。

## Concurrency vs Paralleism

並發 以及 並行的比較。


### Concurrency

並發的概念即為在相同的時間間隔下完成任務。
任務並不一定要同時執行，但是他們可以被分成交錯執行的小任務。

![Concurrency](https://user-images.githubusercontent.com/4419992/35572695-ee6275c8-05b3-11e8-8460-2c1ac7081574.jpg)

在廚房裏面有一個廚師（Process），理所當然我們知道這個廚師同時只能做一件事情。  
反正我確定他不會左右互博，所以只能做一件事情zz。

廚師接到了一個訂單需要出一份普羅旺斯嫩春雞佐地中海初榨橄欖油米蘭空運羅勒葉的套餐。
所以他先把普羅旺斯嫩春雞放進去烤箱（Thread_A）去烤；
然後再去地中海找橄欖用榨汁器（Thread_B）來榨橄欖油；
那麼在這個烤以及榨汁的中間，廚師每一個時間點都要確認烤雞烤好沒？油榨夠了沒？

一旦烤雞烤好了，他就會中斷他現在的工作，然後去把烤雞拿出來，再接著繼續榨油，
直到雞好了、油也榨夠了、可以準備來炸鹹酥雞（普羅旺斯嫩春雞佐地中海初榨橄欖油米蘭空運羅勒葉）了。

如果失去了並發性（不眼觀四面、耳聽八方），廚師就得先老實的把雞烤熟了，才可以去榨油。
否則雞丟著跑去榨油，可能雞就變炭了。

### Parallelism

並行則為任務在相同的時間點被執行。
顧名思義，任務跟任務是平行的。
![Parallelism](https://user-images.githubusercontent.com/4419992/35572701-f14520f6-05b3-11e8-9989-f4dcc7fc987e.jpg)

同樣回到廚房內，這次我們有兩個廚師（Process A and B），這次我們就可以把雞給廚師甲去烤、
油給廚師乙去榨，在同一個時間點內，廚師甲跟乙都在做事情。

### Parallelism Type
- Data Parallelism
    資料被分配給不同的核心，每個核心所做的操作是一樣的。
    Ex: 100個加法被分散到不同的核心去執行。
- Task Parallelism
    線程被分配給不同的核心，每個核心所做的操作式不一樣的。
    Ex: 一台電腦有雙核心，同時玩遊戲又看網頁。

## Amdahl’s Law

快，但是快多少？

S代表串行的百分率
N則為處理的核心數
$SpeedUp <= \dfrac{1}{S + \dfrac{1 - S}{N}}$

Ex: 一個應用程式內75%為平行方法，25%為串行方法。
    從單核心分散至雙核心後，則速度會提升為原本的1.6倍。

## User thread vs Kernel thread
- User thread
    - 由user-level的threads library來管理。
    - 優點：
        建立、管理成本低。（OS不需介入）
    - 缺點：
        OS根本不知道這些線程的存在，一旦線程發生阻塞(Block)，
        則整個Process都會塞住。
    - Ex: POSIX Pthreads、Windows threads、Java threads
- Kernel thread
    - 由Kernel來管理。
    - Ex: Windows、Solaris、Linux、Tru64 UNIX、Mac OS X

## Multithreading Models

### Many to One
- 多個User thread被對應到單一一個Kernel thread。
- 如果其中一個執行緒阻塞，則整個Kernel thread就塞住。
- 在這種模型下，平行（Parallelism）是無法達成的，
  因為只有單一個Kernel thread在運作，並沒有辦法被分散到其他核心中。
- Ex: Solaris Green Threads、GNU Portable Threads。

### One to One
- 每一個User thread都對應到一個Kernel thread。
- 成本超高。
- 因為成本超高，所以每一個行程所能建立的線程數量會被限制。
- Ex: Windows NT/XP/2000、Linux、Solaris 9 and later

### Many to Many
- 多個User threads被對應到多個Kernel threads中。
- 經濟實惠又環保（？）。
- 不會因為單一的User thread阻塞而導致整個行程被塞住。
- Ex:
    - Solaris prior to version 9
    - Windows NT/2000 with the ThreadFiber package

### Two-level (Two-tier)
- 融合M2M跟O2O的model。
- Ex:
    - IRIX
    - HP-UX
    - Tru64 UNIX
    - Solaris 8 and earlier

### Conslusion
根據線程的類型不同，OS分配資源的結果也會不同。
假設在系統內有Process A及B，A當中有3個線程，B則為2個。

在皆為User thread的狀況之下，
Kernel只知道有兩個行程，所以各自分配到的CPU Time為50% 50%。

若為Kernel thread，
則每個thread可以得到20%(100% / 5 threads)的CPU Time。
其中Process A得到60%(3 * 20%)
Process B得到40%(2 * 20%)

<!--# Treading Issue

### Semantics of fork() and exec()
- 如果一個線程執行了fork， 那麼整個行程都會被複製，還是只有-->
