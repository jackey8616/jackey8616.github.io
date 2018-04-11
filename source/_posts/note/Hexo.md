---
title: Hexo
date: 2018-04-10 10:57:25
tags: 
  - Hexo
  - Note
categories: Note
---

天坑紀錄。
<!-- More -->

# Date & Time  
剛剛一直在找Front-Matter為什麼沒辦法顯示文章上次編輯時間的原因。  
後來才赫然發現, post\_meta的設定當中, updated\_diff的判定居然只有到date。  
所以我今天寫的文章，編輯過後都顯示不出來的原因就是這個...  

於是就想說去NexT提一下Feature。  
稍微改了一下原本 next/layout/\_marco/post.swig的內容。  
讓hexo config裡面的date\_format跟time\_format可以merge在一起。  
詳細可以參考[這個PR](https://github.com/theme-next/hexo-theme-next/pull/223/commits/b8ebb3215c3994210c01360e24dea164616521fc)，剛開，還熱的。

# Plugins  
6.1.4版本中，安裝插件並不需要在\_config.yml配置檔案裏面新增任何plugins欄位。  
只需要配置插件自身的設定選項即可。  

剛剛不知道哪裡看到的，要增加一個plugins欄位。  
結果加上去就完全不會生成靜態網頁了...  
