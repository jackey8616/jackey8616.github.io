---
title: Let the Hexo fly for a while.
date: 2018-04-10 10:57:25
tags: 
  - Hexo
  - NexT
  - Note
categories: Note
---

大小事紀錄。
搞不好會變成什麼NexT協助開發日誌XDDDD"  
可以當吃泡麵的小故事看一看，如果是純技術向，可能要下拉跳過中間。  

<!-- More -->

## NexT Theme 
### Feature A: Date & Time
剛剛一直在找Front-Matter為什麼沒辦法顯示文章上次編輯時間的原因。  
後來才赫然發現, post\_meta的設定當中, updated\_diff的判定居然只有到date。  
所以我今天寫的文章，編輯過後都顯示不出來的原因就是這個...  

#### Part I
於是就想說去NexT提一下Feature。  
稍微改了一下原本 next/layout/\_marco/post.swig的內容。  
讓hexo config裡面的date\_format跟time\_format可以merge在一起。  
詳細可以參考[這個PR](https://github.com/theme-next/hexo-theme-next/pull/223/commits/b8ebb3215c3994210c01360e24dea164616521fc)，剛開，還熱的。

#### Part II  
本來在耍廢，耍到一半突然NexT的[ivan-nginx](https://github.com/ivan-nginx)送了一個comment過來。  
是大神comment我還不排除萬難看懂它哈哈哈哈。  
因為我PR丟出去之後，還有稍微討論了一下Code的部份，因為後來睡醒之後想想覺得業務邏輯寫起來好像怪怪的。 

的確經過程式碼修正之後，是可以正確的判斷文章需不需要顯示更新時間，  
但是那個前提是在有將旗標打開來強制merge出datetime格式。  
如果沒開旗標的話，判斷還是只有到date而沒有time。  
所以我後來跟ivan講說這一塊我會再修好。  

他也很豪爽的說我的PR沒什麼問題，修了一個bug還新增一個future是一石二鳥XD  
然後後來他送了的這個comment是跟[Hexo的ejs模板中的方法](https://hexo.io/docs/helpers.html#full-date)，提供一個很簡便函數讓我們呼叫然後按照指定格式輸出，  
預設自動把date跟time給merge在一起。 根本就是為了我這個Feature設計的。  

接下來就碰到問題啦...NexT用的模板引擎是Swig，可是Hexo用的是ejs，這兩個是沒辦法相容的。  
我本來還想說用Swig的Syntax下去硬試，結果hexo server噴的我滿臉都是豆花，  
後來又問了ivan才發現我Syntax打錯了....  
Function的設計有關注到Swig跟Ejs, 那個不是原生的模板方法, 所以可以直接調用...  

第一次大Repo送PR就出糗XDDDDDDDDDDDDDDDDDDDDD  

##### 後續  


---  

## Plugins  
6.1.4版本中，安裝插件並不需要在\_config.yml配置檔案裏面新增任何plugins欄位。  
只需要配置插件自身的設定選項即可。  

剛剛不知道哪裡看到的，要增加一個plugins欄位。  
結果加上去就完全不會生成靜態網頁了...  
