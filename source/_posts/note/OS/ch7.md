---
title: "CH7 Deadlocks"
date: 2019-06-15 14:15:21
tags:
  - Note
  - Operating System
categories: Note
mathjax: true
---

濟世第七章

<!-- More -->

## Deadlock Characterization
如果滿足以下四個條件，就有可能出現死鎖：
- Mutual exclusion(互斥)：同時只有一個行程可以使用資源。
- Hold and wait:持有一個資源的行程在等待另外一個行程所擁有的資源。
- No preemption(非搶佔式、不能插隊):持有資源的行程只能自願釋放所持有的資源。
- Circular wait(循環等待): $P_0 -> P_1 -> P_2 -> P_0$

### Resource-Allocation Graph
|Process|  Resource | Request resources | Holding resources |
|:-----:|:---------:|:-----------------:|:-----------------:|
|![](/images/OS/ch7/process.jpg)|![](/images/OS/ch7/resource.jpg)|![](/images/OS/ch7/request.jpg)|![](/images/OS/ch7/hold.jpg)|

### Example without Deadlock
$P_3$釋放$R_3$資源之後$P_2$就可以獲得資源接續處理，  
接著$P_2$釋放$R_1$資源之後，$P_1$也能夠繼續處理，  
所以不會有死鎖的狀況。  
![](/images/OS/ch7/example-without-deadlock.jpg)  

### Circle without Deadlock
$P_1$擁有$R_2$資源並且等待$R_1$資源、$P_3$擁有$R_1$資源等待$R_2$資源，兩者相互等待，構成環狀。  
但是$R_1$跟$R_2$資源都有兩個實體可以使用，並且分別被$P_2$跟$P_4$持有，
$P_2$跟$P_4$本身也沒有其他等待資源，所以等到$P_2$跟$P_4$釋放資源之後，
$P_1$跟$P_2$就可以繼續運作，所以不構成死鎖。
![](/images/OS/ch7/circle-without-deadlock.jpg)

### Circle with Deadlock
恩對，死鎖，3個行程相互等待對方釋放資源。  
![](/images/OS/ch7/circle-deadlock.jpg)

### Basic Facts
- 如果沒有環狀 -> 沒死鎖。 
- 如果有環狀  
    -> 每個資源都只有一個實體，死鎖鎖好鎖滿  
    -> 資源有多個實體，可能死鎖，要稍微推一下。  

## Methods for Handling Deadlocks
- 確保系統永遠不會進入死鎖（廢話？）
- 允許系統進入死鎖，然後恢復。
- 無視死鎖，假裝沒發生過。（鴕鳥？）
    - 最常被使用，Unix Windows blah blah blah。

## Deadlock Prevention
- Mutual exclusion
    共享資料沒這個問題，非共享資料就沒救了，一定會互斥。
- Hold and Wait
    必須保證行程要求資源時，本身沒有持有任何資源。  
    - 要求行程在執行前去請求並分配所有資源，或者是當行程沒有持有資源的時候允許存取。
    - 資源利用率低的話，有可能會發生飢餓。
- No Preemption
    - 如果一個當前持有資源的行程要求另一個資源無法立刻被分配，該行程當前持有的資源會被釋放。
    - 搶佔的資源將添加到正在等待中的行程的資源列表中。
    - 只有當行程可以獲得舊資淵還有要求的資源的時候，才會重新啟動行程。
- Circular Wait
    針對要求資源的行程給予一個順序。

## Deadlock Avoidance
要求系統提供一些額外的先驗資訊
- 最簡單而且有用的模型是要求每一個行程宣告他可能需要的每種資源最大數值。
- 死鎖迴避演算法可以動態的測試資源分配狀態來避免Circular Wait。
- 資源分配狀態由可用資源、已分配資源的數量和行程的最大需求量所定義。

### Safe state
（這邊我完全不知道課本在供三小）
- 當行程請求可用資源時，系統必須確認立刻分配是否使系統處於安全狀態
- 當行程要求一個資源，且存在一個行程序列；
  每個行程依照其順序取得資源，就能確保每個行程都擁有資源，不會發生死鎖的狀況，則說系統在安全狀態中。
- 如果$P_i$需要的資源沒辦法立刻被滿足（因為$P_j$持有），那$P_i$會等到$P_j$結束，
  然後$P_i$拿到需要的資源，執行，然後釋放資源，  
  其他的$P_i+1$就可以拿到需要的資源，執行，並且釋放，持續下去到$n$

### Basic Facts
- 如果系統在安全狀態 -> 沒有死鎖（廢話）
- 如果系統在不安全狀態 -> 可能有死鎖
- 避免方法: 保持系統永遠不會進入不安全狀態（太棒了又是廢話）

### Avoidance algorithms
- 單實體資源：用resource-allocation graph
- 多實體資源：用banker’s algorithm

#### Resource-Allocation Graph Scheme
- Claim edge：當$P_i$向$R_j$請求資源時，在圖案上我們以虛線表示關係。
- 當行程要求資源的時候，Claim edge會轉變為Request edge。
- 當資源被分配給行程的時候，Request edge會轉變為Assignment edge。
- 當資源被行程釋放的時候，Assignment edge又變回Claim edge。
- 必須在系統中事先聲明資源。

##### Resource-Allocation Graph Algorithm
- 假設行程$P_i$要求資源$R_j$
- 只有在Request edge轉換為Assignment edge不會造成環狀時，才准許轉換。

#### Banker’s Algorithm
- 多實體資源
- 每一個行程必須先聲明最大使用量(max)
- 行程請求資源的時候，可能會進入等待。
- 當行程獲得所有需要的資源時，必須在有限時間內釋放這些資源。

##### Data Structures
$n = 行程數量, m = 資源型態數量$
- Available: 長度為m的Vector，如果available[i] = j，則型態i的資源有j個可以分配。
- Max: $n \times m$矩陣，如果max[i, j] = k，則$P_i$可能會要求最多k個$R_j$資源。
- Allocation: $n \times m$矩陣，如果allication[i, j] = k，則目前$P_i$持有k個$R_j$資源。
- Need: $n \times m$矩陣，如果need[i, j] = k, 則目前$P_i$還需要k個$R_J$以完成工作。
- $Need[i, j] = Max[i, j] - Allocation[i, j]$

##### Safety Algorithm
- Step 1: 令Work和Finish長度為m和n。
    - Work = Available
    - Finish[i] = False For i = 0, 1, ... (n - 1)
- Step 2: 迭代陣列並尋找符合下列條件
    - Finish[i] = False
    - $Need_i$ <= Work
    - 如果沒有任何一次迭代符合條件，則進入Step 4。
- Step 3: 
    - Work += $Allocation_i$
    - Finish[i] = True
    - 返回Step 2。
- Step 4:
    - 如果Finish陣列中值皆為True，則系統處於Safe state。

#### Resource-Request Algorithm for Process $P_i$
- Request = $P_i$所要求的資源向量。
  如果$Request_i[j]$ = k，則$P_i$希望存取k個資源$R_j$
- Step 1: 如果$Request_i <= Need_i$，繼續Step 2，否則跳出行程達到請求資源上限的例外。
  （明明只需要5個，卻要求6個）
- Step 2: 如果$Request_i <= Available$，繼續Step 3，否則$P_i$必須等到資源可供使用。
- Step 3: 
  $
    Available = Available - Request_i \\\\
    Allocation_i = Allocation_i + Request_i \\\\
    Need_i = Need_i - Request_i \\\\
  $
  如果是Safe State => 分配資源給$P_i$。
  否則，$P_i$必須等待，並且恢復Step 3所執行的動作。

## Deadlock Detection
- 允許系統進入死鎖
- 

## Recovery from Deadlock
