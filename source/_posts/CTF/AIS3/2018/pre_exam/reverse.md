---
title: reverse
date: 2018-08-01 21:10:43
tags:
  - CTF
  - AIS3
  - pre exam
categories:
  - CTF
  - AIS3
  - 2018
---

This is 2018 AIS3 prexam reverse writeups.
<!-- More -->

## find

`cat find` gets a ELF and dummy data merged together.
`strings find >>  [file name]`
Wrote a simpy filter to filte `AIS3{`

```python=
string = []

with open('find.strings', 'r') as f:
    line = f.readline()
    while(line != ''):
        if line.startswith('AIS3{'):
            string.append(line)
        line = f.readline()

print(string)
```

---

## secret
Use `IDA-Pro` to crack program and export to `c pseudo code`.
```c=
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int result; // eax@10
  __int64 v4; // rsi@10
  int v5; // [sp+4h] [bp-1Ch]@7
  int i; // [sp+8h] [bp-18h]@3
  int v7; // [sp+Ch] [bp-14h]@7
  FILE *stream; // [sp+10h] [bp-10h]@1
  __int64 v9; // [sp+18h] [bp-8h]@1

  v9 = *MK_FP(__FS__, 40LL);
  stream = fopen("/tmp/secret", "w");
  init();
  puts("========== WELCOME TO MY MIND ==========");
  puts("Try to find out secret in my mind!!!");
  while ( cnt != 85 )
  {
    __isoc99_scanf("%d", &v5);
    v7 = rand() % 2018;
    if ( v7 != v5 )
    {
      puts("Get out!!! You don't know me.");
      goto LABEL_10;
    }
    secret[cnt] ^= v5;
    puts("Nice try! Next one.");
    ++cnt;
  }
  for ( i = 0; i <= 84; ++i )
    fputc((unsigned __int8)secret[i], stream);
  puts("You know the flag~~~");
LABEL_10:
  result = 0;
  v4 = *MK_FP(__FS__, 40LL) ^ v9;
  return result;
}
```

There is a `rand()` without `srand()`, so...
Just rand many times and record it, and `mod(%)` with `2018`.

```python=
from pwn import *
rands = [
1804289383,846930886,1681692777,1714636915,1957747793,
424238335,719885386,1649760492,596516649,1189641421,
1025202362,1350490027,783368690,1102520059,2044897763,
1967513926,1365180540,1540383426,304089172,1303455736,
35005211,521595368,294702567,1726956429,336465782,
861021530,278722862,233665123,2145174067,468703135,
1101513929,1801979802,1315634022,635723058,1369133069,
1125898167,1059961393,2089018456,628175011,1656478042,
1131176229,1653377373,859484421,1914544919,608413784,
756898537,1734575198,1973594324,149798315,2038664370,
1129566413,184803526,412776091,1424268980,1911759956,
749241873,137806862,42999170,982906996,135497281,
511702305,2084420925,1937477084,1827336327,572660336,
1159126505,805750846,1632621729,1100661313,1433925857,
1141616124,84353895,939819582,2001100545,1998898814,
1548233367,610515434,1585990364,1374344043,760313750,
1477171087,356426808,945117276,1889947178,1780695788
]

p = process('./secret')
for each in rands:
    #if each == 0x6b7b4567:
    p.sendline(str(each % 2018))
p.interactive()
```

Last thing is, go to `/tmp/secret` find my flag, just like `L12` and `L30` told me.

---

## crackme
`exe` filename extension, reverse with `OllyDbg` is so ugly.
googled a writeup [](https://www.duckll.tw/2017/12/106.html)

```sh
> file ais3.exe
> ais3.exe: PE32 executable (GUI) ..Too long, PDF would cut out..
     ... Intel 80386 Mono/.Net assembly, for MS Windows
```
Change to use `dnSpy` to crack it.

```csharp=22 MainWindow
this.secret = new int {
234,226,248,152,208,154,223,244,226,158,
244,238,234,216,210,244,223,228,244,232,
249,159,200,192,244,230,206,138,214
};
```
```csharp=104
for (int j = 0; j <= num4; j++)
{
    if(
        Operators.ConditionalCompareObjectNotEqual(
            NewLateBinding.LateIndexGet(
                this.secret,
                new object[] { j },
                null
            ),
            Convert.ToInt32(text[j]) ^ 171,
            false
        )
    ) {
        flag = false;
    }
}
if (
    Conversions.ToBoolean(
        Operators.AndObject(
            flag,
            Operators.CompareObjectEqual(
                text.Length,
                NewLateBinding.LateGet(
                    this.secret,
                    null,
                    "Length",
                    new object[0],
                    null,
                    null,
                    null),
                false
            )
        )
    )
){
    Interaction.MsgBox("Good job!!!", MsgBoxStyle.OkOnly, null);
    return;
}
Interaction.MsgBox("Try hard!!!", MsgBoxStyle.OkOnly, null);
```

Just crack with xor 171.
```python=
secret = [
234,226,248,152,208,154,223,244,226,158,
244,238,234,216,210,244,223,228,244,232,
249,159,200,192,244,230,206,138,214
]

for each in secret:
    print(chr(each ^ 171), end='')
```
