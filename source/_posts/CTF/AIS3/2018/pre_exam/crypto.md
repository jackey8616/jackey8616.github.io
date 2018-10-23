---
title: crypto
date: 2018-08-01 21:14:44
tags:
  - CTF
  - AIS3
  - pre exam
categories:
  - CTF
  - AIS3
  - 2018
---

This is 2018 AIS3 prexam crypto writeups.
<!-- More -->

## pow 
```python=
from pwn import *
import hashlib
from os import urandom

p = remote('104.199.235.135',20000)

print(p.recvuntil("== '"))
prefix = p.recvuntil("'", drop=True)
sha_start = '000000'

print(prefix, sha_start)

while True:
    x = urandom(8).encode('hex')
    if hashlib.sha256(prefix + x).hexdigest().startswith('000000'):
        print('found' + prefix + x)
        p.sendlineafter('x = ', prefix + x)
        print(p.recvline())
        break
```

Just rand...

---

## XOR 
Use `AIS{` to calculate first four keys.
Use `}` to confirm key length is 10 bytes.
```python=
import binascii

with open('flag-encrypted', 'rb') as encFile:
    encData = encFile.read()
    byteData = binascii.hexlify(encData)
    hexData = [byteData[i:i + 2] for i in range(0, len(byteData), 2)] 
    #print(len(hexData))
    #print(hex(int(hexData[0], 16) ^ ord('A')))
    #print(hex(int(hexData[1], 16) ^ ord('I')))
    #print(hex(int(hexData[2], 16) ^ ord('S')))
    #print(hex(int(hexData[3], 16) ^ ord('{')))
    #print(hex(int(hexData[150], 16) ^ ord('}')))

    #print(chr(0x16 ^ int(hexData[150], 16)))

    #print(hex(int(hexData[151], 16) ^ 0x16))
    #print(hex(int(hexData[152], 16) ^ 0x09))
    #print(hex(int(hexData[153], 16) ^ 0x7C))
    #print(hex(int(hexData[154], 16) ^ 0xC7))
    #print(hex(int(hexData[155], 16) ^ 0xDD))
    #print(hex(int(hexData[156], 16) ^ 0x4F))
    #print(hex(int(hexData[157], 16) ^ 0x2E))
    #print(hex(int(hexData[158], 16) ^ 0x92))
    #print(hex(int(hexData[159], 16) ^ 0xA7))
    #print(hex(int(hexData[160], 16) ^ 0xFF))
    key = [0x16, 0x09, 0x7C, 0xC7, 0xDD, 0x4F, 0x2E, 0x92, 0xA7, 0xFF]
    i = 0 
    for each in range(0, 152):
        print(chr(int(hexData[each], 16) ^ key[i]), end='')
        i = i + 1 if i != 9 else 0
```

YES, JUST CALCULATE WITH HAND IS COOOOOL!!!!
