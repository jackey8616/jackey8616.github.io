---
title: pwnable.kr(3) - bof
date: 2018-05-24 02:19:49
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
![](/images/pwnable-kr/bof.png)
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

### C gets  
```c
#include <stdio.h>
char *gets(char *str);
```

```
On success, the function returns str.
If the end-of-file is encountered while attempting to read a character, the eof indicator is set (feof).
If this happens before any characters could be read, the pointer returned is a null pointer (and the contents of str remain unchanged).
If a read error occurs, the error indicator (ferror) is set and a null pointer is also returned (but the contents pointed by str may have changed).
```

## Solution  
L15`func`的傳入參數是`0xdeadbeef`而且是hardcode。  
我們可以先從gdb找到`0xdeadbeef`來定位出整個func在stack的起始位址。  
在開始`find`之前，記得下中斷點在`func`上, 並且將整個程式執行到中斷處才去做`find`。
```sh
gdb-peda$ b main
Breakpoint 1 at 0x68d
gdb-peda$ b func
Breakpoint 2 at 0x632
gdb-peda$ info b
Num     Type           Disp Enb Address    What
1       breakpoint     keep y   0x0000068d <main+3>
2       breakpoint     keep y   0x00000632 <func+6>

Breakpoint 2, 0x56555632 in func ()
gdb-peda$ find 0xdeadbeef
Searching for '0xdeadbeef' in: None ranges
Found 3 results, display max 3 items:
    bof : 0x56555696 (<main+12>:        out    dx,eax)
    bof : 0x56556696 --> 0xdeadbeef 
[stack] : 0xffffced0 --> 0xdeadbeef 
gdb-peda$ 
```
在`[stack]`中，0xffffced0就是`func`的開頭位址， 後面並且依次堆疊上去。  


## Reference  
[Assembly - Registers](https://www.tutorialspoint.com/assembly_programming/assembly_registers.htm)
[Cplusplus - gets](http://www.cplusplus.com/reference/cstdio/gets/)

