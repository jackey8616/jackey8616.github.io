---
title: MaybeP2P(1) - Begin
date: 2018-05-01 14:12:00
tags:
  - Linux
  - Python
  - Python2.7
  - Python3.5
  - P2P
  - peer-to-peer
categories:
  - Application
  - MaybeP2P
---

I thought i can develope my own framework.  
But i found out that too may people did same thing just like me.  
Oops...
<!-- More -->
## 前言  
MaybeP2P算是一個框架, 恩... 對, 我定位是框架, 啊哈哈哈哈...  
請給我一點自我陶醉的空間XD...  
  
我們一個專案有很莫名其妙大的架構，然後考量到HA，所以決定把所有的Function都切成Multiprocessing。  
切完Process了之後，當然就要塞給CPU去做分散式處理。  
然後起初的架構，為了便宜行事用了Redis來做為溝通的管道。  
對，沒錯，就是傳說中分散式架構然後又採中心化伺服器來管理的白痴做法...  
（OS：那請問分散式要幹嘛？？？？？？）

於是把每個Process獨立出來各自溝通的對等架構需求出現，  
接著就蹦，是的.. Maybe we need a p2p.
And that's  MaybeP2P.  
  
## 野心  
既然要自造輪子，當然就要造一個爆炸複雜的輪子，然後走到哪用到哪，
最好還可以樓上招樓下，隔壁找對面，大家一起來用。  
And this is why i called it a " FRAMEWORK".  
  
起初的設計上是採用TCP Server來做P2P的Host，然後裏面可以跑自己寫的（or 我寫的Protocol)。  
這個看起來很美好沒錯，實際上它也以我預期的方式運作著，Well.. 除了Timeout的部份我還沒做以外....  
  
## 現況（2018.05.01)  
初版（0.0.1)目前實作了v1的經典（ClassicV1)協定，aka 廣播風暴版...  
嚴格來講，這個不太算是對等網路裏面最一開始的協定，其實根本就連協定也稱不上吧...  
第一代的對等網路是具有中心化伺服器來處理路由, 基本上Peer是做自己的事情沒錯，只不過溝通要透過中心就是。
要說是對等節點，我覺得也是可啦... 哈哈  

還要弄一個中心化節點去控制路由好麻煩，所以MaybeP2P採的是第二代對等網路架構，  
路由處理是走全網廣播，然後大家處理一堆不關自己的事情的封包請求就飽了，  
這個狀況適合"小而美"的LAN，在LAN當中開廣，有負擔，但是不大。  
拿到大型網路當中，節點跟請求封包的數量會成指數成長。  

所以未來打算實作的是第三代對等網路（採用Kademlia來維護路由）的方式，  
一方面用最低限度的Cost來達到定位特定節點或者資源的算法， 其實很簡單。  
只要XOR就好了....  
但是礙於當初Peer的TCP Server設計上沒有很詳盡的考慮到Timeout的部份，  
我自己還要釐清一下思緒才有辦法改動....

## So?  
{% gp 4-3 %}
[![PyPI version](https://badge.fury.io/py/MaybeP2P.svg)](https://badge.fury.io/py/MaybeP2P)
[![Build Status](https://travis-ci.org/jackey8616/MaybeP2P.svg?branch=master)](https://travis-ci.org/jackey8616/MaybeP2P)
[![codecov](https://codecov.io/gh/jackey8616/MaybeP2P/branch/master/graph/badge.svg)](https://codecov.io/gh/jackey8616/MaybeP2P)
[![Maintainability](https://api.codeclimate.com/v1/badges/1a8dceae8859199d3d54/maintainability)](https://codeclimate.com/github/jackey8616/MaybeP2P/maintainability)
{% endgp %}
現在pip可以下載喔.. 只是我doc還沒寫好....  
啊哈哈哈哈哈...  
  
`pip install MaybeP2P`  
  
```sh  
>>> from peer import Peer
>>> p = Peer()
>>> p._initServerSock()
>>> p.start()
...
>>> p.exit()
>>> ctrl-D
```  

