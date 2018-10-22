---
title: ARM Instruction Set Architecture Notes
date: 2018-08-02 23:40:32
tags:
  - CTF
  - Note
categories:
  - CTF
---

## Basic instructions
### (MOV) Load a immediate value into register
`#` represents a immdediate value.
Usage `MOV register, #value`  
`MOV R0, #10` means `register0 = 10`  
<!-- More -->
### (LDR) Load any data into register
Usage `LDR register, =data`
`LDR R1, =0x12345678` means `Load 0x12345678 into register1`

### (LDR) Load memory ata into register
Usage `LDR register, [address]`
```
LDR R0, =0x12345678
LDR R1, [R0]
```
Move 0x12345678 into R0.
And fetch data from memory address 0x12345678 into R1.

### (STR) Write register's value into memory
Usage `STR register, [address]`
```
MOV R0, #10
LDR R2, =0x12345678
STR R1, [R2]
```
move 10 into R0, and make R2 = 0x12345678
write R1's value into R2 address's memory.

### (ADD) add value
Usage `ADD register, register, (regiater or immediate value)`
```
Ex1:
    MOV R0, #1
    MOV R1, #2
    ADD R3, R0, R1
Ex2:
    MOV R0, #1
    ADD R1, R0, #2
```

### (SUB) sub value
Usage `SUB register, register, (register or immediate value)`
```
Ex1:
    MOV R0, #1
    MOV R1, #2
    SUB R3, R1, R0  ---> R3 = R1 - R0
Ex2:
    MOV R0, #1
    SUB R3, R0, #0  ---> R3 = R0 - 0
```

### (AND) bit and
Usage `AND register, register, (register or immediate value)`
```
Ex1:
    AND R0, R0, R1
Ex2:
    AND R0, R0, #0x23
```

### (ORR) bit or
Usage `ORR register, register, (register or immediate value)`
```
Ex1:
    ORR R0, R0, R1
Ex2:
    ORR R0, R0, #0x23
```

### (B) branch
Jump to a specific address or label.
Usage `B address`
Sometimes we can give a label.
```
    ...
    B next
next:
    ...
```

### (BL) branch and load
Before jump to address or label, copy the next instruction's address into `R14(lr)` register.
Usage same as `B` instruction.

## ARM mode vs Thumb mode
With same code
- Thumb uses memory space size about ARM's 60 - 70 %.
- Thumb's instructions is more than ARM's 30 - 40%.
- Under 32 bit, ARM is fast about 40% to Thumb, but under 16 bit, Thumb is fast 40 - 50% to ARM.
- Using Thumb code, register's power dissipation will reduce about 30%.

### Toggle b/w two mode.
#### (BX) Branch exchance or (BLX) Branch load and exchange.
BX and BLX is same as `B` and `BL`, but an additonal function which can switch working mode.
Usage: `BX Rn` and `BLX Rn`
If Rn's bit [0] is 0, then processor's mode will change(or maintain) at ARM else Thumb status.

## 3-Stage pipeline(ARM7)
### Program Counter(PC/R15)
PC is a program counter which is R15(register15),
This register is always point to the `fetched` instruction.
not `executing` one.

###  Diffence when ARM or Thumb status.
Under ARM status, PC will point to current instruction + 8.
If Thumb status, PC will point to current instruction + 4.


## Register
(SP)Stack Pointer - R13
(LR)Link Register - R14
(PC)Program Counter - R15
(CPSR) Current Program Status Register
(SPSR) Saved Program Status Register

## Reference
[ARM9](http://www.ee.ncu.edu.tw/~jfli/soc/lecture/ARM9.pdf)
