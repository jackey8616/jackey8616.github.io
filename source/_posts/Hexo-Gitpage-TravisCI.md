---
title: Hexo / Gitpage / TravisCI 建置
date: 2018-04-10 12:21:03
categories: Hexo
tags:
  - Hexo
---

# 前言  
沒有前言, 只有動手。  
謹紀錄架設踩坑遊記。  
  
<!-- More -->
我會稍微介紹一下，以防有什麼前置知識不懂。  

## GitPage
GitPage有點像是暱稱，正式的稱法應該是[GitHub Pages](https://pages.github.com/)，  
是由GitHub所提供，便利contributor針對各自的repository去建置靜態的網站可以放置諸如API Doc等專案訊息。   
  
其中,   
GitHub還提供每個帳號透過建立一個 [account].github.io repository的方式  
來產生自己的blog的服務。  
久而久之，很多contributor就習慣以靜態網站的方式去blogging筆記, 心得等內容,  
作為自己的里程碑, 或者是單純的developing log。  
  
網路上有很多相關的教學 如何建置自己的GitHub靜態網站等, 稍微Google一下就有了。  
如果一些教學文都跟現行版本有所出入的話, 可以試著參考看看[GitHub Pages](https://pages.github.com)自帶的教學。
  
## Hexo  
坦白講我也沒辦法很詳細的敘述他是什麼東西，哈哈。  
[Hexo](https://hexo.io/)是一個基於[Node.js](https://nodejs.org)開發的blogging框架, 使用Markdown（或其他渲染引擎）來解析你的文章，並且生成靜態網頁。  
算是集套板, 佈署, 還有簡便編輯(Markdown)於一身的一個框架？  
透過Hexo跟GitPage的結合, 就可以開始做自己的bloggin。
  
## TravisCI
Travis是名字, CI是指持續整合(Continuous integration), 有機會再介紹CI是什麼。  
[TravisCI](https://travis-ci.org/)是一個服務, 透過GitHub來自動的為Contributor針對repository做自動化建置或者是佈署。

在建立靜態網站中, 我們是透過編輯一個branch的方式,  
來讓CI替我們generate靜態檔案，  
然後自動Push到網站的master分支，來達到更新的目的。  
  
--- 

# 環境 & 需求  
我不喜歡用Windows XDDDD"  
所以以下的全部教學都基於Ubuntu。  
> Ubuntu 16.04 LTS
  
> NodeJS 
> Git  
> Hexo  
  
# 安裝
## 安裝 NVM  
安裝script (curl / wget 擇一):  
```sh
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
安裝完成後可以source一下自己的.nvm資料夾來注入command以便直接使用。  
當然, 直接關閉Shell重開一個也行。
```sh
$ source ~/.nvm/nvm.sh
```

> Fish並沒有辦法直接執行NVM, 所以必須要使用其他Shell或原生的Shell。
> 或者你可以參考我的[另外一篇文章](/2018/04/10/Fish-with-NVM/)...

檢查一下NVM確實安裝了。  
```sh
$ nvm version
v9.11.1
```

## 安裝 NPM
透過指令安裝穩定版NPM。
```sh
nvm install stable
```

```sh
$ npm -version
5.6.0
```

## 安裝 Git  
+ Linux(Ubuntu, Debian): `$ sudo apt-get install git`
+ Linux(Fedora, RedHat, CentOS, Arch...etc): 抱歉我沒用過哈哈哈...
  

## 安裝 Hexo  
全部都裝好之後, 就可以透過`npm`來安裝`Hexo`：  
`$ npm install -g hexo-cli`
  
# Hexo 使用  
使用Hexo以前, 首先你必須要先初始化hexo  
這個動作會由hexo來自行clone一個最基礎的blog檔案結構  
```
$ hexo init                      // 當前目錄初始化
$ hexo init [folder]    // 指定目錄初始化
```
> 需要注意, 無論是哪種方式執行, 目錄都必須為空。

## 真的裝好了嗎？  
移動到剛才的目錄裏面, 並且執行`$ hexo server`這個指令。  
hexo會自動啟動一個本地的伺服器, 預設Port為4000。  
接著直接到瀏覽器裏面連接網頁就可以了，  
你應該可以看到一個最基礎HelloWorld頁面由Hexo幫你自動建置好。  

## 結構  
Hexo init之後，整個資料夾的結構應該看起來是：
```
hexo folder
  |-> _config.yml
  |-> db.json
  |-> node_modules/
  |-> package.json
  |-> package-lock.json
  |-> scaffolds/
  |-> source/             頁面資料夾
  |       |-> _post/       文章資料夾
  |-> themes/          樣板資料夾
```

## 一些指令  
### hexo clean
清除所有hexo生成的靜態網頁，確保每次的產出都一致。

### hexo generate  
將目前所有的內容產出靜態網頁, 並且放置於public資料夾。

### hexo server
開啟一個本地的測試伺服器已供瀏覽效果。

### hexo deploy  
將內容佈署到遠端伺服器。  

## 一個正常的流程  

除了hexo server這個指令以外，還有其他幾個指令是Post一篇文章基本需要的。
1. hexo clean    
2. hexo new (page name)  
3. (Edit your post's markdown.  
4. hexo server   // for debug.  
5. hexo deploy  
  
hexo的server很不錯，每次在編輯Post的Markdown存檔的時候，  
會自動偵測diff然後馬上反應，所以不需要一直反覆的重開server來看效果,  
所以基本上寫一篇文章, 就是不斷的編輯, 然後切換視窗看當前的即時效果直到滿意，
最後就可以deploy去佈署，那樣就完成一篇文章的產出，以及釋出了。  

