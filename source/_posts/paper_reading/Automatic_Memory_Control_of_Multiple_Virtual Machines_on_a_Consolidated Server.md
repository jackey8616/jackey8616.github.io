---
title: "慘讀: Automatic Memory Control of Multiple Virtual Machines on a Consolidated Server"
date: 2019-04-19 00:17:05
tags:
  - Paper Reading
  - Virtualization
  - Operating System
categories: PaperReading
mathjax: true
---
不得不吐嘈對於讀論文當作作業這件事情非常的奇妙。
其實有點陰謀論覺得是助教不想看，所以丟給我們當翻譯蒟蒻....
<!-- More -->
就結果而言，真的是太慘了，
這篇IEEE的論文有一種滿滿的水量感XD...
最後是沒有看完，實在是沒有辦法在不太了解演算法的狀況之下去讀他的Evaluation.

不過這也讓我有個啟發可以把讀過的論文大綱放上來，
留（水）個文字紀錄？...

這篇在ieeexplore上面可以直接看，歡迎自行[開門](https://ieeexplore.ieee.org/document/7012089)..
如果有什麼覺得我譯的怪怪的，或者是你看出什麼端倪了，
拜託告訴我... XD

# Information
  - Authors:
    - Wei-Zhe Zhang
    - Hu-Cheng Xie
    - Ching-Hsien Hsu
  - Electronic ISSN: 2168-7161
  - DOI: 10.1109/TCC.2014.2378794

# Introduction

  虛擬化技術因為雲端運算的需求而開始出現，愈來愈多的應用程式被佈署在虛擬機器中以複用實體機。雖然這些虛擬機的資源被虛擬機監控軟體（VMM）所隔離，但是自動化控制系統能夠重新分配給整合性伺服器受到限制的資源，而這有助於減少程序運行的時間以及最大化使用資源。

  CPU自動化控制系統已被廣泛的研究，但是記憶體的分時卻仍然是一個很大的課題。正常來說，記憶體在一個虛擬機被啟動時，就已經被靜態的賦予，而記憶體的大小在整個虛擬機的生命周期中並不會變化。當要求的記憶體大小達到了總實體記憶體的上限，記憶體的競爭會呈指數上升，進而造成應用程式的效能下降。虛擬化平台中的實體記憶體自動控制是一個瓶頸，限制了整個系統的效率。

  而本論文在伺服器整合部份針對記憶體控制面對了三個新的挑戰：
  -  記憶體控制的工具需要更進一步的研究。為了啟動底層機制以及產生介面, Xen, VMware和KVM實作了page sharing, virtual hotplugs和balloon driver。然而，這些機制以及介面只專注個體虛擬機中核心模式（Kernel mode）重新調整記憶體的底層方法。它們不能全視野的指定特定虛擬機需要重新分配記憶體或是應該獲得多少分頁（Pages）。因此，使用者模式（User mode）下，高層（High-Level）記憶體資訊蒐集，且全視野調節虛擬機的記憶體使用量工具是必須的。
  -  無論記憶體狀態足夠與否，記憶體調度演算法必須要能夠自適應所有的使用場景。每一個虛擬機都能夠提交他們所需的記憶體（Commited Memory）在未來使用。如果所有虛擬機的commited memory小於實體機的可用記憶體，該記憶體狀態即為足夠（Sufficient）否則為不足（Insufficient）。而我們的論文會著重在記憶體足夠的狀況。
  -  前面所提到的評估與大型供應商的虛擬機整合率並不一致。雖然一些雲端計算供應商（Amazon EC2等）樂於透露單一實體機上所能佈署的虛擬機數量，我們保守估計一台伺服器包含10或12台虛擬機（注：不並沒有明確指出怎麼算出10到12台的數據，這邊的引用的兩個連結第一個是Amazon的Data Center的Size，第二個連結已經失效。第一個該論文的疑慮點。），然而，先前的實驗被限制在最多二或四台虛擬機。這些實驗採用合成且trace-driven（這是什麼，也沒有明確指出，疑慮點二。）的工作負載。因此更多的測試以及實際的基準應該在額外的虛擬機上運行。

  在這個研究中，基於Xen balloon driver設計了一個輕量的框架來控制多個虛擬機整合之下的記憶體。我們的系統實作在使用者空間（User space，不知道是什麼意思？推測是指虛擬機內部。疑慮點三。）下，不需與VMM對接。對於這個框架，論文建議一個運行在Domain0的（完全沒有解釋Domain0是什麼，推測是指虛擬機個體。疑慮點四。）全域調度（Global Scheduling）演算法。這個演算法解決一個線性方程式來獲得全域的解，且使用動態底線（Dynamic Baseline）來獲得記憶體狀態足夠或不足。實驗中採用實際基準作為工作負載，並且使用十個虛擬機。

# Proposed

- 演算法output
每個os的空閒記憶體(Idle memory)，可以讓Hypervisor有效率的分配給其他相對有需要的OS使用，減少SWAP的次數。至於如何決定哪個OS是可以被分配者跟接收者透過讓每個VM都有一個稅率(tax)，這個價值會決定每一個OS的Memory要被調用都有一個成本價。最終達到每個成本價都是一樣的這樣Hypervisor就完成了最終任務不需要再調動。
Ex：VM1的committed memory有3G，閒置記憶體有1G；VM2的committed memory有30G，閒置記憶體比較有10G，雖然兩個的使用率都是2/3，但是VM1剩下可以被調用的記憶體比較少，因此調用VM1的tax會比較高(風險比較高)，因此Hypervisor會優先把VM2的shares(Resource)調動給VM1使用。
- Pseudo
```
Global-Scheduling Algorithm
Input: N, n, N_i, A_i
Output: Nt_i
 1. While true do
 2. A <- Null
 3. for 1 <= i <= n do
 4.   N_i <- xs_read(/local/domain/VM_i/mem/total);
 5.   F_i <- xs_read(/local/domain/VM_i/mem/free);
 6.   A_i = N_i - F_i
 7.   AppendTo(A, A_i);
 8. end
 9. \tau <- calculating_idle_memory_tax(A, f);
10. for 1 <= i <= n do
11.   Nt_i <= solve_linear_equation(N_i, A_i, \tau);
12.   xs_write(Nt_i, /local/domain/VM_i/mem/target);
13.   xc_domain_set_pod_target(VM_i, Nt_i);
14. end
15. sleep(interval);
16. end
``` 

- step1
    - 找到目前VMs的committed Memory，簡稱 $N_i$
    - total committed Memory簡稱 N
    - 所有VMs的數量 簡稱 n
    - 每個VM的free(Idle) Memory簡稱 $F_i$
    - 每個VM的Used Memory簡稱 $A_i$
    - 計算整體會調用SWAP的臨界閥值 簡稱 $\xi_0$
- step2
    - 計算當前總體的稅率($\tau$)：
      $\dfrac{\xi_0 + max(A) - \dfrac{1}{n}}{max(A_i) - avg(A_i)}$
    - 轉換稅率到每個VM成本價P 
      $P_i = \dfrac{1 - \tau}{N_i - \tau * A_1}$
    - 計算調動優先權
        $Ni = linear\\_equation(N_i , A_i , tax)$
      
- step3
    - 寫入到Hypervisor裡面 
        $xs\\_write()$
    - 把分配到的新記憶體設定給每一個VM
        $xc\\_domain\\_set\\_pod\\_target(VMs , N_i)$

# Experiment

 證實透過Automatic Memory Control，讓Hypervisor自行調整每個VM的free memory(pages)藉由計算每個idle memory per VM的價值可以決定出先把哪個VM的資源用balloon佔住給其他VM使用，達到減少Guests OS呼叫Swap的次數，達到更快的境界。 
 本篇論文在最後的測試階段使用了不同的測試框架諸如Mono、DaCapo、Phoronix Test Suite等，並且於不同VM數量下做測試。
 - Mono框架下，用了兩個VM(VM1、VM2)，測試已證實可以互相調整Memory的使用權，當VM1達到committed memory上限時，記憶體控制系統會自動調配VM2的閒置記憶體供VM1使用。
 
# Impression

  從論文的架構來看，只能說是分崩離析。
  Intro的部分可以很明顯看出有一小部分的引用數據是不透明的，也無從得知其引用的用意在什麼地方
  實作中演算法的描述完全就是慘不忍睹，關鍵的$\tau$參數完全沒有詳細解釋其計算公式，連其最基本的單位都沒有，讀者只能靠後面的虛擬碼以及線性方程來猜這個$\tau$參數其所代表的意義。除此之外，$\xi_0$參數也讓人覺得不明所以，該參數其中計算的公式為$\xi_0 = \dfrac{f}{N}$，而f的解釋在該文中為 *Reversed free memory of VMs* ，其意義究竟是所有VM的空閒記憶體總和的倒數還是有什麼其他意涵，我想只有原作者群才有辦法理解了。
  整體來看，該論文對於讀者極度的不友善、定義不嚴謹、操作步驟不清晰，其所提供的GitHub專案連結也無明顯的維護，不知道是因為該Reporitory為Prototype的原因，或者是有其他什麼原因，作為實作參考價值來講，不甚健壯。
   