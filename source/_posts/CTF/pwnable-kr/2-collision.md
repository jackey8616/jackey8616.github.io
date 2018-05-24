---
title: pwnable.kr(2) - collision
date: 2018-05-24 00:45:39
tags:
  - CTF
  - PWN
  - pwnable.kr
categories:
  - CTF
  - pwnable.kr
---
![](http://pwnable.kr/img/collision.png)
## Problem  
Points: 3 pt  
```
Daddy told me about cool MD5 hash collision today.
I wanna do something like that too!

ssh col@pwnable.kr -p2222 (pw:guest)
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Code
```c 
#include <stdio.h>
#include <string.h>
unsigned long hashcode = 0x21DD09EC;
unsigned long check_password(const char* p){
        int* ip = (int*)p;
        int i;
        int res=0;
        for(i=0; i<5; i++){
                res += ip[i];
        }
        return res;
}

int main(int argc, char* argv[]){
        if(argc<2){
                printf("usage : %s [passcode]\n", argv[0]);
                return 0;
        }
        if(strlen(argv[1]) != 20){
                printf("passcode length should be 20 bytes\n");
                return 0;
        }

        if(hashcode == check_password( argv[1] )){
                system("/bin/cat flag");
                return 0;
        }
        else
                printf("wrong passcode.\n");
        return 0;
}

```

## Prepare  
### little-endian  
[Link](https://en.wikipedia.org/wiki/Endianness#Little-endian)

## Thinking  
L16 需求一個參數作為passcode，L19 passcode必須長20Byte。  
L4 check\_password方法，將輸入p強制以int方式處理。
對應20Byte輸入passcode將轉為5個int處理，呼應L8 for迴圈上限5。  
回傳值為5個int總和。

L24 若check\_password回傳值等於 L3 0x21DD09EC則獲得flag。


## Solution  
一個字元是由1個Byte所組成，而一個int是由4個Byte所組成。
所以輸入的字元每4個一組，轉換為整數後相加必須為0x21DD09EC。  

由於輸入必須可以分為5組int,轉為20Byte，20字元。 
直接以0x21DD09EC除以5可得113626824(0x6C5CEC8)餘4。  
則可以確定總和為 0x06C5CEC8 * 4 + 0x06C5CECC。  

因C語言處理字元有順序問題（小序），反轉後轉為字元即為：  
\xC8\xCE\xC5\x06 * 4 + \xCC\xCE\xC5\x06
輸出使用Python組合：
```sh
$ ./col `python -c "print '\xC8\xCE\xC5\x06' * 4 + '\xCC\xCE\xC5\x06'"`
```

## Reference  
[Little-endian](https://en.wikipedia.org/wiki/Endianness#Little-endian)

