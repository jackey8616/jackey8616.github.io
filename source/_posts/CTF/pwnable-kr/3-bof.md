---
title: pwnable.kr(3) - bof
date: 2018-05-24 02:19:49
tags:
  - CTF
  - PWN
  - pwnable.kr
categories:
  - CTF
  - pwnable.kr
---
![](http://pwnable.kr/img/bof.png)
## Problem  
Points: 5 pt  
```
Nana told me that buffer overflow is one of the most common software vulnerability. 
Is that true?

Download : http://pwnable.kr/bin/bof
Download : http://pwnable.kr/bin/bof.c

Running at : nc pwnable.kr 9000
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Code
```c 
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
void func(int key){
        char overflowme[32];
        printf("overflow me : ");
        gets(overflowme);       // smash me!
        if(key == 0xcafebabe){
                system("/bin/sh");
        }
        else{
                printf("Nah..\n");
        }
}
int main(int argc, char* argv[]){
        func(0xdeadbeef);
        return 0;
}
```

## Thinking  


## Prepare  
### Register  
| Register Name | 16bit | 32bit | 64bit |  
| :-----: | :-----: | :-----: | :-----: |  
| Instruction Pointer | IP | EIP | RIP |  
| Source Pointer | SP | ESP | RSP |  
| Base Pointer | BP | EBP | RBP |  

**IP / EIP / RIP**  
紀錄跳出迴圈後下一個指令地址的暫存器。  

**BP / EBP / RBP**  
紀錄Stack底部地址的暫存器。
在function call之後，由SP傳遞進BP。  

**SP / ESP / RSP**  
紀錄Stack頂部地址的暫存器。
在function call之後，紀錄著Stack頂部地址。  

## Solution  

## Reference  
[Assembly - Registers](https://www.tutorialspoint.com/assembly_programming/assembly_registers.htm)

