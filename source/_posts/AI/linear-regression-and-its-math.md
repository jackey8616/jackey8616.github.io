---
title: Linear Regression & its mathematic
date: 2025-10-03 21:21:56
tags:
  - AI
  - Machine Learning
  - Linear Regression
categories:
  - AI
  - Note
mathjax: true
---

簡單紀錄一下線性回歸跟一些數學。
<!-- More -->

## Linear Regression(線性回歸)
TL;DR：以一批資料，歸納出趨勢，使用這個趨勢用來預測，就是線性回歸分析。  

> 舉例：一萬筆廣告支出跟對應產品的銷售額關係。

回歸分析本質上是「建模(歸納出趨勢)」、「推論(使用趨勢來預測)」。  
以剛才的例子來看，模型可以告訴我們，每增加一塊錢，可以帶來多少銷售額的影響。  
下面會用最簡單的線性回歸來進行解釋。  

## 如何建模
1) 數學假設:建模的目的就是盡可能找出能夠貼近趨勢的方程式。  
    以單一特徵的線性回歸為例：  
    $$
    h(x) = w x + b
    $$
    我們還可以簡寫成:  
    $$
    \hat{y} = w x + b
    $$  
    其中 $x$ 是變數(例如廣告支出)， $\hat{y}$ 是預測值(預測會有多少銷售額)，  
    而 $w_1$(權重)以及 $b$(偏置項)則是模型需要學習並且最佳化的參數。
  
    這個建模的前提是，廣告支出與銷售額之間「的確」具備線性關係。  
    如此一來，建模才有成功的可能。

2) 損失函數(Loss Function):損失函數用來量化訓練過程中的誤差。  
    根據這個誤差，可以調整模型訓練(調整權重還有偏置項)的方向。  
    例如訓練資料中, $x = 1 時，y = 9$，  
    但是實際訓練出來的結果是$x = 1 時，\hat{y} = 7$，其中的 $2$ 就是誤差。  
  
    > 誤差 = 實際值 - 預測值  
    > 所以這邊的計算是 9 (Actual Value) - 7(Predicted Value) = Residual
  
    誤差本身是可以接受的，因為「沒有絕對完美」的模型。  
    但是一但誤差過大成為了離散值，該怎麼樣歸納這些誤差並且利用起來，就是這個損失函數所要使用的工具。常見的方法均方差(Mean Square Error, MSE)。
3) Optimizer(最佳化器):在訓練過程中逐步調整權重
    透過Loss Function所提供的數學工具，使用合理的Optimizing Strategy，以達到下次迭代改變參數的目的，  
    進一步得到最理想並且符合訓練資料的參數，作為模型的最終樣態。  

## Loss Function(損失函數)
MSE(Mean Square Error，均方差)：  
$J_\mathbf{MSE} = \frac1{m}\sum_{i=1}^{m} (y_{i} - \hat{y}_{i}) ^ 2$

Q: 為什麼MSE可以用來作為損失函數？  

> 我們希望可以找到一個函數，他可以計算整個訓練過程中的誤差，盡可能的讓誤差趨近於零，代表幾乎沒有錯誤。  

### 從圖表拆解MSE
<div id="mse" style="width: 100%; height: 500px;"></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var myChart = echarts.init(document.getElementById('mse'));
    
    // *** 高誤差的原始數據 (X: 时数, Y: 分数) ***
    var rawData = [
      [2, 50], [4, 65], [6, 50], [8, 90], [10, 75], [12, 160]
    ];

    // *** 最佳拟合回归函数 (假设: Y = 5X + 35) ***
    function predict(x) {
      return 5 * x + 35;
    }

    // --- 1. 计算残差线段数据 ---
    var residualData = rawData.map(function(item) {
      var x = item[0];
      var actualY = item[1];
      var predictedY = predict(x);
      
      // [x, 实际y, 预测y]
      return [x, actualY, predictedY];
    });
    
    // 2. 最佳拟合回歸線数据 (取范围端点)
    var regressionLineData = [
      [2, predict(2)],
      [12, predict(12)]
    ];

    var option = {
      backgroundColor: '#fff',
      legend: {
        data: ['原始數據', '回歸線', '誤差'],
        bottom: 0
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          if (params.seriesName === '原始數據') {
            const data = params.value;
            const predictedY = predict(data[0]);
            const residual = (data[1] - predictedY).toFixed(1);
            return `**学习时数:** ${data[0]}小时<br/>**实际分数:** ${data[1]}分<br/>**预测分数:** ${predictedY.toFixed(1)}分<br/>**残差 (誤差):** ${residual}分`;
          }
          return params.seriesName === '誤差' ? '' : params.name;
        }
      },
      xAxis: {
        type: 'value',
        name: '廣告成本(萬)',
        min: 0,
        max: 14,
        nameLocation: 'middle'
      },
      yAxis: {
        type: 'value',
        name: '銷售額成長(萬)',
        min: 30,
        max: 180,
        nameLocation: 'middle'
      },
      series: [
        // --- 1. 原始數據点 (散点图) ---
        {
          name: '原始數據',
          type: 'scatter', 
          data: rawData,
          symbolSize: 15,
          itemStyle: { color: '#007bff' }
        },
        // --- 2. 最佳拟合回歸線 ---
        {
          name: '回歸線',
          type: 'line', 
          data: regressionLineData,
          symbol: 'none',
          lineStyle: {
            color: 'red',
            width: 3,
            type: 'solid'
          }
        },
        // --- 3. 自定义系列：绘制残差线 (关键) ---
        {
          name: '誤差',
          type: 'custom',
          data: residualData,
          renderItem: function (params, api) {
            var xValue = api.value(0);
            
            // 将 (x, 实际y) 转换为屏幕坐标
            var pointActual = api.coord([xValue, api.value(1)]);
            // 将 (x, 预测y) 转换为屏幕坐标
            var pointPredicted = api.coord([xValue, api.value(2)]);

            // 绘制线段 (残差)
            return {
              type: 'line', 
              shape: {
                x1: pointActual[0], 
                y1: pointActual[1], 
                x2: pointPredicted[0], 
                y2: pointPredicted[1] 
              },
              style: api.style({
                // 根据残差的正负决定颜色，让效果更明显
                stroke: api.value(1) > api.value(2) ? 'green' : 'orange', 
                lineWidth: 2,
                lineDash: [4, 4] // 虚线
              })
            };
          }
        }
      ]
    };

    myChart.setOption(option);
  });
</script>

在圖表中可以看到：紅色線為某次訓練出的趨勢線，藍點表示實際資料( $x_i, y_i$ )，以x軸為變數，紅線上的每一個點就是該變數下的預測值( $\hat{y}$ )。  
這個例子我們有一些正誤差以及負誤差，訓練的目的是盡可能的減少這些誤差。  
其中 $\hat{y}_6$ (預測值)跟實際數據的誤差巨大，我們稱之為離群值(Outlier)，會對於回歸線的訓練產生衝擊。
  
以圖表為例由左至右，我們的誤差為：
$$
\begin{align*}
E_i &= y_i - \hat{y}_{i} \\
E_1 &= 50 - 45 = 5 \\
E_2 &= 65 - 55 = 10 \\
E_3 &= 50 - 65 = -15 \\
E_4 &= 90 - 75 = 25 \\
E_5 &= 75 - 85 = -10 \\
E_6 &= 160 - 95 = 65
\end{align*}
$$
如果要計算平均誤差的話，一般做法是總和取平均(算術平均數):  
$$
\frac{1}{m}\sum_{m=1}^{m} E_{i}
$$  
但是這個做法會有一個問題：  
正負誤差會相互抵銷，所以我們必須想辦法避免掉這個抵銷。  

### MAE vs MSE
在數學上，消除負號的方式不外乎兩種：取絕對值(Absolute)或者是平方(Square)。
$$
\begin{align*}
Mean Absolute Error, MAE &= \frac{1}{m}\sum_{m=1}^{m} \big|E_{i}\big| \\
Mean Square Error, MSE &= \frac{1}{m}\sum_{m=1}^{m} {E_{i}}^2
\end{align*}
$$
兩種方法，應該要用哪一種？  
這個問題我們先保留，後續再回答。  
在機器學習的應用數學上，沒有絕對的解，更多的是Trade-off。

## Optimizer(最佳化器)
最佳化的目的是在於逐步改變 $w$ 的數值，讓Loss Function的誤差越來越小，最好趨近於零。  
在機器學習的領域裡面，通常最佳化器指的會是梯度最佳化器(Gradient-based optimizers)，  
還有其他的最佳化策略，但是在這邊我們先不談論。  

### Gradient Descent(梯度下降)
梯度的本質就是函數的導數(Derivative)，它指向了當前位置增長最快的方向(上坡最陡峭)；  
為了方便討論，接下來我會把預測函數 $\hat{y}_i$ 簡化，以單特徵的方式探討梯度下降的數學原理。  

> 令 $b = 0$ 的做法，在此只是方便我們以單特徵的方式探討，實務上幾乎不會有這麼理想的狀況。
> $b != 0$ 在此會讓梯度下降的公式需要針對兩個特徵進行偏微分，會讓整篇文章過於複雜，所以在此簡略帶過。

$$
\begin{align*}
\because Let\space b &= 0 \\
\therefore \hat{y}_i &= wx + 0 \\
&= wx
\end{align*}
$$
這樣子就只需要討論特徵 $w$ 即可。  

<div id="jw_curve" style="width: 100%; height: 500px;"></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var myChart = echarts.init(document.getElementById('jw_curve'));

    var rawData = [
      [2, 50], [4, 65], [6, 50], [8, 90], [10, 75], [12, 160]
    ];

    function mse(w) {
      let sum = 0;
      for(let i = 0; i < rawData.length; i++) {
        sum += (rawData[i][1] - w * rawData[i][0]) ** 2;
      }
      return sum / rawData.length;
    }

    function errorData() {
      let data = [];
      for (let i = -10; i <= 30; i += 0.1) {
        data.push([i, mse(i)]);
      }
      return data;
    }

    var option = {
      backgroundColor: '#fff',
      xAxis: {
        type: 'value',
        name: 'W 權重'
      },
      yAxis: {
        type: 'value',
        name: 'J(w) 誤差'
      },
      tooltip: {
        trigger: 'axis',
      },
      series: [
        {
          name: '誤差值',
          type: 'line',
          data: errorData(),
          showSymbol: false,
          clip: true,
          itemStyle: { color: '#007bff' }
        }
      ],
    };

    myChart.setOption(option);
  });
</script>

如圖，這個是 $w$ 權重跟 $J(w)$ 之間的關係。  
這一張是我故意窮舉了 $w$ 的可能性所畫出來的圖，實際訓練的時候，會更像是盲人摸象的去試驗每一個點( $w$ )的值。

圖中可以看到，在 $w = [11.1, 11.2]$ 的這個區間，我們可以找到 $J(w)$ 最小的值。  
在數學上，這個找函數最小值的方法，跟斜率有關係。  

#### 斜率 & 微分
透過計算曲線上的兩個點之間，y座標的偏移量，可以得出兩點之間的斜率(趨勢)。  
以 $w_{best}$ 為例，$J(w)$最趨近於0(或是整個圖形的最小值)的 $w$ 即為 $w_{best}$：
$$
\begin{align*}
J(11.1) &= 581.4066 \\
J(11.2) &= 581.693 \\
m &= (581.693 - 581.4066) / (11.2 - 11.1) \\
&= 0.2864 / 0.1 \\
&= 0.02864
\end{align*}
$$

這個斜率的工具，可以幫助我們在已知數個點的狀況之下，得出我們應該要「增加/減少」$w$ 的值以達到最小 $J(w)$ 的目的。  
無論得到的斜率是正還是負，都代表我們需要反向修正，進而嘗試得到斜率為零的 $w$ 值。  
  
在數學上，針對一個平滑的函數圖形，找出任意點的斜率，我們會使用微分。  
$$
\begin{align*}
Let\space u &= (y_i - wx_i), f(u) = u ^ 2 \\
J(w) &= \frac{1}{m}\sum_{i=1}^{m}f(u) \\
\dfrac{dJ}{dw} &= \frac{1}{m}\sum_{i=1}^{m}\dfrac{df}{dw} \\
\because \dfrac{df}{dw} &= \dfrac{df}{du} \times \dfrac{du}{dw} \\
&= 2u \times \dfrac{d}{dw}(y_i - wx_i) \\
&= 2u \times (0 - x_i) \\
&= 2(y_i - wx_i) \times -x_i \\
\therefore \dfrac{dJ}{dw} &= \frac{1}{m}\sum_{i=1}^{m}2(y_i - wx_i)(-x_i) \\
&= \frac{2}{m}\sum_{i=1}^{m}(- y_i + wx_i)(x_i) \\
&= \frac{2}{m}\sum_{i=1}^{m}(wx_i - y_i)(x_i) \\
\because \hat{y}_i &= wx_i \\
\therefore \dfrac{dJ}{dw} &= \frac{2}{m}\sum_{i=1}^{m}(\hat{y}_i - y_i)x_i \\
\end{align*} 
$$
至此，我們找到了Loss Function所能夠為我們進行 $w$ 參數修正的依據工具：梯度公式。  

#### 最佳化迭代規則
透過梯度公式：$\dfrac{dJ}{dw} = \frac{2}{m}\sum_{i=1}^{m}(\hat{y}_i - y_i)x_i$  
我們可以得到最佳化器的迭代規則：$w_{new} = w_{old} - \alpha \cdot \dfrac{dJ}{dw}$  

其中 $\alpha$ 是一個放大參數，可以控制學習速度以及收斂(convergence)的穩定性。  

- $\alpha$ 過大：Over-shooting:  
    這會導致模型訓練的結果在谷底反覆橫跳，始終無法收斂。  
- $\alpha$ 過小：Slow Convergence:  
    Optimizer會以極慢的速度逐步找到最佳的 $w$ ，但是這個過程會花較長的訓練時間。  

在實際的訓練當中， $\alpha$ 被稱為 超參數(Hyperparameter)，在模型開始訓練前手動設定以及調整。  
我們不會在這裡多講 $\alpha$ ，因為涉及了更深入的理論，在此處暫時不提。  

最佳化器在無數次的訓練中(我們稱爲epochs)， $w$ 會隨著曲面下降最快的方向移動。  
最終會讓 $J(w)$ 的值趨於穩定，我們稱為收斂(Convergence)，此時的 $w$ 即為 $w_{best}$。  
則：

$$
\hat{y} = w_{best}x
$$

### 除了梯度下降？
在數學上還有可以透過正則方程(Normal Equation)一次性計算出 $w_{best}$ 的閉式解，  
像是OLS(Ordinary least squares)，但是在機器學習領域，如此理想的環境幾乎不存在，  
所以文內沒有多用篇幅描述這類型的解法。  

## 所以 MAE or MSE?
在本質上MAE跟MSE都是收集錯誤的方法，並沒有分對錯；  
更多的只是訓練資料的特性，還有期望模型的表現。  

MAE本身，因為絕對值的緣故其所畫出來的圖形是不平滑但連續，  
這樣的圖形是沒有辦法直接用微分的數學工具，直接讓Optimizer的迭代規則所使用。  
必須要使用次梯度法(Subgradient)來處理MAE圖形中的不可微分點。  
實務上會再需要做進一步的數學處理，這邊礙於篇幅以及細節複雜，就不多贅述了。  

## 寫在最後
這邊文章只是單純以機器學習中最簡單的線性回歸搭配MSE來探討其背後的數學原理。  
機器學習的世界還很廣闊，以準備AWS AI Practitioner(AIF-C01)為契機，剛好來釐清以前不太懂的部分(還有撿回三修死當的微積分Orz)...  
