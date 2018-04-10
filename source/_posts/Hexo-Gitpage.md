---
title: Hexo / Gitpage / TravisCI 建置
date: 2018-04-10 12:21:03
categories: Hexo
tags:
  - Hexo
---

# 前言  
沒有前言, 只有動手。  

<!-- More -->
# 需求  
> NodeJS 
> Git  
> Hexo  
  
## 安裝 NodeJS 
### NVM  
安裝script (curl / wget 擇一):  
```sh
~$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
~$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
安裝完成後可以source一下自己的.nvm資料夾來注入command以便直接使用。  
當然, 直接關閉Shell重開一個也行。
```sh
~$ source ~/.nvm/nvm.sh
```

> Fish並沒有辦法直接執行NVM, 所以必須要使用其他Shell或原生的Shell。
> 或者你可以參考我的[另外一篇文章](/2018/04/10/Fish-with-NVM/)...

檢查一下NVM確實安裝了。  
```sh
~$ nvm version
v9.11.1
```

### NPM
透過指令安裝穩定版NPM。
```sh
nvm install stable
```

```sh
~$ npm -version
5.6.0
```
