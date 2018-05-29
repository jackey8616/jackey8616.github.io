---
title: pwnable.kr(5) - passcode
date: 2018-05-25 01:15:51
tags:
  - CTF
  - PWN
  - pwnable.kr
categories:
  - CTF
  - pwnable.kr
---
![](/images/pwnable-kr/passcode.png)
## Problem  
Points: 10 pt  
```
Mommy told me to make a passcode based login system.
My initial C code was compiled without any error!
Well, there was some compiler warning, but who cares about that?

ssh passcode@pwnable.kr -p2222 (pw:guest)
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Thinking  

## Code
```c
#include <stdio.h>
#include <stdlib.h>

void login(){
        int passcode1;
        int passcode2;

        printf("enter passcode1 : ");
        scanf("%d", passcode1);
        fflush(stdin);

        // ha! mommy told me that 32bit is vulnerable to bruteforcing :)
        printf("enter passcode2 : ");
        scanf("%d", passcode2);

        printf("checking...\n");
        if(passcode1==338150 && passcode2==13371337){
                printf("Login OK!\n");
                system("/bin/cat flag");
        }
        else{
                printf("Login Failed!\n");
                exit(0);
        }
}

void welcome(){
        char name[100];
        printf("enter you name : ");
        scanf("%100s", name);
        printf("Welcome %s!\n", name);
}

int main(){
        printf("Toddler's Secure Login System 1.0 beta.\n");

        welcome();
        login();

        // something after login...
        printf("Now I can safely trust you that you have credential :)\n");
        return 0;
}

```

## Solution  
`main`當中只有兩個function, L27`welcome`看起來很正常，scanf有指定字元長度100，沒有辦法做bof。  
接著看L4`login`，其中L9跟L14的`scanf`都沒有`&`取址符號，所以會直接取用這兩個沒有初始化的變數內容來當作地址輸入。  

在沒辦法正確輸入數值到`passcode1`跟`passcode2`的狀況之下，理所當然會得到一個`Address boundary error`，所以連試都不用試了。  
所以我們需要找出方法，把`passcode1`的內容設定成一個合法的地址。  
幾個輸入點只有`welcome`的L30，`login`的L9,L14。
雖然`welcome`的`scanf`有指定字元長度， 但是還是用`gdb`看一下能不能蓋內容過去。

```sh
Breakpoint 1, 0x08048668 in main ()
gdb-peda$ x $ebp
0xffcc3728:     0x00000000
gdb-peda$ 
```

## Prepare  
### C scanf  
```
include: #include <stdio.h>
function define: int scanf(const char *format, ...);
return: If success, return the number of items of argument list successfully filled.
if a reading error happens or the EOF is reached while reading, 
the proper indicator is set. 
```
正常來講, `scanf`的常見格式應該為`scanf("%s", &var);`。  
若`scanf`沒有取址符號`&`，則直接將var的值作為地址寫入。  
所以平常情況下，沒有加上取址符號會造成`Address boundary error`

## Reference  

