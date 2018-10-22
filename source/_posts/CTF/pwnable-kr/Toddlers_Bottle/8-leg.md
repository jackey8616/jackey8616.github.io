---
title: pwnable.kr(8) - leg
date: 2018-08-02 23:34:21
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
![](/images/pwnable-kr/leg.png)
## Problem
Points: 2 pt
```
Daddy told me I should study arm.
But I prefer to study my leg!

Download : http://pwnable.kr/bin/leg.c
Download : http://pwnable.kr/bin/leg.asm

ssh leg@pwnable.kr -p2222 (pw:guest)
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Code
```c
#include <stdio.h>
#include <fcntl.h>
int key1(){
    asm("mov r3, pc\n");
}
int key2(){
    asm(
    "push   {r6}\n"
    "add    r6, pc, $1\n"
    "bx r6\n"
    ".code   16\n"
    "mov    r3, pc\n"
    "add    r3, $0x4\n"
    "push   {r3}\n"
    "pop    {pc}\n"
    ".code  32\n"
    "pop    {r6}\n"
    );  
}
int key3(){
    asm("mov r3, lr\n");
}
int main(){
    int key=0;
    printf("Daddy has very strong arm! : ");
    scanf("%d", &key);
    if( (key1()+key2()+key3()) == key ){
        printf("Congratz!\n");
        int fd = open("flag", O_RDONLY);
        char buf[100];
        int r = read(fd, buf, 100);
        write(0, buf, r); 
    }   
    else{
        printf("I have strong leg :P\n");
    }   
    return 0;
}

```

```asm
(gdb) disass main
Dump of assembler code for function main:
   0x00008d3c <+0>: push    {r4, r11, lr}
   0x00008d40 <+4>: add r11, sp, #8
   0x00008d44 <+8>: sub sp, sp, #12
   0x00008d48 <+12>:    mov r3, #0
   0x00008d4c <+16>:    str r3, [r11, #-16]
   0x00008d50 <+20>:    ldr r0, [pc, #104]  ; 0x8dc0 <main+132>
   0x00008d54 <+24>:    bl  0xfb6c <printf>
   0x00008d58 <+28>:    sub r3, r11, #16
   0x00008d5c <+32>:    ldr r0, [pc, #96]   ; 0x8dc4 <main+136>
   0x00008d60 <+36>:    mov r1, r3
   0x00008d64 <+40>:    bl  0xfbd8 <__isoc99_scanf>
   0x00008d68 <+44>:    bl  0x8cd4 <key1>
   0x00008d6c <+48>:    mov r4, r0
   0x00008d70 <+52>:    bl  0x8cf0 <key2>
   0x00008d74 <+56>:    mov r3, r0
   0x00008d78 <+60>:    add r4, r4, r3
   0x00008d7c <+64>:    bl  0x8d20 <key3>
   0x00008d80 <+68>:    mov r3, r0
   0x00008d84 <+72>:    add r2, r4, r3
   0x00008d88 <+76>:    ldr r3, [r11, #-16]
   0x00008d8c <+80>:    cmp r2, r3
   0x00008d90 <+84>:    bne 0x8da8 <main+108>
   0x00008d94 <+88>:    ldr r0, [pc, #44]   ; 0x8dc8 <main+140>
   0x00008d98 <+92>:    bl  0x1050c <puts>
   0x00008d9c <+96>:    ldr r0, [pc, #40]   ; 0x8dcc <main+144>
   0x00008da0 <+100>:   bl  0xf89c <system>
   0x00008da4 <+104>:   b   0x8db0 <main+116>
   0x00008da8 <+108>:   ldr r0, [pc, #32]   ; 0x8dd0 <main+148>
   0x00008dac <+112>:   bl  0x1050c <puts>
   0x00008db0 <+116>:   mov r3, #0
   0x00008db4 <+120>:   mov r0, r3
   0x00008db8 <+124>:   sub sp, r11, #8
   0x00008dbc <+128>:   pop {r4, r11, pc}
   0x00008dc0 <+132>:   andeq   r10, r6, r12, lsl #9
   0x00008dc4 <+136>:   andeq   r10, r6, r12, lsr #9
   0x00008dc8 <+140>:           ; <UNDEFINED> instruction: 0x0006a4b0
   0x00008dcc <+144>:           ; <UNDEFINED> instruction: 0x0006a4bc
   0x00008dd0 <+148>:   andeq   r10, r6, r4, asr #9
End of assembler dump.
(gdb) disass key1
Dump of assembler code for function key1:
   0x00008cd4 <+0>: push    {r11}       ; (str r11, [sp, #-4]!)
   0x00008cd8 <+4>: add r11, sp, #0
   0x00008cdc <+8>: mov r3, pc
   0x00008ce0 <+12>:    mov r0, r3
   0x00008ce4 <+16>:    sub sp, r11, #0
   0x00008ce8 <+20>:    pop {r11}       ; (ldr r11, [sp], #4)
   0x00008cec <+24>:    bx  lr
End of assembler dump.
(gdb) disass key2
Dump of assembler code for function key2:
   0x00008cf0 <+0>: push    {r11}       ; (str r11, [sp, #-4]!)
   0x00008cf4 <+4>: add r11, sp, #0
   0x00008cf8 <+8>: push    {r6}        ; (str r6, [sp, #-4]!)
   0x00008cfc <+12>:    add r6, pc, #1
   0x00008d00 <+16>:    bx  r6
   0x00008d04 <+20>:    mov r3, pc
   0x00008d06 <+22>:    adds    r3, #4
   0x00008d08 <+24>:    push    {r3}
   0x00008d0a <+26>:    pop {pc}
   0x00008d0c <+28>:    pop {r6}        ; (ldr r6, [sp], #4)
   0x00008d10 <+32>:    mov r0, r3
   0x00008d14 <+36>:    sub sp, r11, #0
   0x00008d18 <+40>:    pop {r11}       ; (ldr r11, [sp], #4)
   0x00008d1c <+44>:    bx  lr
End of assembler dump.
(gdb) disass key3
Dump of assembler code for function key3:
   0x00008d20 <+0>: push    {r11}       ; (str r11, [sp, #-4]!)
   0x00008d24 <+4>: add r11, sp, #0
   0x00008d28 <+8>: mov r3, lr
   0x00008d2c <+12>:    mov r0, r3
   0x00008d30 <+16>:    sub sp, r11, #0
   0x00008d34 <+20>:    pop {r11}       ; (ldr r11, [sp], #4)
   0x00008d38 <+24>:    bx  lr
End of assembler dump.
```

## Thinking
Problem provide C code and ARM asm code, just focus on C code first.  
Don't look around and pay attention on `main`.

```c
    if( (key1()+key2()+key3()) == key ){
        printf("Congratz!\n");
        int fd = open("flag", O_RDONLY);
        char buf[100];
        int r = read(fd, buf, 100);
        write(0, buf, r); 
    }   
    else{
        printf("I have strong leg :P\n");
    }
```
The `is` tells us the result of `key1()`, `key2()` and `key3()` will be answer to the flag.
Let's solve some ARM!  

Before start on ARM, make sure you understance basic ASM instruction and ARM's pipline & thumb modes.
Reference at [here](/2018/08/02/CTF/ARM-ISA/).

## Solution
### key1()
```asm
(gdb) disass key1
Dump of assembler code for function key1:
   0x00008cd4 <+0>: push    {r11}       ; (str r11, [sp, #-4]!)
   0x00008cd8 <+4>: add r11, sp, #0
   0x00008cdc <+8>: mov r3, pc
   0x00008ce0 <+12>:    mov r0, r3
   0x00008ce4 <+16>:    sub sp, r11, #0
   0x00008ce8 <+20>:    pop {r11}       ; (ldr r11, [sp], #4) 
   0x00008cec <+24>:    bx  lr  
End of assembler dump.
```
In order to use register, first push the register's value into stack.
So `<+0>` make a push of r11, and assign `sp` to `r11`.
Ofcourse, remember to give value back to register from stack and restore sp,
which `<+16>` and `<+20>` is doing.

So the code will looks like:
```asm
   0x00008cdc <+8>: mov r3, pc
   0x00008ce0 <+12>:    mov r0, r3
   ...
   0x00008cec <+24>:    bx  lr  
```
Here `<+8>` move pc into r3, before we do that. We should check pc's value, and it leads us to check the processor's status is under `ARM` or `Thumb`.
In order to check that, we should seek any `BX` or `BLX` instruction before enter this function in `main`, which is nothing we can find! looool.
So, ARM status is default for processor, then we can sure the pc will point to current instruction + 8, and that is `0x00008cdc <+12> + 8 = 0x00008ce4`.
Then move `r3` to `r0`, which is the function's return value.

After that, a cool `bx lr` back to `main`.
BUT! this is a `bx` which means it may cause status change.
So we need to check what is in `lr` to change mode or node.
The value of `lr` is the next instruction address before calling `key1()`, and that would be `0x00008d6c`, the last bit of `lr` is `0`, so we are still under `ARM status`.

### key2()
```asm
(gdb) disass key2
Dump of assembler code for function key2:
   0x00008cf0 <+0>: push    {r11}       ; (str r11, [sp, #-4]!)
   0x00008cf4 <+4>: add r11, sp, #0
   0x00008cf8 <+8>: push    {r6}        ; (str r6, [sp, #-4]!)
   0x00008cfc <+12>:    add r6, pc, #1
   0x00008d00 <+16>:    bx  r6
   0x00008d04 <+20>:    mov r3, pc
   0x00008d06 <+22>:    adds    r3, #4
   0x00008d08 <+24>:    push    {r3}
   0x00008d0a <+26>:    pop {pc}
   0x00008d0c <+28>:    pop {r6}        ; (ldr r6, [sp], #4)
   0x00008d10 <+32>:    mov r0, r3
   0x00008d14 <+36>:    sub sp, r11, #0
   0x00008d18 <+40>:    pop {r11}       ; (ldr r11, [sp], #4)
   0x00008d1c <+44>:    bx  lr
End of assembler dump.
```
Under `ARM status`, `r11` stores main's `sp`, and `r6` is `pc + 1`, which `pc` is `0x00008cfc <+12> + 8 + 1 = 0x00008d05`.
And than a `bx` to exchange status, `r6`'s last bit is `1`, so change to `thumb` mode.
Move `pc` into `r3`, which `r3 = 0x00008d04 + 4 = 0x00008d08`.
After that make a `adds` to `r3`, so right now `r3 = 0x00008d0c`.
blah blah blah. and move `r3` to `r0`.
So the return is `0x00008d0c`

Don't forget `<+44>`, check `lr` is `0x00008d74`, cool, still under `ARM status`.
### key3()
```asm
(gdb) disass key3
Dump of assembler code for function key3:
   0x00008d20 <+0>: push    {r11}       ; (str r11, [sp, #-4]!)
   0x00008d24 <+4>: add r11, sp, #0
   0x00008d28 <+8>: mov r3, lr
   0x00008d2c <+12>:    mov r0, r3
   0x00008d30 <+16>:    sub sp, r11, #0
   0x00008d34 <+20>:    pop {r11}       ; (ldr r11, [sp], #4)
   0x00008d38 <+24>:    bx  lr
End of assembler dump.
```
Stll `ARM status`, the first thing we found is `lr` put into `r3`, and `lr` is `0x00008d80 <+68>` at `main`.
And? not, there is no then, that is the return value, looooooooooool.!

### Summation
So `key1() + key2() + key3()` = `0x00008ce4 + 0x00008d0c + 0x00008d80` which is `0x0001a770`.

### If you noticed....
We seems not care about main's value, but this is the time we should take a look about it.
After `key1()` executed, the return value is `0x00008ce4`, this value have been store at `r4`, which shows by `0x00008d6c <+48>`.
Also after `key2()` executed, `0x00008d0c` been store at `r3`.
Here is funny things at `<+60>` in `main()`, which is `0x00008d78 <+60>:    add r4, r4, r3`.
Now, `r4 += r3`, we may need this value later, just put it next to you.  

After `key3()` executed, the return value is `0x00008d80`, and `r3` is already been overwrite to it.
And `r2 = r4 + r3`, at this point, the `r2` stores summation of all three functions.  

## Reference
[ARM Instruction Set Architecture Notes](/2018/08/02/CTF/ARM-ISA/).
