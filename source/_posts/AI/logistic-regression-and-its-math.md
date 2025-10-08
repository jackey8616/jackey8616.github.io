---
title: Logistic Regression & its mathematic
date: 2025-10-07 15:32:20
categories: AI
tags:
  - AI
  - Machine Learning
  - Regression Analysis
  - Logistic Regression
mathjax: true
---

This time lets talk about Logistic Regression.  
Need readers with some concept of natural logarithm.  
{% post_link AI/logistic-regression-and-its-math-zhTW '>> [zhTW version] <<' %}  
<!-- More -->

## Logistic Regression
TL;DR: A data classification based on linear regression.  

> For example: a classification with thousand mails, classified whether junk or not junk mail.  

Essence of logistic regression is also another kind of linear model.  
Despite with finding relationships between input feature(x) and output value(y) in linear regression, logistic regression is trying to find a equation that can be the boundary of categories of data.

## Mathematical assumption
Despites to the assumption in linear regression:
$$
\hat{y} = wx + b
$$
$\hat{y}$ and $x$ are the data point actually locate in a 2-dimension coordinate system.  
But logistic regression can choose how many features to use as parameter, same example in 2-dimension coordinate system:  
$$
z = w_1x_1 + w_2x_2 + b
$$
$x_1$ and $x_2$ represents the 2 axis in 2-dimension, we will take this assumption to keep on derivation.  

### Definition of linear algebra
$$
z = w_1x_1 + w_2x_2 + b
$$
The equation is actually a linear algebra, it means the calculation which considered all the variables ($x_1, x_2$), parameters($w_1, w_2$) and bias $b$, this calculation eventually get returns a score.
The score decides $x_1, x_2$ is whether A or B category(Because its binary classification).  
In this equation, each of $w, x ,b$ are all natural number, thus the score $z$ will be in the interval of $(-\infty, \infty)$ 。  

> Which can also represents like: $z \in (-\infty, \infty)$  

### Possibility
Let's forget about the linear algebra stuff first, back to the essences of binary classification, our goal eventually wants to calculate the possibility of a data point is in category.
When it comes to possibility, the most direct understanding of it should the range of possibility, which is $P \in [0, 1]$.  

If we want to find a mapping between possibility and equation of linear algebra, these two interval is unable to mapping each other.  

#### Odds
Here comes the concept of Odds, the definition of Odds is slightly different to Possibility: the ratio of the possibility of event happened or not happened, is Odds.  
Assume the possibility of a event happened is $P$:
$$
Odds = \frac{P}{1-P}
$$

For example: from Possibility to Odds
If the possibility to pass the exam  $P = 0.9  (90\%)$

- P of happened $0.9$
- P of not happened $1 - 0.9 = 0.1$
- Odds would be $\frac{0.9}{0.1} = 9$

the meaning of 9 is the ratio of the probability of a student passing to the probability of them failing is nine to one.  
Normally we write it $9:1$.  

We can tell the range of Odds is:
$$
Odds \in [0, \infty)
$$
The range can expends to $\infty$ in positive direction, it can mapping half of the range with linear algebra.  
Nex step is to find a way to mapping $-\infty$.  

#### Log-Odds
As we known from above, the range of Odds is $[0, \infty)$, when $P$ is much more big, the Odds will more close to $\infty$ but not $\infty$, otherwise it will more small, and infinitely close to zero but not zero.  
Thus the question become: how do we use a equation to mapping the input which close to zero into a smaller enough negative natural number, even close to negative infinity.  

There is a cool mathematic tool call natural logarithm: $\ln(x) = log_e{x}$  
We can recall from logarithm:  
$$
\begin{align*}
log_{2}2 &= log_{2}{2 ^ 1} = 1 \\
log_{2}4 &= log_{2}{2 ^ 2} = 2 \\
log_{3}9 &= log_{3}{3 ^ 2} = 2 \\
log_{3}81 &= log_{3}{3 ^ 4} = 4 \\
\end{align*}
$$
Then this natural logarithm:  
$$
\begin{align*}
\ln(x) &= log_{e}x \\
\text{Let } log_{e}x &= y \\
\text{Then } e^y &= x \\
\end{align*}
$$
For example, $\ln(1)$:  
$$
\begin{align*}
log_{e}1 &= y \\
e^y &= 1 \\
y &= 0
\end{align*}
$$
What if a number smaller then 1? $\ln(0.5)? \ln(0.1)?$:  
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
In the interval of $0 < x < 1$ we can find out, if we put it into a natural logarithm, the return value would be a negative natural number.  
And when the value of $x$ getting closer to 0, the return value would be more and more small, and closed to negative infinity eventually.  

Lets apply this into Odds:  
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

### Sigmoid
Eventually, we found the Log-Odds, and it also been known as Sigmoid.  
As we derivate all the way to here, we are trying to find in probability theory for method which can a mapping the interval of $(-\infty, \infty)$ .  
After Odds expends to $[0, \infty)$ via Log-Odds $(-\infty, \infty)$, this is all what we got.  

We use $\sigma(z)$ to presents:  
$$
\sigma(z) = \frac{e^z}{1 + e^z}
$$  
Next we will simplify to common form of Sigmoid(Not necessary to do it):  
$$
\begin{align*}
P = \sigma(z) &= \frac{e^z}{1 + e^z} \\
&= \frac{\frac{e^z}{e^z}}{\frac{1}{e^z} + \frac{e^z}{e^z}} \\
&= \frac{1}{1 + e^{-z}} \quad \because \frac{1}{e^z} = e^{-z}
\end{align*}
$$

The purpose of this function is to mapping the range of linear functions $z = w_1x_1 + w_2x_2 + b$ to the range of possibility $[0, 1]$ .  

## Decision Boundary
After we found a tool(Sigmoid) helping us calculates possibility, back to our goal is classification.  
The linear function $z$ can help us define a boundary in order to find the zone of the binary categories; hence on this line, the possibility of category A or B are the same(50%), which means $P = 50\% = 0.5$ .

> In other words, when $P > 0.5$ , recognize it to be A; otherwise $P < 0.5$ will be B.

Hence:  
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

When $P=0.5, z = 0, then $z = w_1x_1 + w_2x_2 + b = 0$  
This equation represents the decision boundary in the coordinate system, on the two sides of this line will be categorize to A or B.  
The next question is: based on the actual training data, the parameter $w_1, w_2, b$ in the equation is meets the actual category(actual value),   
We need to train through machine learning.  

## Loss Function
Same as linear regression, we need to find a mathematic tool to aggregate the error which calculated from the after-training prediction and the in-data set actual value, in order to be the reference in optimizing strategy.  
In the logistic regression of binary classification, the meaning of error is "If a data is category A, but been classified as B", this kind of error need to be review by each data in the training set.  
  
So we need to find a tool can help us compare the difference between predict value and actual value:  

### Cross-Entropy loss function
If $y$ is actual label(result of classification,$0 or 1$, 0 represents category A, 1 represents category B), $p$ is predict possibility.  
We need to find a method which returns error when actual value is 0, but predict value gives 1; and same as opposite; but if each of actual value and predict value is the same, returns nothing.  

In other word:  
$$
\begin{align*}
y = 1, p = 0, \quad \text{error!} \\
y = 0, p = 1, \quad \text{error!} \\
y = 1, p = 1, \quad \text{good!} \\
y = 0, p = 0, \quad \text{good!}
\end{align*}
$$
Same as $p \in [0, 1]$:  
$$
\begin{align*}
y = 1, p &= 0.1, \quad \text{big big error!} \\
y = 1, p &= 0.3, \quad \text{minor error!} \\
y = 1, p &= 0.9, \quad \text{good!} \\
\end{align*}
$$
We also needs to based on the level, returns different error.  
Below we will use natural logarithm as our mathematic tool again.

#### Natural Logarithm
As the derivation above, if a number locates in the interval of  $[0, 1]$, given by a natural logarithm,  
we will get a negative number, if the number closer the $0$, the return value of $\ln$ will more close to $-\infty$.  

If we put possibility into natural logarithm, we can get two kinds of error:  
$$
\begin{align*}
\ln(p) &=> when y = 1, but p = 0.1 \\
\ln(1 - p) &=> when y = 0, but p = 1 \\
\end{align*}
$$
These two error needs to be apply in different situation, hence we need to times a parameter:  
$$
\begin{align*}
y\ln(p) &=> when y = 1, but p = 0.1 \\
(1-y)\ln(1 - p) &=> when y = 0, but p = 1 \\
\end{align*}
$$
In this way, these error will be cancel in opposite actual value, then we can merge these errors:  
$$[y\ln(p) + (1-y)\ln(1-p)]$$  
These errors are the summation of mapping of natural logarithm to negative number, the value more close to zero, the mapping will more close to negative infinity.  
With the filter by the parameter(actual value), negative sign is still exists, this will cause misleading with the meaning.  
By multiple with $-1$ ,we can flip the meaning of negative, let the whole equation presents bigger error when the mapping value is more close to negative infinity:  
$$
L(y, p) = - [y\ln(p) + (1-y)\ln(1-p)]
$$
This is the cross-entropy loss function.

### Average Cross-Entropy Loss
We can calculates the error of a single data point by cross-entropy loss function:  
$$
L(y_i, p_i) = -[y_i\ln(p_i) + (1 - y_i)\ln(1-p_i)]
$$
Next we are going to calculates the whole error of the data set and these error evenly spread in whole set:
$$
\begin{align*}
Loss &= \frac{1}{N}\sum_{i=1}^{N}-[y_i\ln(p_i) + (1 - y_i)\ln(1-p_i)] \\
&= - \frac{1}{N}\sum_{i=1}^{N}[y_i\ln(p_i) + (1 - y_i)\ln(1-p_i)]
\end{align*}
$$

By getting this Loss function, we are able to know the offset(error) after each training.  
Next is to find a enhance method then we are good to go to apply in our optimizing strategy.  

## Optimizer
The loss function:  
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
        text: 'Curve of average cross entropy in different parameter w'
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

With single feature, the chart will look like above;  
This is the average cross entropy loss when putting different $w$ into linear algebra.  
Basically finding $w$ is exact the same process like training.  

In order to find the best $w$ letting us get the lowest error, we will gradually use differentiation to find the slope to do so.  
{% post_link AI/linear-regression-and-its-math#gradient-descent '>> [Why using differentiation?] <<' %}  

### Expands the Loss Function
The chart is just a schematic chart, it doesn't meats with our assumption.  
Because we have three features $w_1, w_2, b$ in our assumption, next we will differentiation of these parameters.  
First we are going to expands the loss function:
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
Then we can move on with differentiation.  

### Parameter $w_1$:
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

### Parameter $w_2$:
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

### Parameter $b$:
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

### All the derivative and gradient descent
From the equation $\text{(10), (13),(16)}$ above, we can get three derivative:  
$$
\begin{align*}
\dfrac{dJ}{dw_1} &= \frac{1}{N}\sum_{i=1}^{N}[(\sigma(z_i) - y_i)x_{i1}] \tag{10} \\
\dfrac{dJ}{dw_2} &= \frac{1}{N}\sum_{i=1}^{N}[(\sigma(z_i) - y_i)x_{i2}] \tag{13} \\
\dfrac{dJ}{db} &= \frac{1}{N}\sum_{i=1}^{N}(\sigma(z_i) - y_i) \tag{16} \\
\end{align*}
$$
Put it into gradient descent equation:  
$$
\begin{align*}
\text{Base on (10), (13), (16)} &=> \\
w_{1new} &= w_{1old} - \alpha (\frac{1}{N}\sum_{i=1}^{N}[(\sigma(z_i) - y_i)x_{i1}]) \\
w_{2new} &= w_{2old} - \alpha (\frac{1}{N}\sum_{i=1}^{N}[(\sigma(z_i) - y_i)x_{i2}]) \\
b_{new} &= b_{old} - \alpha (\frac{1}{N}\sum_{i=1}^{N}(\sigma(z_i) - y_i)) \\
\end{align*}
$$

We can tell from the above equation:

> $\sigma(z) - y_i$ represents the error of each predict possibility and actual label in training set.  
> With $\frac{1}{N}\sum_{i=1}^{N}$ , it becomes average error.  
> Interesting thing is: each weight($w$) are all effected by the product of feature itself and error and the average.  
> And the gradient of bias($b$) itself is always 1, so it only effected by the average error of whole sample.  

After the long derivate and simplification, the final gradient descent equation looks quite elegant, TBH xd.  

## Last
Its much more longer derivation then I expect.  
Even though it skip the vector presentation in multi-feature already, but it still struggle for me to derivate three features.  
In order to link the linear algebra and possibility theory, I spent a lot of effort in derivation.  
I will consider writing something like vector presentation in multi-feature or expand the concept of logistic regression into neural networking and its derivation, then we should encounter discrete mathematics Orz.  
