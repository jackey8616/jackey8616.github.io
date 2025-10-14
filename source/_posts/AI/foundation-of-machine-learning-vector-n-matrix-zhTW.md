---
title: 'Foundation of Machine Learning: Vector & Matrix(zhTW)'
date: 2025-10-09 19:37:23
categories: AI
hidden: true
tags:
  - AI
  - Machine Learning
  - Regression Analysis
  - Vector
  - Matrix
mathjax: true
---

機器學習的基石： 從 $w^T{x}$ 向量內積以及矩陣乘法看懂線性與邏輯迴歸  
<!-- More -->

## 單一特徵的窘境
在前幾篇文章中({% post_link AI/linear-regression-and-its-math-zhTW '[線性回歸]' %}, {% post_link AI/logistic-regression-and-its-math-zhTW '[邏輯回歸]' %})，我們使用了大量的數學推導，但是為了方便討論數學原理，我們都採用了較為單純的單特徵或者是雙特徵的假設來進行:  

$$
\begin{align*}
y &= wx + b \\
z &= w_1x_1 + w_2x_2 + b \\
\end{align*}
$$

在實務場景中，這樣子的假設幾乎沒辦法應用。  

> 例如房價(y) 跟 面積(x1), 樓層(x2), 南北朝向(x3) ... 這些因素所影響。

一但我們有多個特徵，公式就會變成冗長的求和式:  

$$
\begin{align*}
y &= w_1x_1 + w_2x_2 + w_3x_3 + ... + w_nx_n + b \\
\end{align*}
$$
這樣子的式子，不僅難以處理，而且對於運算的效率也有所影響。  
為了要幫助計算，必須引入線性代數的工具：向量(Vector)以及矩陣(Matrix)。  

## 向量化(Vectorization)
用以下的式子為例:  
$$
\begin{align*}
y &= w_1x_1 + w_2x_2 + w_3x_3 + ... + w_nx_n + b \tag{1} \\
\end{align*}
$$

### 特徵向量x & 權重向量w
我們將所有特徵以及權重各別打包成一個列向量(column vector):
$$
w = 
\begin{bmatrix}
w_1 \\
w_2 \\
\vdots \\
w_n \\
\end{bmatrix}
\quad
x = 
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n \\
\end{bmatrix}
$$
在進行向量內積時，我們會把其中一個向量做轉置(column to row vector)來好滿足矩陣乘法的條件:
$$
w^{T} = 
\begin{bmatrix}
w_1 & w_2 & \cdots & w_n 
\end{bmatrix}
$$

### 向量內積
根據向量內積的代數定義:  
$$
\begin{align*}
\vec{a} &= [a_1, a_2, \dots, a_n] \\
\vec{b} &= [b_1, b_2, \dots, b_n] \\
\vec{a} \cdot \vec{b} &= \sum_{i=1}^{n}a_ib_i = a_1b_1 + a_2b_2 + \dots + a_nb_n \\
\end{align*}
$$
其中又可以表示為w轉置乘以x(w transpose x): $w^{T}x$  
因此:  
$$
w^{T}x = w_1x_1 + w_2x_2 + ... + w_nx_n
$$
替換掉 $\text{(1)}$ 中部分的式子:
$$
\begin{align*}
y &= w_1x_1 + w_2x_2 + ... + w_nx_n + b \\
&= w^{T}x + b \\
\end{align*}
$$

## 向量內積的微分
$$
\begin{align*}
\hat{y} &= (w^{T}x + b) \\
\dfrac{d\hat{y}}{dw} &= \dfrac{d}{dw}(w^{T}x) + 0 \\
&= \begin{bmatrix}
\dfrac{d\hat{y}}{dw_1} \\
\dfrac{d\hat{y}}{dw_2} \\
\vdots \\
\dfrac{d\hat{y}}{dw_n} \\
\end{bmatrix}\tag{2.1}\\
\\
\dfrac{d\hat{y}}{dw_j} &= \dfrac{d}{dw_j}(w_1x_1 + w_2x_2 + \dots + w_nx_n) \\
&= \dfrac{d}{dw_j}(w_jx_j) \\
&= x_j\tag{2.2}\\
\\
\text{Base on (2.1), (2.2)} => \dfrac{d\hat{y}}{dw} &= \begin{bmatrix}
\dfrac{d\hat{y}}{dw_1} \\
\dfrac{d\hat{y}}{dw_2} \\
\vdots \\
\dfrac{d\hat{y}}{dw_n} \\
\end{bmatrix}
= \begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n \\
\end{bmatrix}
= x^{(i)}\tag{2.3}
\end{align*}
$$

$$
\begin{align*}
\dfrac{d}{db}\hat{y}^{(i)} &= \dfrac{d(w^{T}x^{(i)} + b)}{db} \\
&= \dfrac{d}{db}(w^{T}x^{(i)}) + \dfrac{db}{db} \\
&= 0 + 1 = 1 \tag{2.4} \\
\end{align*}
$$

## 矩陣
我們假設現在有一個房價訓練集，裡面包含了5筆訓練資料(樣本)，每筆資料有3個特徵。

### 特徵矩陣(X)
我們有n個樣本(n=5), 每個樣本有m個特徵(m=3):  

| 樣本編號$(i)$ | 面積($x_1$) | 房齡($x_2$) | 樓層($x_3$) | 房價($y^{(i)}$) |  
|:-----------:|:-----------:|:----------:|:-----------:|:--------------:|  
| 1           | 150         | 20         | 3           | 550K           |  
| 2           | 80          | 25         | 4           | 280K           |  
| 3	          | 200	        | 2	         | 9       	   | 720K           |  
| 4	          | 120	        | 10	       | 7	         | 450K           |  
| 5	          | 180	        | 15	       | 6	         | 580K           |  

而我們的矩陣大小會是 $n \times m$:
$$
\begin{align*}
X =
\begin{bmatrix}
150 & 20 & 3 \\
80  & 25 & 4 \\
200 & 2  & 9 \\
120 & 10 & 7 \\
180 & 15 & 6 \\
\end{bmatrix} \\
\\
Shape = 5 \times 3 \\
\end{align*}
$$

### 權重向量(w)
{% spoiler [為什麼一下說矩陣、一下說向量？] %}
> 其實向量跟矩陣在機器學習領域中本質上是一樣的東西。  
> 為了方便在訓練中計算向量，向量被提升到了一個($n \times 1$ or $1 \times n$)大小的矩陣中。  
> 但是在純數學的領域當中，向量跟矩陣是不同的概念。
{% endspoiler %}

因為m=3，所以總共會有三個權重需要學習:  
$$
\begin{align*}
w = 
\begin{bmatrix}
w_1 \\
w_2 \\
w_3 \\
\end{bmatrix} \\
\\
Shape = 3 \times 1 \\
\end{align*}
$$

### 目標向量(y)
同理，因為有五個樣本(n=5)，對應的值也有五個(單位是萬元):
$$
\begin{align*}
y = 
\begin{bmatrix}
550 \\
280 \\
720 \\
450 \\
580 \\
\end{bmatrix} \\
\\
Shape = 5 \times 1 \\
\end{align*}
$$

### 單一向量內積(單樣本)
只看第一個樣本時，我們所計算的是 $w^{T}x^{(i)}$:
$$
\begin{align*}
w^{T}x^{(i)} &= 
\begin{bmatrix}w_1 & w_2 & w_3\end{bmatrix}
\begin{bmatrix}
150 \\
20 \\
3 \\
\end{bmatrix} \\
&= (w_1 \cdot 150 + w_2 \cdot 20 + w_3 \cdot 3)\\
\end{align*}
$$
按照尺寸(Shape)來看: $(1 \times 3) \times (3 \times 1) = (1 \times 1)$  

### 批量矩陣乘法(所有樣本)
同時計算所有的特徵以及樣本時：  
$$
\begin{align*}
\hat{y} &= X\cdot w \\
&= 
\begin{bmatrix}
150 & 20 & 3 \\
80  & 25 & 4 \\
200 & 2  & 9 \\
120 & 10 & 7 \\
180 & 15 & 6 \\
\end{bmatrix}
\cdot
\begin{bmatrix}
w_1 \\
w_2 \\
w_3
\end{bmatrix} \\
&= (w_1 \cdot 150 + w_2 \cdot 20 + w_3 \cdot 3) + (w_1 \cdot 80 + w_2 \cdot 25 + w_3 \cdot 4) ... \\
&=
\begin{bmatrix}
\hat{y_1} \\
\hat{y_2} \\
\hat{y_3} \\
\hat{y_4} \\
\hat{y_5} \\
\end{bmatrix}
\end{align*}
$$
尺寸(Shape)則會是: $(5 \times 3) \times (3 \times 1) = (5 \times 1)$  
算出來的值會是對應五個樣本的預測值($\hat{y}$)。   

### 為什麼強調尺寸？
尺寸(維度)影響到了矩陣相乘。  
如果維度沒有對齊，那麼矩陣是無法相乘的。  

拿以下兩個矩陣為例：  
$$
a = 
\begin{bmatrix}
0 & 1 & 2 \\
3 & 4 & 5 \\
\end{bmatrix}
\quad
b = 
\begin{bmatrix}
6 & 7 \\
8 & 9 \\
10 & 11 \\
\end{bmatrix}
$$
$$
\begin{align*}
a \cdot b &= 
\begin{bmatrix}
0 * 6 + 1 * 8 + 2 * 10 & 0 * 7 + 1 * 9 + 2 * 11 \\
3 * 6 + 4 * 8 + 5 * 10 & 3 * 7 + 4 * 9 + 5 * 11 \\
\end{bmatrix}
\\
&=
\begin{bmatrix}
28 & 31 \\
100 & 112 \\
\end{bmatrix}
\end{align*}
$$
用其他方式運算:  
$$
\begin{align*}
a \cdot b &= 
\begin{bmatrix}
0\cdot\begin{bmatrix}6 & 7\end{bmatrix} + 1\cdot\begin{bmatrix}8 & 9\end{bmatrix} + 2\cdot\begin{bmatrix}10 & 11\end{bmatrix} \\
3\cdot\begin{bmatrix}6 & 7\end{bmatrix} + 4\cdot\begin{bmatrix}8 & 9\end{bmatrix} + 5\cdot\begin{bmatrix}10 & 11\end{bmatrix} \\
\end{bmatrix}
\\
&=
\begin{bmatrix}
\begin{bmatrix}0 & 0\end{bmatrix} + \begin{bmatrix}8 & 9\end{bmatrix} + \begin{bmatrix}20 & 22\end{bmatrix} \\
\begin{bmatrix}18 & 21\end{bmatrix} + \begin{bmatrix}32 & 36\end{bmatrix} + \begin{bmatrix}50 & 55\end{bmatrix} \\
\end{bmatrix}
\\
&=
\begin{bmatrix}
0 + 8 + 20 & 0 + 9 + 22 \\
18 + 32 + 50 & 21 + 36 + 55 \\
\end{bmatrix}
\\
&=
\begin{bmatrix}
28 & 31 \\
100 & 112 \\
\end{bmatrix}
\end{align*}
$$

## 小結
我們已經從單一特徵的公式，推廣到多特徵並用向量與矩陣的方式表達，大幅簡化數學推導與計算流程。  
在神經網路中，每個模型（層）都對應特定大小的矩陣，例如 l 為層數，m 為特徵，n 為樣本，後續設計會大量用到這些矩陣運算。  
矩陣的靈活性與效率，是現代機器學習與深度學習不可或缺的基礎。

## (補充)各項推導
### 線性回歸
樣本數: $n$, 特徵數: $m$  
模型預測: $\hat{y}^{(i)} = w^{T}x^{(i)} + b$  
Shape of $\hat{y}$: $(1 \times m) \times (m \times 1) + (1 \times 1)= 1 \times 1$  
損失函數(MSE):  
$$
L(w, b) = \frac{1}{n}\sum_{i=1}^{n}(\hat{y}^{(i)} - y^{(i)})^2
$$
以上是單個樣本的向量表達式，當我們以矩陣形式去所有樣本表達時:    
模型預測: $\hat{Y} = Xw + b1$  
Shape of $Y$: $(n \times m) \times (m \times 1) + (n \times 1)= n \times 1$  
{% spoiler [什麼是 $b1$ ?] %}
$1$ 代表的是一個「全1向量」。
$$
\begin{align*}
b1 = b \cdot
\begin{bmatrix}
1 \\
1 \\
\vdots \\
1 \\
\end{bmatrix}
&=
\begin{bmatrix}
b \\
b \\
\vdots \\
b \\
\end{bmatrix}
\end{align*}
$$
因為我們以矩陣來表達整個等式，當這些矩陣要進行運算的時候，  
向量並沒有辦法跟標量(b)進行運算，  
這個時候我們要把偏置項轉為一個向量來進行後續的運算。  
{% endspoiler %}
損失函數(MSE):
$$
\begin{align*}
\text{Let } E &= \hat{Y} - Y\\
L(w, b) &= \frac{1}{n}\sum_{i=1}^{n}(\hat{Y} - Y)^2 \\
&= \frac{1}{n}\sum_{i=1}^{n}E^2 \\
&= \frac{1}{n}E^{T}E\quad\because\sum_{i=1}^{n}E^2 = E^{T}E  \\
&= \frac{1}{n}(\hat{Y} - Y)^{T}(\hat{Y} - Y) \\
\end{align*}
$$
Shape of $E$ = Shape of $Y$ = $(n \times 1)$  
Shape of $L_{MSE}(w, b)$ = $(1 \times n) \times (n \times 1) = 1 \times 1$  
{% spoiler [為什麼 $\sum_{i=1}^{n} = E^{T}E$ ?] %}
$$
\begin{align*}
\sum_{i=1}^{n}E^2 &= E^{T}E \\
\because
E^{T}E &= 
\begin{bmatrix}E_1&E_2&\cdots&E_n\end{bmatrix}
\begin{bmatrix}E_1\\E_2\\\vdots\\E_n\end{bmatrix} \\
&= {E_1}^2 + {E_2}^2 + \cdots + {E_n}^2 \\
\therefore \sum_{i=1}^{n}E^2 = E^{T}E \\
\end{align*}
$$
{% endspoiler %}

#### 偏微分權重向量 w
{% spoiler [分母佈局] %}
> 在本系列文章中，我們採用矩陣微分的分母佈局（Denominator Layout）慣例。  
> 這表示對一個標量函數 $L$ 關於一個列向量 $w$ 進行微分時，  
> 得到的梯度 $\nabla_{w}L$ 應為與 $w$ 相同形狀的列向量（即 $m\times1$）。  
{% endspoiler %}

$$
\begin{align*}
\dfrac{dL_{MSE}}{dw} &= \dfrac{d(\frac{1}{n}(\hat{Y} - Y)^{T}(\hat{Y} - Y))}{dw} = \frac{1}{n}\dfrac{d(\hat{Y} - Y)^{T}(\hat{Y} - Y)}{dw} \\
&= \frac{1}{n}\dfrac{d(w^{T}X+b1 - Y)^{T}(w^{T}X+b1 - Y)}{dw} \\
\text{Set }E = Xw &+ b1 - Y => \\
&= \frac{1}{n}\dfrac{d(E^{T}E)}{dw} \\
&= \frac{1}{n}(\dfrac{dE}{dw})^{T}\dfrac{d(E^{T}E)}{dE} \\
&= \frac{1}{n}(X^T \cdot 2E) \\
&= \frac{2}{n}(X^{T}E) \\
&= \frac{2}{n}(X^{T}(Xw + b1 - Y)) \\
&= \frac{2}{n}(X^{T}(\hat{Y} - Y)) \\
\nabla_{w}L &= \frac{2}{n}(X^{T}(\hat{Y} - Y))
\end{align*}
$$
{% spoiler [證明 $\dfrac{dL}{dw} = (\dfrac{dE}{dw})^{T}\dfrac{dL}{dE}$] %}
舉一個簡單的模型為例:  
權重向量 $w : d=2$個權重 不含 $b$: $w = \begin{bmatrix}w_1 \\ w_2\end{bmatrix}$  
誤差向量 $E : n=3$個樣本 $E = \begin{bmatrix}E_1 \\ E_2 \\ E_3\end{bmatrix}$  
損失函數 $L$: 標量 $L(E) = E^{2}_1 + E^{2}_2 + E^{2}_3$ 忽略 $\frac{1}{n}$ 等常數。  
$$
\begin{align*}
\dfrac{dL}{dE} &= 
\begin{bmatrix}
\dfrac{dL}{dE_1} \\
\dfrac{dL}{dE_2} \\
\dfrac{dL}{dE_3} \\
\end{bmatrix}\quad\text{Shape: }(3 \times 1) \\
&= 
\begin{bmatrix}2E_1 \\ 2E_2 \\ 2E_3\end{bmatrix}\quad\because L = E^{2}_1 + E^{2}_2 + E^{2}_3 \\
&= 2E\tag{1}\\
\\
\dfrac{dE}{dw} &=
\begin{bmatrix}
\dfrac{de_1}{dw_1} & \dfrac{de_1}{dw_2} \\
\dfrac{de_2}{dw_1} & \dfrac{de_2}{dw_2} \\
\dfrac{de_3}{dw_1} & \dfrac{de_3}{dw_2} \\
\end{bmatrix}\tag{2}\because \text{Jacobian matrix} \\
\text{Shape } &= (n \times d) = 3 \times 2 \\
\\
(\dfrac{dE}{dw}^{T}) &= 
\begin{bmatrix}
\dfrac{de_1}{dw_1} & \dfrac{de_2}{dw_1} & \dfrac{de_3}{dw_1} \\
\dfrac{de_1}{dw_2} & \dfrac{de_2}{dw_2} & \dfrac{de_3}{dw_2} \\
\end{bmatrix}\tag{2}\\
\text{Shape } &= (d \times n) = 2 \times 3 \\
\\
\text{Base on (1), (2) =>} \\
(\dfrac{dE}{dw})^{T}\dfrac{dL}{dE} &= 
\begin{bmatrix}
\dfrac{de_1}{dw_1}\cdot 2E_1 + \dfrac{de_2}{dw_1}\cdot 2E_2 + \dfrac{de_3}{dw_1}\cdot 2E_3 \\
\dfrac{de_1}{dw_2}\cdot 2E_1 + \dfrac{de_2}{dw_2}\cdot 2E_2 + \dfrac{de_3}{dw_2}\cdot 2E_3 \\
\end{bmatrix}\\
\\
\dfrac{dL}{dw_1} &= \sum_{i=1}^{3}\dfrac{dL}{dE_i}\dfrac{dE_i}{dw_1} \\
&= 2E_1\dfrac{dE_1}{dw_1} + 2E_2\dfrac{dE_1}{dw_1} + 2E_3\dfrac{dE_3}{dw_1} \\
\\
\dfrac{dL}{dw} &=
\begin{bmatrix}
2E_1\dfrac{dE_1}{dw_1} + 2E_2\dfrac{dE_1}{dw_2} + 2E_3\dfrac{dE_3}{dw_1} \\
2E_1\dfrac{dE_1}{dw_2} + 2E_2\dfrac{dE_1}{dw_2} + 2E_3\dfrac{dE_3}{dw_2}
\end{bmatrix} \\
\therefore
\dfrac{dL}{dw} &= (\dfrac{dE}{dw})^{T}\dfrac{dL}{dE} \\
\end{align*}
$$
{% endspoiler %}

#### 偏微分偏差項 b
$$
\begin{align*}
\text{Set }E = Xw + b1 - Y &=> \\
\dfrac{dL_{MSE}}{db} &= \frac{1}{n}\dfrac{d(E^{T}E)}{db} \\
&= \frac{1}{n}(\dfrac{dE}{db})^{T}\dfrac{d(E^{T}E)}{dE} \\
&= \frac{1}{n}(1^T \cdot 2E) \\
&= \frac{2}{n}1^{T}(Xw + b1 - Y) \\
\dfrac{dL}{db} &= \frac{2}{n}1^{T}(\hat{Y} - Y) \\
\end{align*}
$$

#### 梯度公式
最後可以得到:
$$
\begin{align*}
\nabla_{w}L &= \frac{2}{n}(X^{T}(\hat{Y} - Y)) \\
\dfrac{dL}{db} &= \frac{2}{n}1^{T}(\hat{Y} - Y) \\
\end{align*}
$$  

### 邏輯回歸
對於一個多特徵的邏輯回歸，我們來看在數學運算上有什麼差別:  
樣本數: $n$  
模型預測: $z^{(i)} = w^{T}x^{(i)} + b$  
Sigmoid函數: $\sigma(z^{(i)}) = P^{(i)} = \frac{1}{1 + e^{-z^{(i)}}}$  
交叉熵損失函數: $L(y^{(i)}, P^{(i)}) = - [y^{(i)}\ln(P^{(i)}) + (1-y^{(i)})\ln(1-P^{(i)})]$  
平均交叉熵損失: $Loss = \frac{1}{n}\sum_{i=1}^{n}-[y^{(i)}\ln(P^{(i)})+(1-y^{(i)})\ln(1-P^{(i)})]$

#### 偏微分權重向量 w
$$
\begin{align*}
\dfrac{dL^{(i)}}{dw} &= \dfrac{dL^{(i)}}{dP^{(i)}} \cdot \dfrac{dP^{(i)}}{dz^{(i)}} \cdot \dfrac{dz^{(i)}}{dw}\tag{4.1} \\
\\
\dfrac{dL^{(i)}}{dP^{(i)}} &= \dfrac{d}{dP^{(i)}}[-[y^{(i)}\ln(P^{(i)}) + (1-y^{(i)})\ln(1-P^{(i)})]] \\
&= -(\dfrac{y^{(i)}}{P^{(i)}} - \frac{(1-y^{(i)})}{1-P^{(i)}}) \\
\because & \dfrac{d}{dx}ln(x) = \frac{1}{x}\quad\dfrac{d}{dx}(1-x) = \frac{-1}{1-x} \\
&= \frac{(1-y^{(i)})}{1-P^{(i)}} - \dfrac{y^{(i)}}{P^{(i)}} \\
&= \frac{(1-y^{(i)})P^{(i)} - (1-P^{(i)})y^{(i)}}{(1-P^{(i)}){P^{(i)}}} \\
&= \frac{P^{(i)}-y^{(i)}P^{(i)}-y^{(i)}+y^{(i)}P^{(i)}}{(1-P^{(i)}){P^{(i)}}} \\
&= \frac{P^{(i)}-y^{(i)}}{(1-P^{(i)}){P^{(i)}}}\tag{4.2}\\
\\
\dfrac{dP^{(i)}}{dz^{(i)}} &= \dfrac{d}{dz^{(i)}}(\frac{1}{1+e^{-z^{(i)}}}) = \dfrac{d}{dz^{(i)}}(1+e^{-z^{(i)}})^{-1} \\
Let & \space u = 1 + e^{-z^{(i)}} \\
\dfrac{dP^{(i)}}{dz^{(i)}} &= \dfrac{dP^{(i)}}{du} \cdot \dfrac{du}{dz^{(i)}} \\
&= -1 \cdot u^{-2} \cdot (0 + \dfrac{d}{dz^{(i)}}e^{-z^{(i)}}) \\
&= \frac{-1}{u^2} \cdot (-e^{-z^{(i)}}) \\
&= \frac{e^{(i)}}{(1 + e^{-z^{(i)}})^2} \\
&= \frac{1}{1+e^{-z^{(i)}}} \cdot \frac{e^{-z^{(i)}}}{1+e^{-z^{(i)}}} \\
\because & P^{(i)} = \frac{1}{1+e^{-z^{(i)}}}\quad (1-P^{(i)}) = \frac{e^{-z^{(i)}}}{1 + e^{-z^{(i)}}}\\
&= P^{(i)}(1-P^{(i)})\tag{4.3}\\
\\
\dfrac{dz^{(i)}}{dw} &= \dfrac{d}{dw}(w^{T}x^{(i)} + b) \\
&= x^{(i)}\tag{4.4}\\
\\
\text{Base on (4.1), }&\text{(4.2), (4.3), (4.4)} => \\
\dfrac{dL^{(i)}}{dw} &= \dfrac{dL^{(i)}}{dP^{(i)}} \cdot \dfrac{dP^{(i)}}{dz^{(i)}} \cdot \dfrac{dz^{(i)}}{dw}\\
&= \frac{P^{(i)}-y^{(i)}}{(1-P^{(i)}){P^{(i)}}} \cdot P^{(i)}(1-P^{(i)}) \cdot x^{(i)} \\
&= (P^{(i)}-y^{(i)})x^{(i)}\tag{4.5}\\
\end{align*}
$$

#### 偏微分偏差項 b
$$
\begin{align*}
\dfrac{dL^{(i)}}{db} &= \dfrac{dL^{(i)}}{dP^{(i)}} \cdot \dfrac{dP^{(i)}}{dz^{(i)}} \cdot \dfrac{dz^{(i)}}{db}\tag{4.6} \\
\\
\dfrac{dz^{(i)}}{db} &= 1\tag{4.7} \\
\\
\text{Base on (4.6), }&\text{(4.2), (4.3), (4.7)} => \\
&= (P^{(i)}-y^{(i)})\tag{4.8}\\
\end{align*}
$$

#### 梯度公式
根據 $\text{(4.5) (4.8)式}$ 我們可以得到:
$$
\begin{align*}
\dfrac{dLoss}{dw} &= \frac{1}{n}\sum_{i=1}^{n}(P^{(i)}-y^{(i)})x^{(i)}\\
\dfrac{dLoss}{db} &= \frac{1}{n}\sum_{i=1}^{n}(P^{(i)}-y^{(i)})\\
\end{align*}
$$  
其中 $\dfrac{dLoss}{dw}$ 又可以記做: $\nabla_{w}Loss$  
