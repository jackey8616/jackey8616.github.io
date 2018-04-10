---
title: C/C++
date: 2018-04-10 11:15:00
updated: 2018-04-10 17:50:00
tags:
  - Note
categories: Note
---
這裏面放了一些石破天驚之類的想法，然後搜尋之後得到的解答。  
可能還會有很多奇怪小伙伴的垃圾話。  
<!-- More -->  
  
  
### Why pointer declartion needs a datatype?  
今天上課上到一半，鄰座的同學君突然問我為什麼Pointer要有型態。  
同樣都是存記憶體位置，int\* 跟float\*的指標並不會不一樣。
  
後來查了之後才知道, 因為datatype所佔的記憶體大小各自不一，
compiler除了要知道記憶體起始位置以外，還需要知道所佔的長度，才可以取值。
Reference: [StackOverFlow](https://stackoverflow.com/questions/9802585/why-data-type-is-needed-in-pointer-declaration)  
