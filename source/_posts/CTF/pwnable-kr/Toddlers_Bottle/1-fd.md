---
title: pwnable.kr(1) - fd
date: 2018-05-23 17:58:39
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
![](/images/pwnable-kr/fd.png)
## Problem  
Points: 1 pt  
```
Mommy! what is a file descriptor in Linux?

* try to play the wargame your self but if you are ABSOLUTE beginner, follow this tutorial link:
https://youtu.be/971eZhMHQQw

ssh fd@pwnable.kr -p2222 (pw:guest)
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Code
```c 
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char buf[32];
int main(int argc, char* argv[], char* envp[]){
        if(argc<2){
                printf("pass argv[1] a number\n");
                return 0;
        }
        int fd = atoi( argv[1] ) - 0x1234;
        int len = 0;
        len = read(fd, buf, 32);
        if(!strcmp("LETMEWIN\n", buf)){
                printf("good job :)\n");
                system("/bin/cat flag");
                exit(0);
        }
        printf("learn about Linux file IO\n");
        return 0;

}
```
## Prepare  
### Linux fd(file descriptor)   
`fd`是一個索引值，指向Kernel為維護每一個Process所打開文件的紀錄表。  
當程式打開一個現有文件或者創建一個新文件時，Kernel會向Process回傳一個`fd`。  
通常適用於`UNIX`跟`Linux`的作業系統。  

一般UNIX的Process中應該均有3個標準的[POSIX](https://zh.wikipedia.org/wiki/POSIX) fd，對應於3個標準輸出入流。  
 
| integer | name | <unistd.h> const | <stdio.h> file stream |  
| :-----: | :-----: | :-----: | :-----: | 
| 0 | Standard input | STDIN\_FILENO | stdin |  
| 1 | Standard output | STDOUT\_FILENO | stdout |  
| 2 | Standard error | STDERR\_FILENO | strerr |  

### C read  
```c
#include <unistd.h>  
ssize\_t read(int fd, void \*buf, size\_t count);  
```

```
return length of data read in.
```

### C atoi  
```c 
#include <stdlib.h>  
int atoi(const char \*str);
```

```
if str is a string can be convert to int, return it. otherwise return 0.  
```

## Thinking  
L6 顯示輸入必須包含一個參數。  
L10 會用`atoi`方法轉成數字並且減掉0x1234(4460)。
L12 從`fd`讀取32Byte資料進入buff。

重點：如何控制讀取的資料為LETMEWIN\n即可獲得flag。

## Solution  
以本題來講，開檔是一個不需要執行的動作。  
read的function是用來從`STDIN`獲得資料的手段。  

所以我們需要讓`fd`為0來對應`STDIN_FILENO`, 因此輸入的參數必須減去0x1234剛好為0，  
即為0x1234本身。

接著進入L13手動輸入資料，為了對應密碼，輸入LETMEWIN即可。  
於是獲得flag。  

## Reference  
[File Descriptor](https://en.wikipedia.org/wiki/File_descriptor)

