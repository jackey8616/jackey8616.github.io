---
title: "CH6 Synchronization"
date: 2019-05-15 13:29:05
tags:
  - Note
  - Operating System
categories: Note
---

雙二一退學保衛戰。

<!-- More -->

## The Critical-Section Problem
![](https://1.bp.blogspot.com/-TGKEIgLdMS8/WZvUu88Ri_I/AAAAAAABVVg/BHAfw_SAXHEC3zfPy5DYu8KsWIBMPamKwCLcBGAs/s1600/critical-section-problem.png)  
Critical-Section:
    關鍵區段，指的是存取共用資源的片段程式碼。這些共用資源有無法同時被存取的特性。  
    Ex. Memory Access, Disk IO.

### Solution
- Mutual Exclusion(互斥):
    任一個時間點只允許一個行程進入他的Critical-Section。
- Progress:
    - 不想進入Critical-Section的行程，不可參與其他行程進入Critical-Section的決策。
    - 必須在有限時間內從想進入Critical-Section的行程中挑選一個進入。
      隱含No Deadlock。（有空位就讓`想進的人` `馬上` 進去）
- Bounded waiting:
    - 從一個行程提出進入Critical-Section到獲准進入之間的等待時間是有限的。
    - 如果有n個行程在等待，那麼每個行程最多等待n-1段時間即可進入Critical-Section。
      隱含No starvation。

## Peterson’s Solution
- 適合兩個行程。
- 假設`load`以及`store`兩個方法具有原子性，無法被中斷。
- 兩個行程共享兩個變數：
    - int turn: 決定輪到哪個行程進入Critical-Section
    - boolean flag[2]： 旗標代表行程是否準備進入Critical-Section
```cpp
do {
    flag[i] = true;
    turn = j;
    while(flag[j] && turn == j);
        critical section
    flag[i] = false;
        remainder section
} while (true);
```

## Synchronization Hardware
- 用Lock來達到保護Critical Region(關鍵區域)的目的。
- 單處理器：可以禁用中斷。
    - 當前運行的程式不會被插隊（without preemption）
    - 通常在多處理器上效率太低, 作業系統不能廣泛的擴展。
- 當代的機器多提供特殊的原子性指令，意即不會被中斷。
```cpp
do {
    acquire lock
        ciritical section
    release lock
        remainder section
} while(true);
```
### test_and_set instruction
- 兩行程執行時，在前次行程釋放鎖之前，其他行程都會在`while`前阻塞。
- Define
    ```cpp
    boolean test_and_set (boolean *target) {
        boolean rv = *target;
        *target = TRUE;
        return rv:
    }
    ```
- Usage
    - 共享`lock`變數， 初始值為`False`
      ```cpp
      do {
          while (test_and_set(&lock));
              /* do nothing */
          /* critical section */
          lock = false;
          /* remainder section */
      } while (true);
      ```

### compare_and_swap instruction
- 如果鎖的狀態跟預期的`False`，行程就可以取得當次執行Critical Section的權力，否則就會在`while`前阻塞。
- Define
    ```cpp
    int compare_and_swap(int *value, int expected, int new_value) {
        int temp = *value;
        if (*value == expected)
            *value = new_value;
        return temp;
    }
    ```
- Usage
    - 共享`lock`變數， 初始值為`False`
      ```cpp
      do {
          while (compare and swap(&lock, 0, 1) != 0);
            /* do nothing */
          /* critical section */
          lock = 0;
          /* remainder section */
      } while (true);
      ```
      
## Mutex Locks
- 前面的方法太複雜，而且通常應用程式的Programmer沒辦法存取。
- OS的設計者會提供軟體工具來解決Critical-Section Problem
- Mutex Lock就是最簡單的作法。
- `acquire`用來取得鎖, `release`用來釋放鎖。
    - 這兩個方法必須是原子性，才不會被打斷。
    - 通常會用硬體指令來實作。
- 但是這個解法必須使用`busy waiting`：拿到鎖之前，等到海枯石爛。
    - 這個鎖也被稱為`Spin Lock`

### acquire() and release()
```cpp
acquire() {
    while (!available);
        /* busy wait */
    available = false;;
}

release() {
    available = true;
}

do {
    acquire lock
    critical section
    release lock
    remainder section
} while (true);
```

## Semaphores
- 拿到鎖之前不用等到海枯石爛，但是如果沒有鎖可以拿，還是會等到海枯石爛。 
  ```cpp
  wait (S) {
    while (S <= 0);
        // busy wait
    S--;
  }

  signal (S) {
    S++;
  }
  ```

### Usage
- Counting Semaphores: 非負整數計數器。
- Binary Semaphores: 二進位計數器。
    - 類似Mutex(邏輯上)
```cpp
P1:
    S1;
    signal(synch);

P2:
    wait(synch);
    S2;
```

## Classic Problems of Synchronization