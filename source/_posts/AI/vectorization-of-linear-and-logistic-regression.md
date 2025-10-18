---
title: 'Vectorization of Linear and Logistic Regression'
date: 2025-10-09 19:37:23
categories: AI
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

Vectorized Derivations of Linear and Logistic Regression
{% post_link AI/vectorization-of-linear-and-logistic-regression-zhTW '>> [zhTW version] <<' %}  
<!-- More -->

## The Predicament of a Single Feature
In previous articles ({% post_link AI/linear-regression-and-its-math-zhTW '[Linear Regression]' %}, {% post_link AI/logistic-regression-and-its-math-zhTW '[Logistic Regression]' %}), we used a lot of mathematical derivations. However, for the convenience of discussing mathematical principles, we adopted simpler assumptions of single or double features:

$$
\begin{align*}
y &= wx + b \\
z &= w_1x_1 + w_2x_2 + b \\
\end{align*}
$$

In practical scenarios, such assumptions are almost impossible to apply.

> For example, housing prices (y) are influenced by factors such as area (x1), floor (x2), orientation (x3), etc.

Once we have multiple features, the formula becomes a lengthy summation:

$$
\begin{align*}
y &= w_1x_1 + w_2x_2 + w_3x_3 + ... + w_mx_m + b \\
\end{align*}
$$
Such an equation is not only difficult to handle but also affects computational efficiency.
To facilitate calculations, it is necessary to introduce tools from linear algebra: vectors and matrices.

## Vectorization
Let's take the following equation as an example:
$$
\begin{align*}
y &= w_1x_1 + w_2x_2 + w_3x_3 + ... + w_mx_m + b \tag{1} \\
\end{align*}
$$

### Feature Vector x & Weight Vector w
We pack all features and weights into separate column vectors:
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
In equation $\text{(1)}$, after replacing with vectors, there is still a bias term $b$. To make the overall operation more concise, we also include the bias term in the vector.
This extended vector is called an Augmented Vector:
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
In vector dot product, we transpose one of the vectors (column to row vector) to satisfy the conditions for matrix multiplication:
$$
\tilde{\mathbf{w}}^{T} = 
\begin{bmatrix}
b & w_1 & w_2 & \cdots & w_m
\end{bmatrix}
$$

### Vector Dot Product
According to the algebraic definition of vector dot product:
$$
\begin{align*}
\vec{a} &= [a_1, a_2, \dots, a_n] \\
\vec{b} &= [b_1, b_2, \dots, b_n] \\
\vec{a} \cdot \vec{b} &= \sum_{i=1}^{n}a_ib_i = a_1b_1 + a_2b_2 + \dots + a_nb_n \\
\end{align*}
$$
Which can also be expressed as w transpose times x (w transpose x): $\mathbf{w}^{T}\mathbf{x}$
Therefore:
$$
\mathbf{w}^{T}\mathbf{x} = w_1x_1 + w_2x_2 + ... + w_mx_m
$$
Applying $\tilde{\mathbf{x}}$, $\tilde{\mathbf{w}}$:
$$
\begin{align*}
\hat{y} &= b\cdot 1 + w_1\cdot x_1 + \cdots + w_m\cdot x_m \\
&= \tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}
\end{align*}
$$

## Linear Regression
### Matrix Form
Assume the number of samples is $n$, and the number of features is $m$.
Single sample model: $\hat{y}^{(i)} = \tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}^{(i)}$
Shape of $\hat{y}^{(i)} = (1\times(m+1))\times((m+1)\times 1) = 1\times 1$

#### Expansion of Feature Matrix (X)
In the augmented data, each sample contains independent variables for each feature, which we represent with a $\tilde{\mathbf{x}}$ vector:
$$
\tilde{\mathbf{x}} =
\begin{bmatrix}1 \\ x_1 \\ x_2 \\ \cdots \\ x_m\end{bmatrix}
$$
When we have one sample, its first feature is expressed as $x_1$.
The second is expressed as $x_2$, and so on, up to $x_m$.
The size of the entire vector $\tilde{\mathbf{x}}$ will be $((m + 1)\times 1)$.
Next, we need to stack these vectors vertically. However, vectors of size $((m + 1)\times 1)$ cannot be stacked vertically as rows.
So, we transpose each vector $\tilde{\mathbf{x}}$ for stacking:
$$
\tilde{\mathbf{X}} = 
\begin{bmatrix}
(\tilde{\mathbf{x}}^{(1)})^T \\
(\tilde{\mathbf{x}}^{(2)})^T \\
\vdots \\
(\tilde{\mathbf{x}}^{(n)})^T \\
\end{bmatrix}
$$
Finally, expanding the matrix:
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

#### Prediction Vector ($\hat{\mathbf{y}}$)
Each vector $\tilde{\mathbf{x}}^{(i)}$ will have a corresponding predicted value $\hat{y}^{(i)}$.
Stacking all these predicted values together forms $\hat{\mathbf{y}}$:
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

#### Actual Output Vector ($\mathbf{y}$)
The corresponding true outputs can also be stacked into a vector:
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

#### Model Prediction in Matrix Form
Next, we define the model in matrix form:
$$
\hat{\mathbf{y}} = \tilde{\mathbf{X}}\tilde{\mathbf{w}}
$$
Shape of $\hat{\mathbf{y}} = (n\times (m + 1))\times((m + 1)\times 1) = (n\times 1)$  

#### Mean Squared Error in Matrix Form
The formula for calculating the Mean Squared Error (MSE) for all samples is as follows:
$$
J_{MSE} = \frac{1}{n}\sum_{i=1}^{n}(\hat{y}^{(i)} - y^{(i)}) ^ 2
$$
Let $e^{(i)} = \hat{y}^{(i)} - y^{(i)}$ and the error vector $\mathbf{e} = \hat{\mathbf{y}} - \mathbf{y}$, then:
$$
\mathbf{e} = 
\begin{bmatrix}
\hat{y}^{(1)} - y^{(1)} \\
\hat{y}^{(2)} - y^{(2)} \\
\vdots \\
\hat{y}^{(n)} - y^{(n)} \\
\end{bmatrix}
$$
And since $\sum_{i=1}^{n}(e^{(i)})^2 = \mathbf{e}^T\mathbf{e}$, then:
$$
J_{MSE} = \frac{1}{n}\mathbf{e}^T\mathbf{e} = \frac{1}{n}(\hat{\mathbf{y}} - \mathbf{y})^T(\hat{\mathbf{y}} - \mathbf{y})
$$
Shape of $J_{MSE} = (1\times n)\times(n\times 1)=1\times 1$  
{% spoiler [Why does $\sum_{i=1}^{n}(e^{(i)})^2 = \mathbf{e}^{T}\mathbf{e}$?] %}
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

### Partial Derivatives for Multiple Features and Samples
We have written out several matrix forms for linear regression above:
$$
\begin{align*}
\hat{\mathbf{y}} &= \tilde{\mathbf{X}}\tilde{\mathbf{w}} \\
J_{MSE} &= \frac{1}{n}(\hat{\mathbf{y}} - \mathbf{y})^T(\hat{\mathbf{y}} - \mathbf{y})
\end{align*}
$$
Next, let's find the partial derivatives:
$$
\begin{align*}
\text{Let }L^{(i)} &= \hat{y}^{(i)} - y^{(i)} \\
J_{MSE} &= \frac{1}{n}\sum_{i=1}^{n}(\hat{y}^{(i)} - y^{(i)})^2 \\
\dfrac{dJ_{MSE}}{d\tilde{\mathbf{w}}} &= \frac{1}{n}\sum_{i=1}^{n}\dfrac{d(L^{(i)})^2}{d\tilde{\mathbf{w}}}
\end{align*}
$$
Chain Rule:
$$
\dfrac{d(L^{(i)})^2}{d\tilde{\mathbf{w}}} = \dfrac{d(L^{(i)})^2}{dL^{(i)}}\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}}
$$
First step, find $\dfrac{d(L^{(i)})^2}{dL^{(i)}}$:
$$
\begin{align*}
\dfrac{d(L^{(i)})^2}{dL^{(i)}} &= 2L^{(i)} \\
&= 2(\hat{y}^{(i)} - y^{(i)})
\end{align*}
$$
Next, find $\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}}$:
$$
\begin{align*}
\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} &= \dfrac{d(\hat{y}^{(i)} - y^{(i)})}{d\tilde{\mathbf{w}}} \\
&= \dfrac{d(\tilde{\mathbf{w}}^T\tilde{\mathbf{x}}^{(i)} - y^{(i)})}{d\tilde{\mathbf{w}}} \\
&= \tilde{\mathbf{x}}^{(i)} - 0 \\
&= \tilde{\mathbf{x}}^{(i)} \\
\end{align*}
$$
Combine back into the chain rule:
$$
\begin{align*}
\dfrac{d(L^{(i)})^2}{d\tilde{\mathbf{w}}} &= \dfrac{d(L^{(i)})^2}{dL^{(i)}}\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} \\
&= 2(\hat{y}^{(i)} - y^{(i)})\tilde{\mathbf{x}}^{(i)}
\end{align*}
$$
Finally, substitute back into the derivative of $J_{MSE}$ and convert to vector and matrix form:
$$
\begin{align*}
\dfrac{dJ_{MSE}}{d\tilde{\mathbf{w}}} &= \frac{1}{n}\sum_{i=1}^{n}\dfrac{d(L^{(i)})^2}{d\tilde{\mathbf{w}}} \\
&= \frac{1}{n}\sum_{i=1}^{n}(2(\hat{y}^{(i)} - y^{(i)})\tilde{\mathbf{x}}^{(i)}) \\
&= \frac{2}{n}\sum_{i=1}^{n}(\hat{y}^{(i)} - y^{(i)})\tilde{\mathbf{x}}^{(i)} \\
\nabla{\tilde{\mathbf{w}}}J_{MSE} &= \frac{2}{n}\tilde{\mathbf{X}}^{T}(\tilde{\mathbf{X}}\tilde{\mathbf{w}} - \mathbf{y}) \\
\end{align*}
$$

## Logistic Regression
### Matrix Form
Assume the number of samples is $n$, and the number of features is $m$.
Single sample model: $z^{(i)} = \tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}^{(i)}$
Shape of $z^{(i)} = (1\times(m+1))\times((m+1)\times 1) = 1\times 1$  
Sigmoid function: $\sigma(z^{(i)}) = p^{(i)} = \frac{1}{1 + e^{-z^{(i)}}}$
Shape of $p^{(i)} = 1\times 1$

#### Mean Cross-Entropy Error in Matrix Form
The formula for calculating the Mean Cross-Entropy (MCE) for all samples is as follows:
$$
J_{MCE} = -\frac{1}{n}\sum_{i=1}^{n}[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})]
$$
For $y^{(i)}$ and $p^{(i)}$, we first write them as vectors:
$$
\mathbf{y} = \begin{bmatrix}y^{(1)} \\ y^{(2)} \\ \vdots \\ y^{(n)}\end{bmatrix}\quad
\mathbf{p} = \begin{bmatrix}p^{(1)} \\ p^{(2)} \\ \vdots \\ p^{(n)}\end{bmatrix} \\
$$
Take the natural logarithm $\ln$ of each element in the vectors $\mathbf{p}$ and $(1 - \mathbf{p})$:
$$
\ln(\mathbf{p}) = \begin{bmatrix}\ln(p^{(1)}) \\ \ln(p^{(2)}) \\ \vdots \\ \ln(p^{(n)})\end{bmatrix}\quad
\ln(1 - \mathbf{p}) = \begin{bmatrix}\ln(1 - p^{(1)}) \\ \ln(1 - p^{(2)}) \\ \vdots \\ \ln(1- p^{(n)})\end{bmatrix}
$$
Finally, start substituting the elements in $J_{MCE}$:
$$
\begin{align*}
J_{MCE} &= -\frac{1}{n}\sum_{i=1}^{n}[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})] \\
&= -\frac{1}{n}[\sum_{i=1}^{n}y^{(i)}\ln(p^{(i)}) + \sum_{i=1}^{n}(1 - y^{(i)})\ln(1 - p^{(i)})] \\
&= -\frac{1}{n}[\mathbf{y}^{T}\ln(\mathbf{p}) + (1 - \mathbf{y})^{T}\ln(1 - \mathbf{p})]
\end{align*}
$$

### Partial Derivatives for Multiple Features and Samples
Here, we will derive the partial derivatives for a single sample and then combine them for all samples, expressing the result in vector or matrix form.
Above, we wrote out several vector forms for logistic regression:
$$
\begin{align*}
z^{(i)} &= \tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}^{(i)} \\
p^{(i)} &= \sigma(z^{(i)}) = \frac{1}{1 + e^{-z^{(i)}}} \\
J_{MCE} &= -\frac{1}{n}\sum_{i=1}^{n}[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})] \\
\end{align*}
$$
Next, we start finding the partial derivatives:
$$
\begin{align*}
\text{Let } L^{(i)} &= -[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})] \\
\dfrac{dJ_{MCE}}{d\tilde{\mathbf{w}}} &= \frac{1}{n}\dfrac{d}{d\tilde{\mathbf{w}}}\sum_{i=1}^{n}[y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)})] \\
&= \frac{1}{n}\sum_{i=1}^{n}\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}}
\end{align*}
$$
Apply the chain rule: $\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} = \dfrac{dL^{(i)}}{dp^{(i)}}\dfrac{dp^{(i)}}{dz^{(i)}}\dfrac{dz^{(i)}}{d\tilde{\mathbf{w}}}$  
First, find $\dfrac{dL^{(i)}}{dp^{(i)}}$:
$$
\begin{align*}
\dfrac{dL^{(i)}}{dp^{(i)}} &= \dfrac{d}{dp^{(i)}}[-(y^{(i)}\ln(p^{(i)}) + (1 - y^{(i)})\ln(1 - p^{(i)}))] \\
&= -y^{(i)}\frac{1}{p^{(i)}} - (1 - y^{(i)})\frac{-1}{1 - p^{(i)}}\quad\because \frac{d}{dx}\ln(x) = \frac{1}{x}, \frac{d}{dx}\ln(1 - x) = \frac{-1}{1 - x} \\
&= \frac{-y^{(i)}}{p^{(i)}} + \frac{1-y^{(i)}}{1-p^{(i)}} \\
&= \frac{-y^{(i)} + y^{(i)}p^{(i)} + p^{(i)} - p^{(i)}y^{(i)}}{p^{(i)}(1-p^{(i)})} \\
&= \frac{p^{(i)} - y^{(i)}}{p^{(i)}(1-p^{(i)})} \\
\end{align*}
$$
  
Second step, find $\dfrac{dp^{(i)}}{dz^{(i)}}$:
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
  
{% spoiler [How is $(1-p^{(i)})$ derived?] %}
$$
\begin{align*}
\frac{e^{-z^{(i)}}}{1 + e^{-z^{(i)}}} &= \frac{e^{-z^{(i)}} + 1 - 1}{1 + e^{-z^{(i)}}} \\
&= \frac{1 + e^{-z^{(i)}}}{1 + e^{-z^{(i)}}} - \frac{1}{1 + e^{-z^{(i)}}} \\
&= 1 - p^{(i)} \\
\end{align*}
$$
{% endspoiler %}
  
Third step, find $\dfrac{dz^{(i)}}{d\tilde{\mathbf{w}}}$:
$$
\begin{align*}
\dfrac{dz^{(i)}}{d\tilde{\mathbf{w}}} &= \dfrac{d}{d\tilde{\mathbf{w}}}(\tilde{\mathbf{w}}^{T}\tilde{\mathbf{x}}^{(i)}) \\
&= \tilde{\mathbf{x}}^{(i)} \\
\end{align*}
$$
  
Combine the three parts:
$$
\begin{align*}
\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} &= \dfrac{dL^{(i)}}{dp^{(i)}}\dfrac{dp^{(i)}}{dz^{(i)}}\dfrac{dz^{(i)}}{d\tilde{\mathbf{w}}} \\
&= \frac{p^{(i)} - y^{(i)}}{p^{(i)}(1-p^{(i)})}\cdot p^{(i)}(1 - p^{(i)})\cdot \tilde{\mathbf{x}}^{(i)} \\
&= (p^{(i)} - y^{(i)})\cdot \tilde{\mathbf{x}}^{(i)} \\
\end{align*}
$$
Finally, substitute back into the derivative of $J_{MCE}$ and convert to vector and matrix form:
$$
\begin{align*}
\dfrac{dJ_{MCE}}{d\tilde{\mathbf{w}}} &= \frac{1}{n}\sum_{i=1}^{n}\dfrac{dL^{(i)}}{d\tilde{\mathbf{w}}} \\
&= \frac{1}{n}\sum_{i=1}^{n}(p^{(i)} - y^{(i)})\cdot \tilde{\mathbf{x}}^{(i)} \\
\nabla{\tilde{\mathbf{w}}}J_{MCE} &= \frac{1}{n}\tilde{\mathbf{X}}^{T}(\mathbf{p} - \mathbf{y}) \\
\end{align*}
$$

## Gradient Descent
For both linear and logistic regression, we have ultimately obtained the partial derivatives of the loss function:
$$
\begin{align*}
\nabla_{\tilde{\mathbf{w}}}J_{MSE} &= \frac{2}{n}\tilde{\mathbf{X}}^{T}(\tilde{\mathbf{X}}\tilde{\mathbf{w}} - \mathbf{y}) \\
\nabla_{\tilde{\mathbf{w}}}J_{MCE} &= \frac{1}{n}\tilde{\mathbf{X}}^{T}(\mathbf{p} - \mathbf{y})
\end{align*}
$$
The purpose of these partial derivatives is to iteratively update the values of the vector $\tilde{\mathbf{w}}$:
Linear Regression: $\tilde{\mathbf{w}} := \tilde{\mathbf{w}} - \alpha\nabla_{\tilde{\mathbf{w}}}J_{MSE}$
Logistic Regression: $\tilde{\mathbf{w}} := \tilde{\mathbf{w}} - \alpha\nabla_{\tilde{\mathbf{w}}}J_{MCE}$
Here, $\alpha$ is the learning rate, which controls the step size, and will not be elaborated on further here.

## Conclusion
Through vectorization and matrix operations, we have transformed the originally lengthy formulas for linear and logistic regression into concise and efficient matrix forms.
This not only greatly simplifies the mathematical derivation process but also provides a powerful computational foundation for machine learning models with multiple features and samples.
From the predicament of a single feature to the elegant expression in multiple dimensions, vectorization is an indispensable key step in understanding modern machine learning algorithms.
