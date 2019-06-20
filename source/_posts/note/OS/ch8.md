---
title: "Ch8 Memory-Management Strategies"
date: 2019-06-19 14:53:21
tags:
  - Note
  - Operating System
categories: Note
mathjax: true
---

PPT寫的有夠爛，有夠難讀...
<!-- More -->

## Background
- 程序必須要被進主記憶體中（從硬碟中），並且放入行程中運行。
- 主記憶體以及暫存器是CPU唯二可以直接存取的儲存空間。
- 記憶體單元只能辨認位址流+讀取請求或寫入請求。
- 暫存器存取在一個CPU振盪（或更少）時間。
- 存取主記憶體可能需要很多周期，導致停頓。
- 快取被放在CPU暫存器以及主記憶體之間(L1, L2, L3 Cache)。
- 保護主記憶體以確保正確操作。

### Base and Limit Registers
- 一對基址（base）以及限制（limit）暫存器用來定義邏輯地址空間(Logical address space)
- CPU必須確認每一個來自user mode的記憶體操作，都坐落在base以及limit之間。
![](/images/OS/ch8/base-limit.jpg)

### Hardware Address Protection
![](/images/OS/ch8/user-process-check.jpg)

### Address Binding
- 程序在硬碟上需要放到主記憶體中才能夠執行，所以會有一個input queue負責處理。
- 通常都會被載入到記憶體位置0000的區塊，但實際上不一定要使用這個位址。
  Ex:
    原始程式，記憶體位址是象徵性的 -> 0000
    經過編譯，位址會被綁定到可重定向地址(relocatable address) -> ebp + 0x04
    Linker或Loader將可重定向地址綁定到絕對位址(absolute address) -> 74014
- 每一個綁定都從一個記憶體空間對應到另外一個。

### Binding of Instructions and Data to Memory
- 記憶體位址的綁定會在3個階段:
    - Compile time(編譯時間)：由編譯器決定。
        如果記憶體位址已經知道，則生成絕對位址，但是如果起始位址改變的話，則需要重新編譯。
    - Load time(載入時間)：由Linking loader或Linking editor決定。
        編譯時無法確認記憶體位址，則生成重定向地址。
    - Execution time(執行時間)：由作業系統動態決定。
        如果記憶體區段要執行時被移動，連結才會被遲緩到這個時間執行。
        （需要硬體支援，彈性高，但是執行慢效率差）

### Logical vs. Physical Address Space
- Logical address: CPU所產生的位址，又稱為Virtual address。
- Physical address: 記憶體所看到的位址，經過MMU處理過。

### Memory-Management Unit (MMU)
- 在執行階段將虛擬位址映射為實體位址的硬體裝置。
- Base register此時被稱為Relocation register。
  Intel 80x86架構上的MS-DOS使用四個relocation register。
- 使用者程序只會看到虛擬位址，不會處理到真正的硬體位址。
    - 當引用記憶體位址時，發生Execution-time binging。
    - Logical addressPhisical address綁定在一起。

### Dynamic relocation using a relocation register
- 子程式被呼叫的時候才會被載入。
- 記憶體空間利用率最佳化，沒有被使用的子程式永遠不會被載入。
- 所有的子程序以可重定向的加載格式被放置在硬碟中。
- 在大量的程式碼需要去處理不常發生的狀況時很有用。(這段原文很難理解也很難翻譯...)
  (Useful when large amounts of code are needed to handle infrequently occurring cases)
- 不需要作業系統特別的支援
    - 透過程序設計來實作
    - 作業系統可以透過提供函式庫來實作動態載入(Dynamic loading)。
![](/images/OS/ch8/MMU.jpg)

### Dynamic Linking
- Static linking(靜態連結): 系統函式庫和原始碼被Loader結合在一起成二進位程序映像(Binary Program Image)
    (Binary Program Image: compile跟linking後的結果, OS用以實際執行該程式, 因為linking後的產物，所以不同的OS，所使用的結果都不盡相同，亦不相容。)
- Dynamic linking(動態連結)： 連結會推遲到執行時間才處理。
- Stub是一小段的程式碼，用來定位適當的常駐記憶體函式庫子程式。
- 作業系統確認子程式有沒有在行程的記憶體空間內，如果沒有的話，會加進去記憶體空間中。
- 動態連結對於函式庫特別有用。
- 這個系統也被稱作為共享函式庫(Shared Libraries)。
- 考慮到修補系統函式庫(Patching system libraries)，可能需要版本控制。

## Swapping
- 程式執行中，行程有時候可能會需要離開記憶體，這個動作被稱為swapping。
- Backing storage：獨立於file system，提供memory image直接的存取。
- Roll out/Roll in：將低優先權的換出去，換一個優先權高的進記憶體。
- Swap出去的行程是否要Swap回原本的記憶體位址，取決於綁定方法：
    - 如果編譯以及連結階段已經完成綁定，則必須要swap回原本的記憶體位址。
    - 如果執行階段才完成綁定，則不需swap回原本的記憶體位址。
- 
![](/images/OS/ch8/swap-in-out.jpg)

### Context Switch Time including Swapping
- 如果下一個要被載入CPU的行程目前沒有存在主記憶體中，則系統需要將一個行程swap out，再將目標行程swap in進入記憶體，接著執行context switch。
  如此一來, context switch的時間會被大幅度的拉長。
- 可以運用system call的方法來檢查當前記憶體空間的剩餘，來決定需不需要swap out。
- swapping還會有行程正在執行I/O時移出的問題：
    - 不執行swap out，繼續執行。
    - 直接swap out，放棄I/O。
    - I/O交給Kernel再丟給I/O裝置。但是會有Double buffering的問題，增加了負擔。
- 通常swap的機制只有在實體記憶體的存量極低的時候才會觸發。

### Swapping on Mobile Systems
- 一般來說不支援快閃記憶體
    - 空間太小。
    - 有限的寫入周期。
    - 快閃記憶體以及主記憶體之間吞吐量過低。
- 替代方案
    - iOS：詢問App主動放棄分配到的記憶體
        - 唯讀資料在需要的時候會拋出，然後從快閃記憶體中重新讀取。
        - 釋放失敗的話可能會導致終止。
    - Android：記憶體不足的話會直接終止App，但是會將App狀態寫入快閃記憶體以便下次快速重啟。
    - 這兩個系統都支援記憶體分頁(paging)。

## Contiguous Memory Allocation
- 主記憶體通常會有兩個分區
    - 常駐作業系統，通常會放在較低位址的記憶體區塊，帶有中斷向量。
    - 使用者行程，通常會放在比較高位址的記憶體區塊。

### Multiple-partition allocation
- Fixed-partition: 固定分區大小，除非Process需求的大小剛好等於每分區大小的倍數，不然通常都會多給。
- Variable-partition: 滿足Process的需求，要多少給多少。
- Hole: 一塊連續記憶體。
- 多個大小不同的Hole，分散在記憶體之中。
- Process要放入記憶體中時，會被分配在大小足夠容納的Hole中。
- 作業系統維護已分配的區域，還有尚未被分配的區域（Hole）。
![](/images/OS/ch8/multiple-partition-allocation.jpg)

### Dynamic Storage-Allocation Problem
如何滿足大小為n的資料進入記憶體？
- First-fit：分配第一個大小滿足的Hole。
- Best-fit：
    分配第一個最小剛好滿足的Hole。
    必須搜尋整個Hole的列表，除非列表已經依照大小排列。
- Wrost-fit：
    分配最大的Hole。
    也必須搜尋整個Hole的列表。
- 在速度以及空間利用率方面，first-fit跟best-fit好過於wrost-fit。

### Fragmentation
- External Fragmentation（外碎）：
    剩餘的記憶體空間能夠滿足需求，但是不連續，仍舊無法使用。
    - 解決方法：Compaction（聚集）
        - 將空閒的Hole聚集在一起，合併成一塊大的。
        - 只有在Relocation是動態的時候，可以在執行時間合併。
        - 
- Internal Fragmentation（內碎）：
    分配到的記憶體，稍微大於需求記憶體，多餘的部份並沒有被使用。
    Ex: 我給你4KB, 你只用3KB。

## Segmentation
- 可以被使用者查看的記憶體管理方案。
- 一個程序是由多個Segements所組成;
  Segement是一個邏輯單元如：
    - main program
    - procedure
    - function
    - method
    - object
    - local variables, global variables
    - common block
    - stack
    - symbol table
    - arrays

### User’s View of a Program
其實我不知道這怎麼解釋，
大概應該是使用者觀點來看一支程序的話，大概長這樣子...
![](/images/OS/ch8/user-view-program.jpg)

### Logical View of Segmentation
然後這是實際上在記憶體空間中的分佈，
所以可能看起來像連續，其實位址是不連續的。
![](/images/OS/ch8/logical-view-segment.jpg)

### Segmentation Architecture
- Logical address:
    有兩個部份，segment-number跟offset：<segment-number, offset>
- Segment table(ST):
    映射到二維的實體位址，每一條紀錄都有：
    - Base: segment的起始實體位址。
    - Limit: segment的長度。
- Segment-table base register (STBR): 指向ST的起始實體位址。
- Segment-table length register (STLR):Segment的數量。
    - 如果Segment的數量小於STLR，是合法的。
- 保護機制
    - 1

### Segmentation Hardware
![](/images/OS/ch8/segment-arch.jpg)

## Paging

## Structure of the Page Table
