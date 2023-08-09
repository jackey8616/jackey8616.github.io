---
title: "COSCUP2023: 商業專案開源之旅：跨越技術挑戰與團隊溝通的實戰分享"
date: 2023-08-01 23:58:37
categories: COSCUP
tags:
  - COSCUP
slidehtml:
  titleMerge: false
  horizontalSeparator: '\n---\n'
  verticalSeparator: '\n----\n'
---

今年被公司推上去開講。

<!-- More -->

因為我們公司現在正在把內部商業專案做開源。  
我負責的部分是後端，還好前幾季有努力寫一點東西出來，至少我負責的部分有東西可以給會眾聽。  
  
大概內容就是幾個底層的實作遇到的一些問題。  
講完隔天馬上就想到明年要講什麼了...  
慘兮兮。  

[2023 COSCUP Slide](slide.html)

<!-- Slide Start -->

## whoarewe

| <center>火燒的<br />後端</center> | <center>C位<br />推坑王</center> | <center>還沒做事的<br />前端</center> |
|  ----  | ----  | ----  |
| <center>![](https://hackmd.io/_uploads/B14qdVWo2.png)<!-- .element height="150px" --></center> | <center>![](https://pretalx.coscup.org/media/avatars/logo_tI8c21F.png)<!-- .element height="150px" --></center>  | <center>![](https://www.gravatar.com/avatar/0bcf814b81e24b3ceb9c7459434c9c21?s=1024&d=identicon&r=g)<!-- .element height="150px" --></center> |
| <center>clooooode<br/>(clo5de)</center> | <center>KK</center> | <center>Logan</center> |

----

## whoarewe

|  |  | <center>所以那個前<br />端repo呢?</center> |
|  ----  | ----  | ----  |
| <center>![](https://hackmd.io/_uploads/B14qdVWo2.png)<!-- .element height="150px" --></center> | <center>![](https://pretalx.coscup.org/media/avatars/logo_tI8c21F.png)<!-- .element height="150px" --></center>  | <center>![](https://www.gravatar.com/avatar/0bcf814b81e24b3ceb9c7459434c9c21?s=1024&d=identicon&r=g)<!-- .element height="150px" --></center> |
| <center>clooooode<br/>(clo5de)</center> | <center>KK</center> | <center>Logan</center> |

---

## 商業專案
lodestar 內容商務系統

---

## 開源的概念
(Why OpenSource ?)

---

## 開源的概念
(Why OpenSource ?)

* 品質

---

## 開源的概念
(Why OpenSource ?)

* 品質
* 心態

---

## 開源的概念
(Why OpenSource ?)

* 品質
* 心態
* 創新

---

## 開源的概念
(Why OpenSource ?)

* 品質
* 心態
* 創新
* 品牌

---

### 挑戰

---

### 挑戰
* 技術

---

### 挑戰
* 技術
* 商業邏輯

---

### 挑戰
* 技術
* 商業邏輯
* 時間

---

## Front-end(Lodestar-Client)

---

## Front-end(Lodestar-Client)

還沒開始啦！

---

## Back-end(Lodestar-Server)

https://github.com/urfit-tech/lodestar-server
![](https://hackmd.io/_uploads/r1bn9NZsh.png)<!-- .element height="300px" -->

----

### Tech tree

- TypeScript
- NestJs
- PostgreSQL
- GraphQL
- Redis
- RabitMQ (Perhaps...)
- ~~MicroService~~

---

### Difficulties

<p class="text-left">
- <br />
- <br />
- <br />
- <br />
</p>

----

### Difficulties

<p class="text-left">
- Tasker / Runner (Producer & Consumer)<br />
- <br />
- <br />
- <br />
</p>

----

### Difficulties

<p class="text-left">
- Tasker / Runner (Producer & Consumer)<br />
- GraphQL server (Hasura)<br />
-<br />
-<br />
</p>

----

### Difficulties

<p class="text-left">
- Tasker / Runner (Producer & Consumer)<br />
- GraphQL server (Hasura)<br />
- PostgreSQL trigger<br />
-<br />
</p>

----

### Difficulties

<p class="text-left">
- Tasker / Runner (Producer & Consumer)<br />
- GraphQL server (Hasura)<br />
- PostgreSQL trigger<br />
- TDD routine<br />
</p>

---

#### Tasker / Runner

<p class="text-left">
- Singleton Runner ?<br />
- Suicide ?<br />
- Kill by outter daemon ?<br />
</p>

----

#### Tasker / Runner

<p class="text-left">
- Singleton Runner ? -> Distributed Lock<br />
- Suicide ?<br />
- Kill by outter daemon ?<br />
</p>

----

#### Tasker / Runner

<p class="text-left">
- Singleton Runner ? -> Distributed Lock<br />
- Suicide ?  -> setTimeout<br />
- Kill by outter daemon ?<br />
</p>

----

#### Tasker / Runner

<p class="text-left">
- Singleton Runner ? -> Distributed Lock<br />
- Suicide ?  -> setTimeout<br />
- Kill by outter daemon ? -> timeout magician<br />
</p>

---

#### GrahQL server

<p class="text-left">
- No paid no gain.<br />
- No man no backend.<br />
</p>

----

#### GrahQL server

<p class="text-left">
- No paid no gain. -> Hasura<br />
- No man no backend.<br />
</p>

----

#### GrahQL server

<p class="text-left">
- No paid no gain. -> Hasura<br />
- No man no backend. -> QQQ<br />
</p>

---

#### PostgreSQL trigger

<p class="text-left">
- anti-pattern ?<br />
- How to maintain db trigger?<br />
</p>

----

#### PostgreSQL trigger

<p class="text-left">
- anti-pattern ? -> necessary evil<br />
- How to maintain db trigger?<br />
</p>

----

#### PostgreSQL trigger

<p class="text-left">
- anti-pattern ? -> necessary evil<br />
- How to maintain db trigger ?<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> Manage by system itself.<br />
</p>

---

#### TDD

<p class="text-left">
- Is everyone all familiar with TDD ?<br />
- Routine, or quality ?<br />
</p>

----

#### TDD

<p class="text-left">
- Is everyone all familiar with TDD ?<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> Is's a tough job...<br />
- Routine, or quality ?<br />
</p>

----

#### TDD

<p class="text-left">
- Is everyone all familiar with TDD ?<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> Is's a tough job...<br />
- Routine, or quality ?<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> That's the question...<br />
</p>

---

## Q&A


<style>

.text-center{
    text-align: center; //文字置中
}
.text-left{
    text-align: left; //文字靠左
}
.text-right{
    text-align: right; //文字靠右
}

</style>
