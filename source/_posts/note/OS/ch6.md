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
          while (compare_and_swap(&lock, 0, 1) != 0);
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
- Counting Semaphores: 整數計數器
    - 
- Binary Semaphores: 二進位計數器
    - 類似Mutex(邏輯上)
```cpp
P1:
    S1;
    signal(synch);

P2:
    wait(synch);
    S2;
```

### Semaphore Implementation
- 沒人懂這在講什麼鬼...
- 必須保證同一個信號內的`signal`跟`wait`不會同時在兩個不同的行程中呼叫
- 當`signal`跟`wait`被放在Critical Section中的時候，會變成Critical Section Problem
- 現在多使用`busy waiting`來實作
    - 程式碼少
    - 但是效率低
    - 應用程式可能花很多時間在waiting，所以不是很好的方法。

### Semaphore Implementation with no Busy waiting
- 每一個`semaphore`都有一個關聯的等待佇列（waiting queue）
- 佇列中的每一項都包含有兩個資料元素
    - 數值（integer)
    - 下一項的指標
- 兩種操作
    - block: 把行程放在適當的等待佇列中
    - wakeup: 把行程從等待佇列放到就緒佇列（ready queue）中
```cpp
typedef struct {
    int value;
    struct process *list;
} semaphore;

wait(semaphore *S) {
    S->value--;
    if (S->value < 0) {
        // add this process to S->list;
        block();
    }
}

signal(semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        // remove a process P from S->list;
        wakeup(P);
    }
}
```

### Deadlock and Starvation
- Deadlock
    兩個或更多的行程在互相等待各自的資源釋放。
    A等B放開鎖， B也在等A放開鎖。
    等到海枯石爛。
- Starvation: 阻塞到死。
    行程沒有從等待佇列被放到就緒佇列。
- Priority Inversion:
    - 高優先權行程的資源被低優先權行程占住了。
      必須要等待低優先行程釋放才能繼續。
    - 透過priority-inheritance protocol解決

## Classic Problems of Synchronization
### Bounded-Buffer Problem
- Variable
    - n個Buffer, 每個可以放一個元素
    - Semaphore mutex, 初始值為`1`: 控制生產者跟消費者存取Buffer
    - Semaphore full, 初始值為`0`
        - 表示目前Buffer有多少空間被使用
        - 0表示Buffer是空的，消費者要等待
    - Semaphore empty, 初始值為`n`
        - 表示目前Buffer還有多少空間
        - <=0表示Buffer是滿的, 生產者要等待
- 生產者（Producer）行程
    ```cpp
    do {
        ...
        /* produce an item in next_produced */
        ...
        wait(empty);
        wait(mutex);
        ...
        /* add next produced to the buffer */
        ...
        signal(mutex);
        signal(full);
    } while (true);
    ```
- 消費者（Consumer）行程
    ```cpp
    do {
        wait(full);
        wait(mutex);
        ...
        /* remove an item from buffer to next_consumed */
        ...
        signal(mutex);
        signal(empty);
        ...
        /* consume the item in next consumed */
        ...
    } while (true);
    ```

### Readers-Writers Problem
- 數個同時執行的行程，共享資料集合
    - Readers: 只讀取資料, 不會對資料做任何更動。
    - Writers: 同時可以讀寫。
- 問題：允許數個Reader同時讀取資料。
    只有單一個Writer可以讀寫資料。
- Reader跟Writer的數種變化取決於優先權(Priority)
- 共享資料
    - 資料集合
    - Semaphore rw_mutex, 初始值為`1`
        - 控制Reader/Writer進入文件的信號
        - 0代表有人正在存取文件， 需要等待
    - Semaphore mutex, 初始值為`1`
        - 控制reader_count增減的信號
        - 0代表reader_count正在變動，需要等待
    - 整數reader_count, 初始值為`0`：用來計算現在有幾個Reader
- Writer行程
    ```cpp
    do {
        wait(rw_mutex);
        ...
        /* writing is performed */
        ...
        signal(rw_mutex);
    } while (true);
    ```
- Reader行程
    ```cpp
    do {
        wait(mutex);
        read_count++;
        if (read_count == 1)
            wait(rw_mutex);
        signal(mutex);
        ...
        /* reading is performed */
        ...
        wait(mutex);
        read_count--;
        if (read_count == 0)
            signal(rw_mutex);
        signal(mutex);
    } while (true);
    ```
#### Readers-Writers Problem Variations
- Variation 1
    如果有無限個Reader在讀取，Writer會餓死(Starvation)。 
- Variation 2
    Writer準備好之後就馬上開始讀寫，Reader會餓死
- 某些系統為了解決這些問題， 會由Kernel提供讀寫鎖(Reader-Writer Lock)

### Dining-Philosophers Problem
![](/images/OS/dining-philosopher.png)  
- 哲學家只能思考（Wait）或吃飯（Do），他們之間不能交流，
  每次吃飯都需要同時拿左邊跟右邊的筷子，吃完就會把筷子放回去。
- 問題：
    - 哲學家想吃飯的時候，但是左邊或右邊的任一支筷子被拿走了，需要等待。
    - 共享資料：
        - 飯（資料集合）
        - Semaphores 筷子[5], 初始值是`1`： 0代表有人在用
- 行程
    ```cpp
    do {
        wait ( chopstick[i] );
        wait ( chopStick[ (i + 1) % 5] );
        // eat
        signal ( chopstick[i] );
        signal (chopstick[ (i + 1) % 5] );
        // think
    } while (TRUE);
    ```

#### Problem of this algorithm
- 會產生死鎖（Deadlock）:要等其他人放下筷子， 才能拿筷子。
    - 大家都先拿右邊的筷子， 全部的人都在等左邊的筷子，
      可是左邊筷子已經被左邊的人先拿走了。
    - 如果哲學家1, 3一直拿著筷子， 哲學家2就會等到死。
- 解法
    - 最多限制(n - 1)個吃，可以解決死鎖，但是會有人餓死。
    - 除非可以拿到左右筷子，不然就不准吃。
      可以打破Hold-and-Wait（死鎖），但是也是會有人餓死。
    - 奇數者先拿左邊再拿右邊，偶數者則相反，
      可以打破Circular Waiting（環狀等待）, 還是會有人餓死。
    - Chandy/Misra Solution：
        先把筷子湊成對， 要吃的領筷子券, 吃完再釋放
        搶奪筷子券，沒有錯，還是會有人餓死。
- 所以你們就餓死吧...

### Problems with Semaphores
- Semaphore的不正確操作
    - signal() 再 wait()
        先加信號再等待信號？？？... 怪怪的
    - wait() 又 wait()
        等一個信號 然後又等一個信號？？？ ... 等一個人咖啡館？？？
    - 省略了signal或wait或兩個都省略了
        不等了， 或者不把信號還回去， 直接出車禍.
- 死鎖(Deadlock)跟餓死(Starvation)

## Reference
- [[1]OS讀書會20170518 ](https://www.slideshare.net/JenWeiCheng/os20170518)
