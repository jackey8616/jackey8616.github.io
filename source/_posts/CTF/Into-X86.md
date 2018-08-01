---
title: Into-X86
date: 2018-06-01 20:20:38
tags:
categories:
---

```c
int main() {
    int a = 1;
    return 0;
}
```

{% codeblock main lang:x86asm %}
   0x00000000004004d6 <+0>:     push   rbp
   0x00000000004004d7 <+1>:     mov    rbp,rsp
   0x00000000004004da <+4>:     mov    DWORD PTR [rbp-0x4],0x1
   0x00000000004004e1 <+11>:    mov    eax,0x0
   0x00000000004004e6 <+16>:    pop    rbp
   0x00000000004004e7 <+17>:    ret    
{% endcodeblock %}
