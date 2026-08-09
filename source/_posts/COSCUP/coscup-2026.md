---
title: "COSCUP2026: Agent 可以平行，我不行"
date: 2026-08-09 01:20:00
categories: COSCUP
tags:
  - COSCUP
slidehtml:
  titleMerge: false
  horizontalSeparator: '\n---\n'
  verticalSeparator: '\n----\n'
---

今年又被推上去講了，這次講我怎麼把自己搞到過勞，然後又爬出來的。

<!-- More -->

為了讓團隊可以同步知道彼此在做什麼，我們選擇用 GitHub issue 讓 agent 記錄自己的動作；該寫的
都寫了，狀態也不在誰的腦袋裡，所以我一開始是覺得還好啦。

可是當我開始要併發的時候，我差點頭痛病發 —— 直接變成 Router 熱當。

後來修了三次：先加一個幕僚幫我分流、再逼它別什麼都自己來、要派工出去，最後——等我自己不塞車了，
才看到團隊其實各塞各的，於是有了一顆大家一起講話的 agent。每一次都解掉了上一次的問題，
然後長出新的問題。

一句話大概是：每次加一層，其實只是把瓶頸往外推一格；而每推一格，代價就是狀態要更徹底地落在
檔案上，不然根本推不動。

細節都在投影片裡，包含最後那段「什麼時候不要這樣做」。

[COSCUP 2026 Slide](slide.html)

裡面引到的 ADR 都在 [roma](https://github.com/jackey8616/roma) 的 `docs/adr/` 底下，公開的，
可以自己去翻。

<!-- Slide Start -->

# Agent 可以平行，我不行

Clooooode　·　COSCUP 2026　·　TR311

<!-- .slide: class="hero" -->

---

## whoami

![](/images/COSCUP/coscup-2026/avatar.jpg)<!-- .element: class="avatar" -->

**Clooooode**（clo5de）

之前還在摘蘋果，最近回來找個工作寫程式。

2023 也在這裡講過，那次講開源；這次講我被自己的拓撲熱當三次。

<!-- .slide: class="hero" -->

---

## 一開始我覺得還好

我們用 GitHub issue **讓 agent 記錄自己的動作**。

該寫的都寫了，狀態也不在誰的腦袋裡。

**可是當我開始要併發的時候，我差點頭痛病發。**

<!-- .slide: class="hero" -->

---

## 結果我直接變成 Router 熱當

![](/images/COSCUP/coscup-2026/topology-1-router.svg)<!-- .element: class="diagram" -->

**一整天沒寫到半行 code。兩個禮拜就過勞。**

---

## 一句話講完這篇

**每次加一層，其實只是把瓶頸往外推一格。**

**而每推一格，代價就是狀態要更徹底地落在檔案上，不然根本推不動。**

<!-- .slide: class="hero" -->

---

## 第一次修：加一個幕僚

![](/images/COSCUP/coscup-2026/topology-2-chief.svg)<!-- .element: class="diagram" -->

- **改成**：我只跟幕僚講話，其他人一律走 issue
- **代價**：多一層轉譯會失真

---

## 兩個小細節

- **提案到我面前之前要先被挑一輪，但不能讓幕僚自己挑**
- **幕僚要定期換人，不要等它出錯**

---

## 換任的附帶效果才是真的值錢

> **換任越規律，文件庫被迫越誠實。**

推一格，狀態就被逼著寫得更完整一點。

---

## 然後它差點更慘

![](/images/COSCUP/coscup-2026/topology-3-stalled.svg)<!-- .element: class="diagram" -->

我給它一個**很聰明**的模型 —— 結果它什麼都想自己來。

**我從「等十條線」變成「等一條線」。**

---

## 第二次修：前景只做三件事

1. **能自己答的** —— 直接答
2. **需要動手的** —— 「派下去了」，丟給背景子代理
3. **要我決定的** —— 排進晨報

**送出訊息後，如果游標要轉很久才吐第一個字，就是節奏錯了。**

---

## 協調者要的是快，不是頂級智力

> 做不到，幕僚制救不了 owner，只是把過勞從「十條平行的線」換成「一條慢吞吞的線」，換湯不換藥。

> 協調者要的是快、不是頂級智力；吃腦力的判斷本來就在子代理身上。

**併發沒有消失，它只是從我旁邊搬到了幕僚底下。**

---

## 順帶一提，幕僚一開始就在雲上

跑在 Claude Code Cloud Container，不在我的筆電上。

原因很俗：**我通勤搭公車。**

> 本機 session 只活在終端機開著的時候，當幕僚等於橋只有半天是通的。

**先有公車，才有原則。**

---

## 然後我才有空看別的東西

![](/images/COSCUP/coscup-2026/topology-4-gap.svg)<!-- .element: class="diagram" -->

**資料是共用的，理解不是。**

---

## 同一份 issue，不等於同一個脈絡

- 看得到**做了什麼**，看不到**為什麼**，也看不到**現在誰卡在哪**
- 我的 agent 剛問過的，A 的 agent 十分鐘後又問一次
- 有人卡住，卡在自己的視窗裡

**我不塞車之後，才看到大家其實各塞各的。**

---

## 第三次修：roma

![](/images/COSCUP/coscup-2026/topology-5-roma.svg)<!-- .element: class="diagram" -->

**不是各自一顆，是一顆大家一起講話的。**

<small>github.com/jackey8616/roma　·　`docs/adr/` 23 篇決策</small>

---

## 但是共用之後，問題也變成大家的

**誰付錢？用了多少？誰伸手？**

<!-- .slide: class="hero" -->

---

## 誰付錢

- **原本**：大家共用一顆個人訂閱 token
- **壞在**：用完的時候**所有人一起被擋，包括我**
- **改成**：直說額度花完了、任務排隊、加一顆溢流閥
- **代價**：共用 token 就是共用命運

---

## 用了多少

**我也查不出來是誰花的。**

稽核紀錄的 `costUsd` 那一格，我只能填 `unpriced`：

> spent, and nothing will ever name the amount

**省錢跟算得清楚，我目前只能挑一個。**

---

## 誰伸手

- **原本**：給它一組長期憑證放著
- **壞在**：誰碰到都能用，權限是所有 repo 的聯集
- **改成**：**用的時候才鑄，從不持有**
- **代價**：每次都要鑄，多一個會壞的地方

> The App is the agent's hands, not a road.

**手伸得到哪裡，我在外面畫好，不靠它自律。**

---

## 什麼時候不要這樣做

**這件事會不會有第二個人、或第二個我不在場的 session，在我不知道的時候動它？**

不會的話，上面三次修全部是純負擔。

**跳過前兩步直接做第三步，你會得到一顆沒有東西可以讀的常駐 agent。**

---

## 帳單

- **幕僚制要人養** —— 晨報、準則檔、標籤、每週換任
- **共用 token 就是共用命運**
- **roma 23 篇 ADR，沒有 index** —— 這筆帳我還沒付
- **有些決定我寫下來了，但還沒做完**

---

## 瓶頸推了三次，最後一格還是我

幕僚的紅線是**不代替我做決定** —— 不可逆的那些還是全部塞在我這裡。

這格推不推得掉、該不該推，我到現在都還沒想清楚。

大概是這樣？

---

## 喔對，這東西早就有人做完了

Nous Research 的 **Hermes Agent**：

> It's not tied to your laptop —— talk to it from Telegram while it works on a cloud VM.

**我三次修才長出來的東西，人家 README 第一段就寫在那裡了。**

<small>github.com/NousResearch/hermes-agent</small>

---

## 而且地基還在動

![](/images/COSCUP/coscup-2026/topology-6-mesh.svg)<!-- .element: class="diagram" -->

**`SendMessage`（since 2.1.224）—— a send resumes it from its transcript**

----

### 我當初那個笨方法可以退休了

> 若間隔太久，改為帶著結論**換一個新的子代理重做**。

那條規則存在的唯一理由，是我喚不醒已經收工的 agent。現在喚得醒了。

**但它活在 session 裡 —— 該寫下來的還是要寫下來。**

---

## Q&A

**每次加一層，其實只是把瓶頸往外推一格。**
**而每推一格，代價就是狀態要更徹底地落在檔案上。**

<div class="qr">
  <div><img src="/images/COSCUP/coscup-2026/qr-slide.svg" alt="這份簡報"><span>這份簡報</span></div>
  <div><img src="/images/COSCUP/coscup-2026/qr-roma.svg" alt="github.com/jackey8616/roma"><span>roma　引到的 ADR 都在裡面</span></div>
  <div><img src="/images/COSCUP/coscup-2026/qr-me.svg" alt="github.com/jackey8616"><span>我</span></div>
</div>

<!-- .slide: class="hero" -->

<style>
.reveal .slides section { text-align: left; }
.reveal .slides section.hero { text-align: center; }
.reveal .slides section.hero h2 { margin-bottom: 0.6em; }

.reveal h2, .reveal h3 { text-transform: none; }
.reveal h2 { font-size: 1.45em; margin-bottom: 0.4em; }
.reveal h3 { font-size: 1.15em; margin-bottom: 0.4em; }
.reveal p { margin-bottom: 0.6em; }

.reveal ul, .reveal ol { display: block; width: 100%; margin-left: 1em; }
.reveal li { margin-bottom: 0.22em; line-height: 1.3; }
.reveal li li { font-size: 0.85em; opacity: 0.85; margin-bottom: 0.1em; }

.reveal pre { width: 100%; box-shadow: none; font-size: 0.42em; }
.reveal pre code { max-height: 560px; padding: 0.8em 1em; }

.reveal table { font-size: 0.75em; }
.reveal blockquote { width: 100%; font-size: 0.8em; box-shadow: none; }
.reveal small { opacity: 0.6; }

/* 內容真的塞不下的那幾頁 */
.reveal .slides section.dense { font-size: 0.85em; }

.reveal .avatar { width: 190px; height: 190px; border-radius: 50%; object-fit: cover;
                  object-position: 32% 45%;   /* 原圖右邊還有一個人，裁切往左移 */
                  border: none; box-shadow: none; margin: 0 auto 0.5em; display: block; }

/* QR：白底是刻意的，反白的 QR 有些掃描器讀不到 */
.reveal .qr { display: flex; gap: 1.6em; justify-content: center; margin-top: 0.8em; }
.reveal .qr img { width: 176px; height: 176px; margin: 0; border: none; box-shadow: none;
                  background: #fff; padding: 6px; border-radius: 6px; }
.reveal .qr span { display: block; font-size: 0.45em; opacity: 0.65; margin-top: 0.6em; }

/* 拓樸圖：滿版、無邊框、不要 reveal 預設的白框跟陰影 */
.reveal .diagram { width: 100%; max-height: 330px; border: none; box-shadow: none;
                   background: none; margin: 0 0 0.3em; }
</style>
