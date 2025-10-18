---
title: 'Vectorization of Linear and Logistic Regression(zhTW)'
date: 2025-10-09 19:37:23
categories: AI
hidden: true
tags:
  - AI
  - Machine Learning
  - Regression Analysis
  - Linear Regression
  - Logistic Regression
  - Vector
  - Matrix
mathjax: true
---

線性/邏輯迴歸的向量化推導
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
y &= w_1x_1 + w_2x_2 + w_3x_3 + ... + w_mx_m + b \\
\end{align*}
$$
這樣子的式子，不僅難以處理，而且對於運算的效率也有所影響。  
為了要幫助計算，必須引入線性代數的工具：向量(Vector)以及矩陣(Matrix)。  

## 向量化(Vectorization)
用以下的式子為例:  
$$
\begin{align*}
y &= w_1x_1 + w_2x_2 + w_3x_3 + ... + w_mx_m + b \tag{1} \\
\end{align*}
$$

### 特徵向量x & 權重向量w
我們將所有特徵以及權重各別打包成一個列向量(column vector):
$$
\mathbf{w} = 
\begin{bmatrix}
w_1 \\
w_2 \\
\vdots \\
w_m \\
\end{bmatrix}
\quad
\mathbf{x} = 
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_m \\
\end{bmatrix}
$$
在第 $\text{(1)}$ 式，我們用向量替換掉之後，還會剩下一個 $b$ 的偏置項，為了讓整體的運算更加簡潔，我們把偏置項也納入向量之中。  
這個擴增過的向量，我們稱之為增廣向量(Augmented Vector):  
$$
\tilde{\mathbf{w}} = 
\begin{bmatrix}
b \\
w_1 \\
w_2 \\
\vdots \\
w_m \\
\end{bmatrix}
\quad
\tilde{\mathbf{x}} = 
\begin{bmatrix}
1 \\
x_1 \\
x_2 \\
\vdots \\
x_m \\
\end{bmatrix}
$$
在進行向量內積時，我們會把其中一個向量做轉置(column to row vector)來好滿足矩陣乘法的條件:
$$
\tilde{\mathbf{w}}^{T} = 
\begin{bmatrix}
b & w_1 & w_2 & \cdots & w_m
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
其中又可以表示為w轉置乘以x(w transpose x): $\mathbf{w}^{T}\mathbf{x}$  
因此:  
$$
\mathbf{w}^{T}\mathbf{x} = w_1x_1 + w_2x_2 + ... + w_mx_m
$$
我們套用 $\tilde{\mathbf{x}}$, $\tilde{\mathbf{w}}$:
$$
\begin{align*}
\hat{y} &= b\cdot 1 + w_1\cdot x_1 + \cdots + w_m\cdot x_m \\
&= \tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}
\end{align*}
$$

## 線性回歸
### 矩陣形式
假設樣本數為 $n$, 特徵數為 $m$  
單樣本模型: $\hat{y}^{(i)} = \tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}^{(i)}$  
Shape of $\hat{y}^{(i)} = (1\times(m+1))\times((m+1)\times 1) = 1\times 1$  

#### 特徵矩陣(X)的擴充
在已經經過增廣處理後的資料中，一個樣本會包含了每個特徵的自變數，我們會以一個 $\tilde{\mathbf{x}}$ 向量來表示:  
$$
\tilde{\mathbf{x}} =
\begin{bmatrix}1 \\ x_1 \\ x_2 \\ \cdots \\ x_m\end{bmatrix}
$$
當我們有一個樣本的時候，這個樣本的第一個特徵會表達為: $x_1$。  
第二個特徵則表達為: $x_2$... 依此類推直到, $x_m$,  
而整個向量 $\tilde{\mathbf{x}}$ 的尺寸大小會是 $((m + 1)\times 1)$。  
接下來要垂直堆疊這些向量，但是尺寸 $((m + 1)\times 1)$ 的向量直接垂直堆疊的話，  
會得到一個 $n\times((m + 1)\times 1)$ 的矩陣，這個尺寸明顯不能滿足 $\hat{\mathbf{y}} = \tilde{\mathbf{X}}\tilde{\mathbf{w}}$ 的矩陣乘法條件。  
所以這邊對於每個向量 $\tilde{\mathbf{x}}$ 進行轉置後堆疊:  
$$
\tilde{\mathbf{X}} = 
\begin{bmatrix}
(\tilde{\mathbf{x}}^{(1)})^T \\
(\tilde{\mathbf{x}}^{(2)})^T \\
\vdots \\
(\tilde{\mathbf{x}}^{(n)})^T \\
\end{bmatrix}
$$
最後將矩陣展開來:  
$$
\tilde{\mathbf{X}} =
\begin{bmatrix}
1 & x_1^{(1)} & x_2^{(1)} & \cdots & x_m^{(1)} \\
1 & x_1^{(2)} & x_2^{(2)} & \cdots & x_m^{(2)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & x_1^{(n)} & x_2^{(n)} & \cdots & x_m^{(n)} \\
\end{bmatrix}
$$
Shape of $\tilde{\mathbf{X}} = (n\times (m+1))$  

#### 預測向量($\hat{\mathbf{y}}$)
每一個 $\tilde{\mathbf{x}}^{(i)}$ 向量，都會有一個對應的預測值 $\hat{y}^{(i)}$,  
把這些預測值都堆疊起來，就成為了 $\hat{\mathbf{y}}$:  
$$
\hat{\mathbf{y}} = 
\begin{bmatrix}
\hat{y}^{(1)} \\
\hat{y}^{(2)} \\
\vdots \\
\hat{y}^{(n)}
\end{bmatrix}
$$  
Shape of $\hat{\mathbf{y}} = n\times 1$  

#### 實際輸出向量($\mathbf{y}$)
而對應的真實輸出，也同樣可以推疊成向量:
$$
\mathbf{y} = 
\begin{bmatrix}
y^{(1)} \\
y^{(2)} \\
\vdots \\
y^{(n)}
\end{bmatrix}
$$  
Shape of $\mathbf{y} = n\times 1$  

#### 矩陣形式的模型預測定義
接著我們以矩陣形式定義模型:  
$$
\hat{\mathbf{y}} = \tilde{\mathbf{X}}\tilde{\mathbf{w}}
$$
Shape of $\hat{\mathbf{y}} = (n\times (m + 1))\times((m + 1)\times 1) = (n\times 1)$  

#### 矩陣形式的平均平方誤差
計算所有樣本的平均平方誤差公式如下:  
$$
J_{MSE} = \frac{1}{n}\sum_{i=1}^{n}(\hat{y}^{(i)} - y^{(i)}) ^ 2
$$  
我們令 $e^{(i)} = \hat{y}^{(i)} - y^{(i)}, \mathbf{e} = \hat{\mathbf{y}} - \mathbf{y}$, 則:  
$$
\mathbf{e} = 
\begin{bmatrix}
\hat{y}^{(1)} - y^{(1)} \\
\hat{y}^{(2)} - y^{(2)} \\
\vdots \\
\hat{y}^{(n)} - y^{(n)} \\
\end{bmatrix}
$$
而 $\sum_{i=1}^{n}(e^{(i)})^2 = \mathbf{e}^T\mathbf{e}$ 則:  
$$
J_{MSE} = \frac{1}{n}\mathbf{e}^T\mathbf{e} = \frac{1}{n}(\hat{\mathbf{y}} - \mathbf{y})^T(\hat{\mathbf{y}} - \mathbf{y})
$$
Shape of $J_{MSE} = (1\times n)\times(n\times 1)=1\times 1$  
{% spoiler [為什麼 $\sum_{i=1}^{n}(e^{(i)})^2 = \mathbf{e}^{T}\mathbf{e}$ ?] %}
$$
\begin{align*}
\sum_{i=1}^{n}(e^{(i)})^2 &= \mathbf{e}^{T}\mathbf{e} \\
\because
\mathbf{e}^{T}\mathbf{e} &= 
\begin{bmatrix}e^{(1)}&e^{(2)}&\cdots&e^{(n)}\end{bmatrix}
\begin{bmatrix}e^{(1)}\\e^{(2)}\\\vdots\\e^{(n)}\end{bmatrix} \\
&= (e^{(1)})^2 + (e^{(2)})^2 + \cdots + (e^{(n)})^2 \\
&= \sum_{i=1}^{n}(e^{(i)})^2 \\
\therefore \sum_{i=1}^{n}(e^{(i)})^2 &= \mathbf{e}^{T}\mathbf{e} \\
\end{align*}
$$
{% endspoiler %}

### 多特徵多樣本的偏導
我們上面寫出了線性回歸的幾個矩陣形式:  
$$
\begin{align*}
\hat{\mathbf{y}} &= \tilde{\mathbf{X}}\tilde{\mathbf{w}} \\
J_{MSE} &= \frac{1}{n}(\hat{\mathbf{y}} - \mathbf{y})^T(\hat{\mathbf{y}} - \mathbf{y})
\end{align*}
$$  
接下來我們求偏導:  
$$
\begin{align*}
\text{Let }L^{(i)} &= \hat{y}^{(i)} - y^{(i)} \\
J_{MSE} &= \frac{1}{n}\sum_{i=1}^{n}(\hat{y}^{(i)} - y^{(i)})^2 \\
\dfrac{dJ_{MSE}}{d\tilde{\mathbf{w}}} &= \frac{1}{n}\sum_{i=1}^{n}\dfrac{d(L^{(i)})^2}{d\tilde{\mathbf{w}}}
\end{align*}
$$  
鏈式法則:  
$$
\dfrac{d(L^{(i)})^2}{d\tilde{\mathbf{w}}} = \dfrac{d(L^{(i)})^2}{dL^{(i)}}\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}}
$$
第一步求 $\dfrac{d(L^{(i)})^2}{dL^{(i)}}$:  
$$
\begin{align*}
\dfrac{d(L^{(i)})^2}{dL^{(i)}} &= 2L^{(i)} \\
&= 2(\hat{y}^{(i)} - y^{(i)})
\end{align*}
$$
接著求 $\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}}$:  
$$
\begin{align*}
\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} &= \dfrac{d(\hat{y}^{(i)} - y^{(i)})}{d\tilde{\mathbf{w}}} \\
&= \dfrac{d(\tilde{\mathbf{w}}^T\tilde{\mathbf{x}}^{(i)} - y^{(i)})}{d\tilde{\mathbf{w}}} \\
&= \tilde{\mathbf{x}}^{(i)} - 0 \\
&= \tilde{\mathbf{x}}^{(i)} \\
\end{align*}
$$
合併回鏈式法則:  
$$
\begin{align*}
\dfrac{d(L^{(i)})^2}{d\tilde{\mathbf{w}}} &= \dfrac{d(L^{(i)})^2}{dL^{(i)}}\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} \\
&= 2(\hat{y}^{(i)} - y^{(i)})\tilde{\mathbf{x}}^{(i)} \\
\end{align*}
$$
最後放回 $J_{MSE}$的微分式中並且轉為向量及矩陣形式:  
$$
\begin{align*}
\dfrac{dJ_{MSE}}{d\tilde{\mathbf{w}}} &= \frac{1}{n}\sum_{i=1}^{n}\dfrac{d(L^{(i)})^2}{d\tilde{\mathbf{w}}} \\
&= \frac{1}{n}\sum_{i=1}^{n}(2(\hat{y}^{(i)} - y^{(i)})\tilde{\mathbf{x}}^{(i)}) \\
&= \frac{2}{n}\sum_{i=1}^{n}(\hat{y}^{(i)} - y^{(i)})\tilde{\mathbf{x}}^{(i)} \\
\nabla_{\tilde{\mathbf{w}}}J_{MSE} &= \frac{2}{n}\tilde{\mathbf{X}}^{T}(\tilde{\mathbf{X}}\tilde{\mathbf{w}} - \mathbf{y}) \\
\end{align*}
$$  

## 邏輯回歸
### 矩陣形式
假設樣本數為 $n$, 特徵數為 $m$  
單樣本模型: $z^{(i)} = \tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}^{(i)}$  
Shape of $z^{(i)} = (1\times(m+1))\times((m+1)\times 1) = 1\times 1$  
Sigmoid函數: $\sigma(z^{(i)}) = p^{(i)} = \frac{1}{1 + e^{-z^{(i)}}}$  
Shape of $p^{(i)} = 1\times 1$

#### 矩陣形式的平均交叉熵誤差
計算所有樣本的平均交叉熵公式如下:  
$$
J_{MCE} = -\frac{1}{n}\sum_{i=1}^{n}[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})]
$$
針對 $y^{(i)}$ 與 $p^{(i)}$ 我們先寫作向量:  
$$
\mathbf{y} = \begin{bmatrix}y^{(1)} \\ y^{(2)} \\ \vdots \\ y^{(n)}\end{bmatrix}\quad
\mathbf{p} = \begin{bmatrix}p^{(1)} \\ p^{(2)} \\ \vdots \\ p^{(n)}\end{bmatrix} \\
$$
$\mathbf{p}, (1 - \mathbf{p})$ 向量中的每一個元素都取自然對數$\ln$:  
$$
\ln(\mathbf{p}) = \begin{bmatrix}\ln(p^{(1)}) \\ \ln(p^{(2)}) \\ \vdots \\ \ln(p^{(n)})\end{bmatrix}\quad
\ln(1 - \mathbf{p}) = \begin{bmatrix}\ln(1 - p^{(1)}) \\ \ln(1 - p^{(2)}) \\ \vdots \\ \ln(1- p^{(n)})\end{bmatrix}
$$
最後開始取代掉 $J_{MCE}$ 中的元素:  
$$
\begin{align*}
J_{MCE} &= -\frac{1}{n}\sum_{i=1}^{n}[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})] \\
&= -\frac{1}{n}[\sum_{i=1}^{n}y^{(i)}\ln(p^{(i)}) + \sum_{i=1}^{n}(1 - y^{(i)})\ln(1 - p^{(i)})] \\
&= -\frac{1}{n}[\mathbf{y}^{T}\ln(\mathbf{p}) + (1 - \mathbf{y})^{T}\ln(1 - \mathbf{p})] \\
\end{align*}
$$

### 多特徵多樣本的偏導
在這邊我們以單個樣本的方式來進行偏導數的推導，最後再合併所有樣本並且用向量或矩陣的形式來表達：  
這裏我們上面寫出了邏輯回歸的幾個向量形式:  
$$
\begin{align*}
z^{(i)} &= \tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}^{(i)} \\
p^{(i)} &= \sigma(z^{(i)}) = \frac{1}{1 + e^{-z^{(i)}}} \\
J_{MCE} &= -\frac{1}{n}\sum_{i=1}^{n}[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})] \\
\end{align*}
$$
接著我們開始求偏導:  
$$
\begin{align*}
\text{Let } L^{(i)} &= -[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})] \\
\dfrac{dJ_{MCE}}{d\tilde{\mathbf{w}}} &= \frac{1}{n}\dfrac{d}{d\tilde{\mathbf{w}}}\sum_{i=1}^{n}[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})] \\
&= \frac{1}{n}\sum_{i=1}^{n}\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} \\
\end{align*}
$$
套用鏈式法則: $\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} = \dfrac{dL^{(i)}}{dp^{(i)}}\dfrac{dp^{(i)}}{dz^{(i)}}\dfrac{dz^{(i)}}{d\tilde{\mathbf{w}}}$  
先求 $\dfrac{dL^{(i)}}{dp^{(i)}}$:  
$$
\begin{align*}
\dfrac{dL^{(i)}}{dp^{(i)}} &= \dfrac{d}{dp^{(i)}}[-(y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)}))] \\
&= -y^{(i)}\frac{1}{p^{(i)}} - (1 - y^{(i)})\frac{-1}{1 - p^{(i)}}\quad\because \dfrac{d}{dx}\ln(x) = \frac{1}{x}, \dfrac{d}{dx}\ln(1 - x) = \frac{-1}{1 - x} \\
&= \frac{-y^{(i)}}{p^{(i)}} + \frac{1-y^{(i)}}{1-p^{(i)}} \\
&= \frac{-y^{(i)} + y^{(i)}p^{(i)} + p^{(i)} - p^{(i)}y^{(i)}}{p^{(i)}(1-p^{(i)})} \\
&= \frac{p^{(i)} - y^{(i)}}{p^{(i)}(1-p^{(i)})} \\
\end{align*}
$$
  
第二步求 $\dfrac{dp^{(i)}}{dz^{(i)}}$:  
$$
\begin{align*}
p^{(i)} &= \sigma(z^{(i)}) = \frac{1}{1 + e^{-z^{(i)}}} = (1 + e^{-z^{(i)}})^{-1} \\
\text{Let } u &= 1 + e^{-z^{(i)}} \\
\dfrac{dp^{(i)}}{dz^{(i)}} &= \dfrac{dp^{(i)}}{du}\dfrac{du}{dz^{(i)}} \\
&= \dfrac{du^{-1}}{du}\dfrac{d(1 + e^{-z^{(i)}})}{dz^{(i)}} \\
&= -1u^{-2} \cdot (0 -e^{-z^{(i)}}) \\
&= \frac{-1}{u^2}\cdot -e^{-z^{(i)}} \\
&= \frac{e^{-z^{(i)}}}{(1 + e^{-z^{(i)}})^2} \\
&= \frac{1 \cdot e^{-z^{(i)}}}{(1 + e^{-z^{(i)}})(1 + e^{-z^{(i)}})} \\
&= p^{(i)}(1 - p^{(i)}) \\
\end{align*}
$$
  
{% spoiler [$(1-p^{(i)})$怎麼來的？] %}
$$
\begin{align*}
\frac{e^{-z^{(i)}}}{1 + e^{-z^{(i)}}} &= \frac{e^{-z^{(i)}} + 1 - 1}{1 + e^{-z^{(i)}}} \\
&= \frac{1 + e^{-z^{(i)}}}{1 + e^{-z^{(i)}}} - \frac{1}{1 + e^{-z^{(i)}}} \\
&= 1 - p^{(i)} \\
\end{align*}
$$
{% endspoiler %}
  
第三步求 $\dfrac{dz^{(i)}}{d\tilde{\mathbf{w}}}$:  
$$
\begin{align*}
\dfrac{dz^{(i)}}{d\tilde{\mathbf{w}}} &= \dfrac{d}{d\tilde{\mathbf{w}}}(\tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}^{(i)}) \\
&= \tilde{\mathbf{x}}^{(i)} \\
\end{align*}
$$
  
把三者合起來:  
$$
\begin{align*}
\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} &= \dfrac{dL^{(i)}}{dp^{(i)}}\dfrac{dp^{(i)}}{dz^{(i)}}\dfrac{dz^{(i)}}{d\tilde{\mathbf{w}}} \\
&= \frac{p^{(i)} - y^{(i)}}{p^{(i)}(1-p^{(i)})}\cdot p^{(i)}(1 - p^{(i)})\cdot \tilde{\mathbf{x}}^{(i)} \\
&= (p^{(i)} - y^{(i)})\cdot \tilde{\mathbf{x}}^{(i)} \\
\end{align*}
$$
最後放回 $J_{MCE}$的微分式中並且轉為向量及矩陣形式:  
$$
\begin{align*}
\dfrac{dJ_{MCE}}{d\tilde{\mathbf{w}}} &= \frac{1}{n}\sum_{i=1}^{n}\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} \\
&= \frac{1}{n}\sum_{i=1}^{n}(p^{(i)} - y^{(i)})\cdot \tilde{\mathbf{x}}^{(i)} \\
\nabla_{\tilde{\mathbf{w}}}J_{MCE} &= \frac{1}{n}\tilde{\mathbf{X}}^{T}(\mathbf{p} - \mathbf{y}) \\
\end{align*}
$$

## 梯度下降法
無論是線性回歸還是邏輯回歸，我們最終取得了損失函數的偏導數:  
$$
\begin{align*}
\nabla_{\tilde{\mathbf{w}}}J_{MSE} &= \frac{2}{n}\tilde{\mathbf{X}}^{T}(\tilde{\mathbf{X}}\tilde{\mathbf{w}} - \mathbf{y}) \\
\nabla_{\tilde{\mathbf{w}}}J_{MCE} &= \frac{1}{n}\tilde{\mathbf{X}}^{T}(\mathbf{p} - \mathbf{y}) \\
\end{align*}
$$
這些偏導數的目的是要逐步地修正向量 $\tilde{\mathbf{w}}$ 的值:  
線性回歸: $\tilde{\mathbf{w}} := \tilde{\mathbf{w}} - \alpha\nabla_{\tilde{\mathbf{w}}}J_{MSE}$  
邏輯回歸: $\tilde{\mathbf{w}} := \tilde{\mathbf{w}} - \alpha\nabla_{\tilde{\mathbf{w}}}J_{MCE}$  
其中 $\alpha$ 是學習率用以控制步長，在此不多贅述。  

## 結語
透過向量化和矩陣運算，我們將原本冗長的線性與邏輯迴歸公式，轉化為簡潔且高效的矩陣形式。  
這不僅大幅簡化了數學推導過程，也為多特徵、多樣本的機器學習模型提供了強大的計算基礎。  
從單一特徵的窘境到多維度的優雅表達，向量化是理解現代機器學習演算法不可或缺的關鍵一步。
