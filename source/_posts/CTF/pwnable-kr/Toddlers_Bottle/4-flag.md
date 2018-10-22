---
title: pwnable.kr(4) - flag
date: 2018-05-24 23:46:51
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
![](/images/pwnable-kr/flag.png)
## Problem  
Points: 7 pt  
```
Papa brought me a packed present! let's open it.

Download : http://pwnable.kr/bin/flag

This is reversing task. all you need is binary
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Thinking  
程式沒有辦法直接使用`objdump`或者是`gdb`來反組譯。  
透過 `hexdump -C <filename> | grep -C 1 UPX` 檢查是不是有加殼。
```sh  
000000a0  00 00 00 00 00 00 00 00  00 00 20 00 00 00 00 00  |.......... .....|
000000b0  fc ac e0 a1 55 50 58 21  1c 08 0d 16 00 00 00 00  |....UPX!........|
000000c0  21 7c 0d 00 21 7c 0d 00  90 01 00 00 92 00 00 00  |!|..!|..........|
```
結果顯示是有經過`UPX`加殼，於是`upx -d <filename>`脫殼。  
脫殼之後就可以用`gdb`或者是`objdump`反組譯。  

## Code
{% codeblock main lang:x86asm %}
   0x0000000000401164 <+0>:     push   rbp
   0x0000000000401165 <+1>:     mov    rbp,rsp
   0x0000000000401168 <+4>:     sub    rsp,0x10
   0x000000000040116c <+8>:     mov    edi,0x496658
   0x0000000000401171 <+13>:    call   0x402080 <puts>
   0x0000000000401176 <+18>:    mov    edi,0x64
   0x000000000040117b <+23>:    call   0x4099d0 <malloc>
   0x0000000000401180 <+28>:    mov    QWORD PTR [rbp-0x8],rax
   0x0000000000401184 <+32>:    mov    rdx,QWORD PTR [rip+0x2c0ee5]        # 0x6c2070 <flag>
   0x000000000040118b <+39>:    mov    rax,QWORD PTR [rbp-0x8]
   0x000000000040118f <+43>:    mov    rsi,rdx
   0x0000000000401192 <+46>:    mov    rdi,rax
   0x0000000000401195 <+49>:    call   0x400320
   0x000000000040119a <+54>:    mov    eax,0x0
   0x000000000040119f <+59>:    leave  
   0x00000000004011a0 <+60>:    ret    
{% endcodeblock %}

## Solution  
程式當中+32特別強調了flag。  
直接單步執行到+39行。  
接著查看`rdx`裏面放了什麼。  
```sh  
gdb-peda$ x /s $rdx
0x496628:       "UPX...? sounds like a delivery service :)"
gdb-peda$ 
```

GET flag!  

## Prepare  
### Register  
| Name | 16bit | 32bit | 64bit |   
| :--: | :--: | :--: | :--: |  
| Data | DX | EDX | RDX |  
### UPX  


## Reference  
[Assembly - Registers](https://www.tutorialspoint.com/assembly_programming/assembly_registers.htm)

