---
title: pwnable.kr(9) - mistake
date: 2018-10-23 03:39:42
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
![](/images/pwnable-kr/mistake.png)
## Problem
Points: 1pt
```
We all make mistakes, let's move on.
(don't take this too seriously, no fancy hacking skill is required at all)

This task is based on real event
Thanks to dhmonkey

hint : operator priority

ssh mistake@pwnable.kr -p2222 (pw:guest)
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Code
```c
#include <stdio.h>
#include <fcntl.h>

#define PW_LEN 10
#define XORKEY 1

void xor(char* s, int len){
        int i;
        for(i=0; i<len; i++){
                s[i] ^= XORKEY;
        }
}

int main(int argc, char* argv[]){

        int fd;
        if(fd=open("/home/mistake/password",O_RDONLY,0400) < 0){
                printf("can't open password %d\n", fd);
                return 0;
        }

        printf("do not bruteforce...\n");
        sleep(time(0)%20);

        char pw_buf[PW_LEN+1];
        int len;
        if(!(len=read(fd,pw_buf,PW_LEN) > 0)){
                printf("read error\n");
                close(fd);
                return 0;
        }

        char pw_buf2[PW_LEN+1];
        printf("input password : ");
        scanf("%10s", pw_buf2);

        // xor your input
        xor(pw_buf2, 10);

        if(!strncmp(pw_buf, pw_buf2, PW_LEN)){
                printf("Password OK\n");
                system("/bin/cat flag\n");
        }
        else{
                printf("Wrong Password\n");
        }

        close(fd);
        return 0;
}
```

## Thinking
What the hint of `operator priority`.
It tells you every thing!

## Solution
### First
at L17, look at `fd = open(....) < 0`, will you be curious operator `=` execute first or `<`?  
The answer is `<` first, so if `open()` successfully executed, it will return `0`.
Then `fd` = `0 < 0` which is `fd = 0`.

At L27, there is a `read()` function is waiting you, when the `fd`, what does that means?
When `file descriptor` is `0`, that is `standard input`, commonly aka `Keyboard Input` lool.

### So...?
The code's error operator priority cause it ask Keyboard input twice.
At Line38 make a Exclusive-OR(XOR) at our second input, if the first input matches second input's xor result.
Then we got flag. Is that simple?

### XOR TIME!!!!!
Both first and second input takes a string with length 10.
You will not want to process any situation with ASCII is `0`, so make sure you do fill in every characters.
```c
#define PW_LEN 10
#define XORKEY 1
...
void xor(char* s, int len){
        int i;
        for(i=0; i<len; i++){
                s[i] ^= XORKEY;
        }
}
``` 
The funny thing is, `#define` doesn't tells us any type before compile.
At this case, `s[i] ^= 1`, so only last(lowest) bit will be reverse in each character.
If we input a `B(0x01000010)`, after xor, it will be `C(0x01000011)`.

Give `BBBBBBBBBB` and `CCCCCCCCCC`, hooray!

### Interesting thing.
Some how, you may encount a long delay.
I bet you did notice about `sleep(time(0)%20);`
