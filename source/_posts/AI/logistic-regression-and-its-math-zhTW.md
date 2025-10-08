---
title: Logistic Regression & its mathematic(zhTW)
date: 2025-10-07 15:32:20
categories: AI
hidden: false
tags:
  - AI
  - Machine Learning
  - Regression Analysis
  - Logistic Regression
mathjax: true
---

換講邏輯回歸..  
需要一點自然對數的概念。  
<!-- More -->

## Logistic Regression(邏輯回歸)
TL;DR: 基於線性回歸的資料分類。

> 舉例: 一千筆郵件的資料，分類出是垃圾郵件以及一般信件。

邏輯回歸本質上也是一種使用線性組合的模型。  
與線性回歸是找出一個方程式來描述輸入特徵（x）與目標數值（y）之間的關係不同，  
邏輯回歸則是針對分類問題，找出一條可以「劃分」資料點類別的決策邊界。  

## 數學假設
相較於線性回歸的假設
$$
\hat{y} = wx + b
$$
這邊的 $\hat{y}$ 以及 $x$ 都是實際坐落在二維坐標系中的坐標。  
邏輯回歸則可以選擇要作為特徵的參數，同樣已二維坐標系為例：
$$
z = w_1x_1 + w_2x_2 + b
$$
這邊的$x_1$以及$x_2$是對應二維的坐標軸，以下我們會依照這個假設來進行推導。

### 線性代數定義
$$
z = w_1x_1 + w_2x_2 + b
$$
實際上是一個線性代數，它的意義是綜合了各種變數($x_1, x_2$)與參數($w_1, w_2$)以及偏差項$b$的計算，可以獲得一個分數。  
這個分數決定了 $x_1, x_2$ 是某一個分類(因為是二元分類)。  
而這個方程式中無論是 $w, x ,b$ 任一個數都是實數，所以計算出來的 $z$ 會落在 $(-\infty, \infty)$ 之間。  

> 又可以表達做 $z \in (-\infty, \infty)$  

### 機率
我們先撇開上面的線性代數定義，回歸到二元分類的本質，我們的目標，其實歸根結底是希望計算出是否為某類的機率($P$)。  
而說到機率，大家最直觀的認識應該是機率的範圍。$P \in [0, 1]$  

我們如果想要把機率，跟線性代數的方程式有應對關係的話，從數學範圍中，是無法映射的。  

#### 勝算(Odds)
這邊引入了勝算這個概念，勝算的定義有別於機率：事件發生的機率與事件不發生的機率兩者的比率。
假設事件發生的機率是$P$:
$$
Odds = \frac{P}{1-P}
$$

舉例來講：從機率到勝算
如果考試通過的機率 $P = 0.9  (90\%)$

- 發生的機率是 $0.9$
- 不發生的機率是 $1 - 0.9 = 0.1$
- 勝算為 $\frac{0.9}{0.1} = 9$

9的意思是，學生通過的可能性是不通過的可能性的九倍，通常寫作 $9:1$

勝算(Odds)根據公式可以看出來:
$$
Odds \in [0, \infty)
$$
這個範圍單向延伸到 $\infty$ 的範圍，已經有一半可以對上線性代數的範圍了。
下一步就是要找到映射 $-\infty$ 的方法。

#### 對數勝算(Log-Odds)
我們已經知道 勝算的範圍是 $[0, \infty)$，當$P$機率越大，勝算會越靠近無限大，反之機率越小，則勝算會無限靠近0但非0。  
所以問題變成：我們要想個方法，讓「越靠近0的數字，變成一個越大的負數，大到無限靠近負無限大」。  

有個酷酷的東西叫做自然對數：$\ln(x) = log_e{x}$  
我們可以先從對數開始複習：
$$
\begin{align*}
log_{2}2 &= log_{2}{2 ^ 1} = 1 \\
log_{2}4 &= log_{2}{2 ^ 2} = 2 \\
log_{3}9 &= log_{3}{3 ^ 2} = 2 \\
log_{3}81 &= log_{3}{3 ^ 4} = 4 \\
\end{align*}
$$
接著我們開始講對數：
$$
\begin{align*}
\ln(x) &= log_{e}x \\
\text{Let } log_{e}x &= y \\
\text{Then } e^y &= x \\
\end{align*}
$$
舉個例子, $\ln(1)$:  
$$
\begin{align*}
log_{e}1 &= y \\
e^y &= 1 \\
y &= 0
\end{align*}
$$
如果是小於1的數呢？ $\ln(0.5)? \ln(0.1)?$:  
$$
\begin{align*}
\ln(0.5) &= \ln(\frac{1}{2}) \\
&= \ln(1) - \ln(2)\quad(\because \ln(\frac{a}{b}) = \ln{a} - \ln{b}) \\
&= 0 - \ln(2)\quad(\because \ln(1) = 0) \\
&= - \ln(2) \\
\\
\ln(0.1) &= \ln(\frac{1}{10}) \\
&= \ln(1) - \ln(10) \\
&= -\ln(10)
\end{align*}
$$
在 $0 < x < 1$ 這個區間裡面，我們可以發現，取了自然對數之後，所得到的值會是一個負數，  
並且隨著$x$的值越靠近0，這個數字會負的越大，最終無限靠近負無限大。  

套用到勝算當中：
$$
\begin{align*}
Odds &= \frac{P}{1 - P} \\
Log-Odds &= \ln(\frac{P}{1-P}) = z \\
e^z &= e^{\ln(\frac{P}{1-P})} \\
e^z &= \frac{P}{1-P} \\
e^z(1-P) &= P \\
e^z - e^{z}P &= P \\
e^z &= P + e^{z}P \\
e^z &= P(1 + e^z) \\
P &= \frac{e^z}{1 + e^z}
\end{align*}
$$

### Sigmoid 函數
至此，我們得到了 對數勝算(Log-Odds) 函數，而它也被稱為 Sigmoid函數。  
如同我們一路推導的目的，是為了在機率論裡頭，找到一個可以映射 $(-\infty, \infty)$ 區間的方法。  
而經過了 勝算(Odds) 的 $[0, \infty)$ 到 對數勝算(Log-Odds)的 $(-\infty, \infty)$。  

我們會用 $\sigma(z)$ 來表示:  
$$
\sigma(z) = \frac{e^z}{1 + e^z}
$$  
接下來我們把它化簡成Sigmoid的常見形式(不一定必須):  
$$
\begin{align*}
P = \sigma(z) &= \frac{e^z}{1 + e^z} \\
&= \frac{\frac{e^z}{e^z}}{\frac{1}{e^z} + \frac{e^z}{e^z}} \\
&= \frac{1}{1 + e^{-z}} \quad \because \frac{1}{e^z} = e^{-z}
\end{align*}
$$

這個函數的目的是把線性函數 $z = w_1x_1 + w_2x_2 + b$ 映射到 $[0, 1]$ 的機率。  

## 決策邊界(Decision Boundary)
我們找到了一個工具(Sigmoid)來幫助我們計算機率，而回歸到我們的目的，是要分類。  
$z$這個線性函數，可以幫我們定義一個邊界，而這個邊界可以區分出二元的兩側；所以代表在這條線上，分類為A的機率跟分類為B的機率為相同(50%)，意即 $P = 50\% = 0.5$ 。

> 換句話說，當 $P > 0.5$ ，歸類為A；若 $P < 0.5$ 則歸類為B。

則:  
$$
\begin{align*}
\sigma(z) &= P \\
=> P &= \frac{1}{1 + e^{-z}} \\
=> 0.5 &= \frac{1}{1 + e^{-z}} \\
=> 1 &= 0.5 + 0.5e^{-z} \\
=> 1 &= e^{-z} \\
=> z &= 0 \\
\end{align*}
$$

所以當 $P=0.5$ 時， $z = 0$，則 $z = w_1x_1 + w_2x_2 + b = 0$  
這個方程式就代表了決策邊界在坐標系中的圖形，介於這條線的兩側，分別被歸類為A或者B。  
接下來的問題就是，根據實際的訓練資料，這個函數中的 $w_1, w_2, b$ 是否符合實際的類別，  
我們需要透過機器學習來訓練。  

## 損失函數(Loss Function)
如同線性回歸一樣，我們需要找到一個數學工具，來綜合「訓練後」的預測以及訓練集中的「實際值」中所計算出來的誤差，進一步作為最佳化的依據。  
在二元分類的邏輯回歸中，誤差的意思是「如果某個資料是屬於A類，但是卻被決策邊界歸為B類」，這類型的誤差需要被訓練集中的每一個訓練資料所檢視。  
  
所以我們需要找到一個數學工具，可以協助我們比較，預測類跟實際類的差別:  

### 交叉熵損失函數(Cross-Entropy loss function)
如果 $y$ 是真實標籤(分類結果,$0 or 1$, 0代表A類，1代表B類), $p$ 是預測機率。  
我們需要找到一個方法，在實際值為0，分類為1時出現誤差；相反實際值為1，分類為0時也出現誤差；但是如果兩者一致，則不出現誤差。  

換句話說:  
$$
\begin{align*}
y = 1, p = 0, \quad \text{error!} \\
y = 0, p = 1, \quad \text{error!} \\
y = 1, p = 1, \quad \text{good!} \\
y = 0, p = 0, \quad \text{good!}
\end{align*}
$$
同時因為 $p \in [0, 1]$:  
$$
\begin{align*}
y = 1, p &= 0.1, \quad \text{big big error!} \\
y = 1, p &= 0.3, \quad \text{minor error!} \\
y = 1, p &= 0.9, \quad \text{good!} \\
\end{align*}
$$
我們還需要根據程度，給出不同大小的誤差。  
以下我們又會使用到 自然對數 來作為我們的數學工具。

#### 自然對數
如同上面推導的時候所使用到的自然對數，如果一個介於 $[0, 1]$ 之間的數取自然對數，  
會得到一個負數，並且隨著數向 $0$ 靠近，取 $\ln$ 之後的值會越靠近 $-\infty$  

所以如果我們把機率放進去自然對數，我們可以分別計算出兩種誤差:  
$$
\begin{align*}
\ln(p) &=> 當y為1，但p為0.1時 \\
\ln(1 - p) &=> 當y=0，但p為1時\\
\end{align*}
$$
這兩種誤差，分別需要在對的場合被應用，所以我們需要幫他們乘上一個係數:  
$$
\begin{align*}
y\ln(p) &=> 當y為1，但p為0.1時 \\
(1-y)\ln(1 - p) &=> 當y=0，但p為1時\\
\end{align*}
$$
如此一來，這些誤差在相反的情況下，會被係數抵銷掉，最後我們可以把這兩個誤差合併起來：  
$$[y\ln(p) + (1-y)\ln(1-p)]$$  
這些誤差，都是自然對數映射了負數的總和，所以越靠近零，其值會越靠近負無限大，  
但是經過係數篩選後，負號還依舊存在，為了要更好的表達損失的大小，  
我們透過乘以 $-1$ ，翻轉了負號的意義，讓整個函式的輸出越靠近負無限大，則代表錯誤越大:  
$$
L(y, p) = - [y\ln(p) + (1-y)\ln(1-p)]
$$
我們就取得了 交叉熵損失函數。

### 平均交叉熵損失(Average Cross-Entropy Loss)
我們可以透過交叉熵函數，可以計算出單個點的誤差:  
$$
L(y_i, p_i) = -[y_i\ln(p_i) + (1 - y_i)\ln(1-p_i)]
$$
接下來我們要算出整個資料集的所有誤差，並且這些誤差均勻的散步在整個資料集的大小:
$$
\begin{align*}
Loss &= \frac{1}{N}\sum_{i=1}^{N}-[y_i\ln(p_i) + (1 - y_i)\ln(1-p_i)] \\
&= - \frac{1}{N}\sum_{i=1}^{N}[y_i\ln(p_i) + (1 - y_i)\ln(1-p_i)]
\end{align*}
$$

取得這個Loss function後，我們就可以依此來知道每次迭代訓練後的誤差，  
接下來我們只要找到一個改進方法就可以套用進我們的最佳化策略了。  

## 最佳化器(Optimizer)
我們的損失函數:  
$$
J(w_1, w_2, b) = - \frac{1}{N}\sum_{i=1}^{N}[y_i\ln(p_i) + (1 - y_i)\ln(1-p_i)]
$$
<div id="loss-function-chart" style="width: 100%; height: 500px;"></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    let myChart = echarts.init(document.getElementById('loss-function-chart'));

    let xData = [-3, -2, -1, 0, 1, 2, 3];
    let yData = [0, 0, 0, 0, 1, 1, 1];

    function sigmoid(z) {
      return 1 / (1 + Math.exp(-z));
    }

    function average_cross_entropy(w) {
      let sum = 0;
      for (let i = 0; i < xData.length; i++) {
        let p = sigmoid(w * xData[i]);
        p = Math.max(1e-8, Math.min(1 - 1e-8, p)); // Prevent log(0)
        let y = yData[i];
        sum += - (y * Math.log(p) + (1 - y) * Math.log(1 - p));
      }
      return sum / xData.length;
    }

    function errorData() {
      let datas = [];
      for (let i = 0; i < 100; i++) {        
        let w = -6 + i * (12 / 99); 
        datas.push([w, average_cross_entropy(w)]);
      }
      return datas;
    }

    let option = {
      backgroundColor: '#fff',
      title: {
        text: '不同 w 參數下的平均交叉熵損失曲線'
      },
      xAxis: {
        name: 'w',
        min: -6,
        max: 6
      },
      yAxis: {
        name: 'Average Loss',
        min: 0,
        max: 1.5
      },
      series: [{
        type: 'line',
        smooth: true,
        data: errorData(),
      }]
    }
    myChart.setOption(option);
  });
</script>

在一個特徵底下的圖形會長得像上面那樣；  
這個是以不同的 $w$ 代入線性代數後，平均交叉熵損失會是多少，  
基本上找 $w$ 的過程就是我們在訓練的過程。  

為了要找到最佳的 $w$ 我們可以獲得最低的損失，這邊我們採用求導數(偏微分)來根據斜率逐漸找到最佳的 $w$。
{% post_link AI/linear-regression-and-its-math_zhTW#gradient-descent梯度下降 '>> [為什麼要用微分？] <<' %}  

### Loss Function 算式展開
這張圖實際上跟我們的假設不符合，它只是個示意圖，  
因為我們的假設中有 $w_1, w_2, b$ 三個特徵, 接下來我們要按這三個參數進行求偏導(偏微分)
首先我們把整個式子展開來:
$$
\begin{align*}
J(w_1, w_2, b) &= - \frac{1}{N}\sum_{i=1}^{N}[y_i\ln(p_i) + (1 - y_i)\ln(1-p_i)] \\
\because \sigma(z_i) &= P_i = \frac{1}{1 + e^{-z_i}} \\
&= - \frac{1}{N}\sum_{i=1}^{N}[y_i\ln(\frac{1}{1 + e^{-z_i}}) + (1 - y_i)\ln(1 - \frac{1}{1 + e^{-z_i}})] \\
&= - \frac{1}{N}\sum_{i=1}^{N}[y_i\ln(\frac{1}{1 + e^{-z_i}}) + (1 - y_i)\ln(\frac{e^{-z_i}}{1 + e^{-z_i}})] \\
\because \ln(\frac{N}{M}) &= \ln(N) - \ln(M) \quad (N, M > 0) \\
&= - \frac{1}{N}\sum_{i=1}^{N}[y_i(\ln(1) - \ln(1 + e^{-z_i})) + (1 - y_i)(\ln(e^{-z_i}) - \ln(1 + e^{-z_i}))] \\
\because \ln(1) &= 0 \\
&= - \frac{1}{N}\sum_{i=1}^{N}[- y_i\ln(1 + e^{-z_i}) + (1 - y_i)(\ln(e^{-z_i}) - \ln(1 + e^{-z_i}))] \\
\because \ln(e^{-z_i}) &= -z_i \\
&= - \frac{1}{N}\sum_{i=1}^{N}[- y_i\ln(1 + e^{-z_i}) + (1 - y_i)[{-z_i} - \ln(1 + e^{-z_i})]] \\
&= - \frac{1}{N}\sum_{i=1}^{N}[- y_i\ln(1 + e^{-z_i}) - (1 - y_i){z_i} - (1 - y_i)\ln(1 + e^{-z_i})] \\
&= - \frac{1}{N}\sum_{i=1}^{N}[\ln(1 + e^{-z_i})[-y_i -(1 - y_i)] - (1 - y_i)z_i] \\
&= - \frac{1}{N}\sum_{i=1}^{N}[-\ln(1 + e^{-z_i}) - (1 - y_i)z_i] \\
J(w_1, w_2, b) &= \frac{1}{N}\sum_{i=1}^{N}[\ln(1 + e^{-z_i}) + (1 - y_i)z_i]
\end{align*}
$$
接著我們就可以開始來求偏導了。  

### 係數$w_1$:
$\dfrac{dJ}{dw_1}$:
$$
\begin{align*}
\text{Let } f(x_i) &= \ln(1 + e^{-z_i}) + (1 - y_i)z_i \\
\dfrac{dJ}{dw_1} &= \frac{1}{N}\sum_{i=1}^{N}\dfrac{d}{dw_1}f(x_i) \\
&= \frac{1}{N}\sum_{i=1}^{N}\dfrac{df}{dz_i} \cdot \dfrac{dz_i}{dw_1} \quad
\because \dfrac{d}{du}f(x) = \dfrac{df}{dg} \cdot \dfrac{dg}{du} \tag{1} \\
\\
\dfrac{df}{dz_i} &= \dfrac{d}{dz_i}[\ln(1 + e^{-z_i}) + (1-y_i)z_i] \\
&= \dfrac{d}{dz_i}\ln(1 + e^{-z_i}) + \dfrac{d}{dz_i}(1 - y_i)z_i \\
&= \dfrac{d}{dz_i}\ln(1 + e^{-z_i}) + (1 - y_i) \tag{2} \\
\\
\dfrac{d}{dz_i}\ln(1 + e^{-z_i}) &= \frac{1}{1 + e^{-z_i}} \cdot \dfrac{d}{dz_i}(1 + e^{-z_i}) \quad
\because \dfrac{d}{dg}\ln(u) = \frac{1}{u} \cdot \dfrac{du}{dg} \tag{3} \\
\\
\dfrac{d}{dz_i}(1 + e^{-z_i}) &= \dfrac{d}{dz_i}(1) + \dfrac{d}{dz_i}e^{-z_i} \\
&= 0 + \dfrac{d}{dz_i}e^{-z_i} \\
\text{Let } u = -z_i => \dfrac{d}{dz_i}(1 + e^{-z_i}) &= \dfrac{d}{dz_i}e^u \\
&= \dfrac{d(e^u)}{du} \cdot \dfrac{du}{dz_i} \quad \because \dfrac{da}{db} = \dfrac{da}{dc} \cdot \dfrac{dc}{db} \\
&= e^u \cdot (-1) \\
\dfrac{d}{dz_i}(1 + e^{-z_i}) &= -e^{-z_i} \tag{4} \\
\\
\text{Base on (3), (4)} => \dfrac{d}{dz_i}\ln(1 + e^{-z_i}) &= \frac{1}{1 + e^{-z_i}} \cdot (-e ^ {-z_i})  \\
&= \frac{-e^{-z_i}}{1 + e^{-z_i}} \\
&= \frac{-1{e}^{-z_i}e^{z_i}}{(1 + e^{-z_i})e^{z_i}} \\
&= -\frac{1}{e^{z_i} + 1} \tag{5} \\
\text{Proof }\sigma(-z) = 1 - \sigma(z) => \frac{1}{1 + e^z} &= 1 - \frac{1}{1 + e^{-z}}\quad\because \sigma(z) = \frac{1}{1 + e^{-z}}, \sigma(-z) = \frac{1}{1 + e ^ {-(-z)}}\\
=> \frac{1}{1 + e^z} &= \frac{1 + e^{-z} - 1}{1 + e^{-z}} \\
=> \frac{1}{1 + e^z} &= \frac{e^{-z}}{1 + e^{-z}} \\
=> \frac{1}{1 + e^z} &= \frac{e^{-z}e^z}{(1 + e^{-z})e^z} \\
=> \frac{1}{1 + e^z} &= \frac{1}{(1 + e^{-z})e^z} \\
=> \sigma(-z) = \frac{1}{1 + e^z} = 1 - \sigma(z) \tag{6} \\
\\
\text{Base on (5), (6)} => \dfrac{d}{dz_i}\ln(1 + e^{-z_i}) &= -\frac{1}{e^{z_i} + 1} \\
&= - (1 - \sigma(z_i)) \\
&= \sigma(z_i) - 1 \tag{7} \\
\\
\text{Base on (2), (7)} => \dfrac{df}{dz_i} &= \dfrac{d}{dz_i}\ln(1 + e^{-z_i}) + (1 - y_i) \\
&= \sigma(z_i) - 1 + (1 - y_i) \\
&= \sigma(z_i) - y_i \tag{8} \\
\\
\dfrac{dz_i}{dw_1} &= \dfrac{d}{dw_i}[w_1x_{i1} + w_2x_{i2} + b] \quad \because z_i = w_1x_{i1} + w_2x_{i2} + b \\
&= x_{i1} + 0 + 0 \\
&= x_{i1} \tag{9} \\
\\
\text{Base on (1), (8), (9)} => \dfrac{dJ}{dw_1} &= \frac{1}{N}\sum_{i=1}^{N}\dfrac{df}{dz_i}\cdot \dfrac{dz_i}{dw_1} \\
&= \frac{1}{N}\sum_{i=1}^{N}[(\sigma(z) - y_i)x_{i1}] \tag{10} \\
\end{align*}
$$

### 係數$w_2$:
$\dfrac{dJ}{dw_2}$
$$
\begin{align*}
\text{Let } f(x_i) &= \ln(1 + e^{-z_i}) + (1 - y_i)z_i \\
\dfrac{dJ}{dw_2} &= \frac{1}{N}\sum_{i=1}^{N}\dfrac{d}{dw_2}f(x_i) \\
&= \frac{1}{N}\sum_{i=1}^{N}\dfrac{df}{dz_i} \cdot \dfrac{dz_i}{dw_2} \quad
\because \dfrac{d}{du}f(x) = \dfrac{df}{dg} \cdot \dfrac{dg}{du} \tag{11} \\
\\
\dfrac{dz_i}{dw_2} &= \dfrac{d}{dw_2}[w_1x_{i1} + w_2x_{i2} + b] \quad \because z_i = w_1x_{i1} + w_2x_{i2} + b \\
&= 0 + x_{i2} + 0 \tag{12} \\
\\
\text{Base on (8), (11), (12)} => \dfrac{dJ}{dw_2} &= \frac{1}{N}\sum_{i=1}^{N}\dfrac{df}{dz_i} \cdot \dfrac{dz_i}{dw_2} \\
&= \frac{1}{N}\sum_{i=1}^{N}[(\sigma(z_i) - y_i)x_{i2}] \tag{13}
\end{align*}
$$

### 係數$b$:
$\dfrac{dJ}{db}$
$$
\begin{align*}
\text{Let } f(x_i) &= \ln(1 + e^{-z_i}) + (1 - y_i)z_i \\
\dfrac{dJ}{db} &= \frac{1}{N}\sum_{i=1}^{N}\dfrac{d}{db}f(x_i) \\
&= \frac{1}{N}\sum_{i=1}^{N}\dfrac{df}{dz_i} \cdot \dfrac{dz_i}{db} \quad
\because \dfrac{d}{du}f(x) = \dfrac{df}{dg} \cdot \dfrac{dg}{du} \tag{14} \\
\\
\dfrac{dz_i}{db} &= \dfrac{d}{db}[w_1x_{i1} + w_2x_{i2} + b] \quad \because z_i = w_1x_{i1} + w_2x_{i2} + b \\
&= 0 + 0 + 1 \tag{15} \\
\\
\text{Base on (8), (14), (15)} => \dfrac{dJ}{db} &= \frac{1}{N}\sum_{i=1}^{N}\dfrac{df}{dz_i} \cdot \dfrac{dz_i}{db} \\
&= \frac{1}{N}\sum_{i=1}^{N}(\sigma(z_i) - y_i) \tag{16}
\end{align*}
$$

### 所有的偏導以及梯度下降
從上面的 $\text{(10), (13),(16)}$ 式，我們可以得到三個偏導：  
$$
\begin{align*}
\dfrac{dJ}{dw_1} &= \frac{1}{N}\sum_{i=1}^{N}[(\sigma(z_i) - y_i)x_{i1}] \tag{10} \\
\dfrac{dJ}{dw_2} &= \frac{1}{N}\sum_{i=1}^{N}[(\sigma(z_i) - y_i)x_{i2}] \tag{13} \\
\dfrac{dJ}{db} &= \frac{1}{N}\sum_{i=1}^{N}(\sigma(z_i) - y_i) \tag{16} \\
\end{align*}
$$
依此來放入梯度下降公式:  
$$
\begin{align*}
\text{Base on (10), (13), (16)} &=> \\
w_{1new} &= w_{1old} - \alpha (\frac{1}{N}\sum_{i=1}^{N}[(\sigma(z_i) - y_i)x_{i1}]) \\
w_{2new} &= w_{2old} - \alpha (\frac{1}{N}\sum_{i=1}^{N}[(\sigma(z_i) - y_i)x_{i2}]) \\
b_{new} &= b_{old} - \alpha (\frac{1}{N}\sum_{i=1}^{N}(\sigma(z_i) - y_i)) \\
\end{align*}
$$

可以從上面的梯度公式看出:

> $\sigma(z) - y_i$ 代表著 每一個預測機率 跟 實際訓練集的標籤 誤差。  
> 取了 $\frac{1}{N}\sum_{i=1}^{N}$ 變成了平均誤差。  
> 有趣的是，每一個權重($w$)都受到了 特徵本身以及誤差之間相乘 的總和平均影響。  
> 而偏差項($b$)本身的梯度總是為1，所以只受到了所有樣本的平均誤差影響。  

經過了漫長的推導以及化簡，最終得出來的梯度公式，其實還蠻優雅的xd(elegant)。  

## 寫在最後
這次的推導比我想像中的還要漫長許多。  
雖然已經跳過了多特徵的向量表達，但是三個特徵推導起來還是感到吃力。  
為了連結線性代數以及機率論，花了很大的力氣在推導。  
下次考慮開始寫點多特徵向量或者是邏輯回歸延伸到神經網路的推導，應該就會遇到離散數學了Orz。  
