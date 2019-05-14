---
title: "CH5 Process Scheduling"
date: 2019-04-25 14:42:05
tags:
  - Note
  - Operating System
categories: Note
mathjax: true
---

教授真的是一種不討喜的生物。
今天上課的內容最讓人印象深刻的就是：
<!-- More --> 
用印度的種姓制度來比喻Multilevel Queue跟
伊莉看鋼鐵人好爽。

這教授完全不行啊。
結論：教授講的都是垃圾...

## Basic Concepts
- 利用Multiprogramming去儘可能的最大化CPU使用率。
- CPU-I/O Busrt Cycle
    - CPU Burst以及I/O Burst所組成。
    - CPU Burst在I/O Burst之前。

## CPU Scheduler
![](/images/OS/CPU-Cycle.jpg =600x)  
- Short-term shceduler
    - 從ready queue中選擇並分配給其中一個核心。
- CPU Scheduling會在下列四個行程狀態的變更中做出決策：
    - running到waiting(非搶佔式): I/O或event wait
    - running到ready(搶佔式): interrupt
    - waiting到ready(搶佔式): I/O或event completion
    - terminates(非搶佔式)
- Consideration of preemptive
    - 資料分享（Shared Data）
    - Kernel Mode與否
    - 關鍵的作業系統活動時是否會有中斷觸發

## Dispatcher(分配器)
- Short-term scheduler選出來的行程給予CPU控制權。
- 會調用：
    - Context switch
    - User mode切換
- Dispatch latency：從一個行程停止到啟動另外一個行程的時間差。

## Scheduling Criteria(排程準則)
- CPU utilization：讓CPU保持忙碌，愈高愈好。
- Throughput（吞吐量）：每時間單位所完成的執行量，愈高愈好。
- Turnaround time：執行特定行程所需的時間，愈低愈好。
- Waiting time：行程在Ready Queue中的等待時間，愈低愈好。
- Response time：發出請求時的第一個回應時間差，非指輸出。（Ex:網路IO）愈低愈好。

## Priority Scheduling
- 缺點： 可能會有可撥仔優先度太低，永遠等不到。
- 解決方法：Aging，放愈久，讓行程優先度愈高。

## Round Robin(RR)
- Q（time quantum）
    - 太大 -> FIFO，因為時間夠多，所以進去的一下子就被做完了。
    - 太小
        - 必須大於Context switch time.
        - 如果小於Context switch time，
          就會導致沒做到什麼，就要context switching了。

## Multilevel Queue
![](https://contribute.geeksforgeeks.org/wp-content/uploads/multilevel-queue-schedueling-1-300x217.png)
- Ready Queue內部被分做兩個Queue：
    - Foreground(前景)：互動式、RR。
    - Background(背景)：批次、FCFS。
- 必須在佇列間的調度
    - 固定優先權調度（Fixed Priority Scheduling）
        - 先處理優先度高的佇列（Ex：前景先，再背景）
        - 如果前景佇列有源源不絕的東西可以處理，非常有可能就會餓死（Starvation)。
    - 時間切片（Time Slice)
        - 每個佇列會給定特定的CPU時間來給其中的行程來處理。
- 80% 前景 RR, 20% 背景 FCFS
- [Reference](https://www.geeksforgeeks.org/operating-system-multilevel-queue-scheduling/)

## Multilevel Feedback Queue
![](https://contribute.geeksforgeeks.org/wp-content/uploads/Multilevel-Feedback-Queue-Scheduling-300x269.png)
- 行程可以被移到到各種不同的佇列中。Aging可以用這種方式來實現。
- 特點
    - 搶佔式（可以插隊）
    - 不公平
    - 不會餓死
    - 設計複雜
- 根據以下幾個參數來定義MFQ:
    - 安排的數量
    - 每一個佇列的演算法
    - 升級/降級一個行程的方法
    - 決定當一個行程需要被服務的時候該進入哪一個佇列的方法
- 有做完的就做完，沒做完的，就被移到下一級優先度的佇列，
  確保不會有一直是最高優先的被處理。
  同時，優先度較低的佇列通常會擁有比較高的Time Quantum。
- [Reference](https://www.geeksforgeeks.org/multilevel-feedback-queue-scheduling/)

## Thread Scheduling
- User thread跟Kernel thread有不同的分別。
- 如果有多個線程，則這些線程會被調度，而不是行程。
- [M2O](/2019/04/25/note/OS/ch4/#many-to-one)跟[M2M](/2019/04/25/note/OS/ch4/#many-to-many)模型下，Thread Library會去調度User-level threads在LWP(LightweightProcess)上執行。
    - 也被稱為PCS，因為競爭是在一個行程內。
    - 一般會由Programmer來透過優先度集合(Priority Set)來完成。
- PCS(Process-Contention Scope): 多個線程在同一個行程內競爭CPU時間。
- SCS(System-Contention Scope): 線程直接跟系統範圍內的其他線程競爭。
    
## Pthread Scheduling
- API可以在線程建立的時候指定PCS或者SCS

## Multiple-Processor Scheduling
- Homogeneous（同質）: CPU長一樣。
- Asymmetric（AMP, 非對稱）:
    把系統要處理的工作進行高度的切割，分配交給專門的處理器執行，
    所以就可以避免重疊的資源存取。
    需要特殊的編譯器與作業系統配合。
- Symmetric multiprocessing(SMP, 對稱)：
    使用排程的機制，平均的將工作分配給任一個空閒的處理器執行。
    目前常見。
- Processor affinity(親和性):
    每次處理器執行完行程工作之後，會殘留資料在處理器中。  
    如果下一次的排程將同樣一個行程分配到該處理器上，可以提高執行的效率（減少快取失誤的成本）  

### Load Balancing
- 在SMP之下達到高效率的前提，儘量保持所有的處理器載入。
- Load Balancing(負載平衡)：儘量保持負載均勻分佈。
- Push migration：定期檢查把過載處理器的工作推送到其他處理器。
- Pull migration：閒置的處理器會去拉其他忙碌處理器中等待執行的工作。

## Multicore Processors
- 最近把多個處理器塞到同一個物理晶片上愈來愈潮。
- 更快，更少的電力。
- 單個核心可運行的線程數量上升。
    - Memory Stall發生的時候，可以把時間拿去執行其他線程。
      真是太機智了呢！
![](/images/OS/Multithread-memory-stall.jpg)  

## Windows Scheduling
- Windows使用基於優先度的搶佔式調度
- 最高優先的線程會下一個執行
- 分配器就是調度器
- ...

## Windows Priority Classes
不知道在上什麼鬼 = =..
- Default priority is NORMAL
- Fixed priority is for REALTIME_PRIORITY_CLASS
- Quantum expired -> priority lowered, but never lower than base.
- wait occurr -> priority highered

## Algorithm Evaluation
- Deterministic modeling
    - 分析型評估
    - 針對固定的負載去比較各種演算法的表現
- Queueing model
    - 描述行程, CPU和I/O的Burst Time的機率
        - 通常式指數性，以均值來描述
        - 計算平均的吞吐量, 利用率, 等待時間等
    - 電腦系統被描述為伺服器構成的網路，每一個都有存放等待行程的佇列
        - 了解到達率和服務率
        - 計算利用率, 平均佇列長度, 平均等待時間等

## Little's Formula
$
n: 平均佇列長度\\\\
W: 平均佇列等待時間\\\\  
\lambda: 平均佇列到達率\\\\
n = \lambda \times W
$

## Reference
[[1] OS讀書會20170504](https://www.slideshare.net/JenWeiCheng/os20170504-75680132)
[[2] Operating Systems - CH5 CPU Schedling](http://yhhsutw.blogspot.com/2015/12/ch5-cpu-schedling.html)