---
title: pwnable.kr(10) - shellshock
date: 2018-10-23 05:57:22
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
![](/images/pwnable-kr/shellshock.png)
## Problem
Points: 1pt
```
Mommy, there was a shocking news about bash.
I bet you already know, but lets just make it sure :)


ssh shellshock@pwnable.kr -p2222 (pw:guest)
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Code
```c
#include <stdio.h>
int main(){
        setresuid(getegid(), getegid(), getegid());
        setresgid(getegid(), getegid(), getegid());
        system("/home/shellshock/bash -c 'echo shock_me'");
        return 0;
}
```

## Thinking

## Solution
