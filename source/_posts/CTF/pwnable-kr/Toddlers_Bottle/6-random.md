---
title: pwnable.kr(6) - random
date: 2018-05-30 23:36:51
tags:
  - CTF
  - PWN
  - pwnable.kr
  - Toddler's Bottle
  - WriteUps
categories:
  - CTF
  - pwnable.kr
  - Toddler's Bottle
---
![](/images/pwnable-kr/random.png)
## Problem  
Points: 1 pt  
```
Daddy, teach me how to use random value in programming!

ssh random@pwnable.kr -p2222 (pw:guest)
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Code
```c
#include <stdio.h>

int main(){
        unsigned int random;
        random = rand();        // random value!

        unsigned int key=0;
        scanf("%d", &key);

        if( (key ^ random) == 0xdeadbeef ){
                printf("Good!\n");
                system("/bin/cat flag");
                return 0;
        }

        printf("Wrong, maybe you should try 2^32 cases.\n");
        return 0;
}

```

## Thinking  
L32產生一個亂數放入`random`。
L37如果輸入的`key`跟`random`作`互斥或(XOR)`運算後等於`0xdeadbeef`，則獲得flag。

## Prepare  
### C rand
```c
#include <stdlib.h>
int rand (void);
```

```
An integer value between 0 and RAND_MAX.
```
`rand()`所產生的，是使用`Linear congruential generator(線性同餘法, LCG)`所產生的偽亂數。  

## Solution  
本題只有使用`rand()`取亂數，而`rand()`在呼叫前會檢查是否呼叫過`srand()`，  
如果有的話，則把seed拿來取亂數。  
否的話，則自動呼叫`srand(1)`再取亂數。  

所以按照L34來看，程式每次執行的`random`變數都會是一樣，因為每次使用的`seed`都是`1`。  

進入`gdb`來看大略的程式：
{% codeblock main lang:x86asm %}
gdb-peda$ disass
Dump of assembler code for function main:
   0x00000000004005f4 <+0>:     push   rbp
   0x00000000004005f5 <+1>:     mov    rbp,rsp
   0x00000000004005f8 <+4>:     sub    rsp,0x10
   0x00000000004005fc <+8>:     mov    eax,0x0
   0x0000000000400601 <+13>:    call   0x400500 <rand@plt>
   0x0000000000400606 <+18>:    mov    DWORD PTR [rbp-0x4],eax
   0x0000000000400609 <+21>:    mov    DWORD PTR [rbp-0x8],0x0
   0x0000000000400610 <+28>:    mov    eax,0x400760
   0x0000000000400615 <+33>:    lea    rdx,[rbp-0x8]
{% endcodeblock %}

可以看到在`+13`的部份呼叫了`rand`方法。
而下面的`+18`,`+21`則是在把值放進去，高位元`0x8`放入了`0x0`，低位元`0x4`放入了`EAX`的值。  
這個時候我們只需要察看`EAX`裏面是什麼，就可以知道`rand`所產生的數是多少了。

```sh
gdb-peda$ xinfo $eax
0x6b8b4567 

gdb-peda$ 
```
所以`0x6b8b4567`就是實際`rand`出來的數值。

```
1 ^ 1 = 0
1 ^ 0 = 1
A ^ B = C
C ^ B = A
```
`key ^ EAX = 0xdeadbeef` 然後`0xdeadbeef ^ EAX = key`  
於是套入`0xdeadbeef ^ 0x6b8b4567 = 0xb526fb88`  
`XOR`完的結果還需要轉換成十進位，因為`key`的輸入是採十進位輸入。  
最終結果是`3039230856`  
直接開啟程式，輸入就可以獲得flag了。  

## Reference  
[Cplusplus - rand](http://www.cplusplus.com/reference/cstdlib/rand/)

