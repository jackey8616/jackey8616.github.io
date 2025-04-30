---
title: "MatMul: Matrix Multiplication"
date: 2025-04-30 18:02:00
tags:
  - Note
categories: Note
mathjax: true
---

記錄一下今天面試的問題，發現沒有搞清楚矩陣以及行列(欄列)的定義。

<!-- More -->

## Q
> 給定兩個矩陣，不定長度，請寫出矩陣相乘的程式碼。

## 直行橫列(直欄橫列)
Excel中為欄名列號(A欄、B欄；1列、2列)  
台灣與中國，行與列的稱呼法互為相反，所以多用row & column來統一表示較為易懂避免認知落差。

## What is Matrix?
矩陣大小表示法為m * n, m rows, n columns。  
如圖是一個2 * 3大小的矩陣，其中列(row)為2、行(column)為3。  
$$
A=
\begin{bmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\ 
\end{bmatrix} 
$$

## MatMul(Matrix Multiplication)
設A爲n * m的矩陣、B爲m * p的矩陣。  
則A以及B可以進行矩陣相乘得到一個n * p大小的矩陣積。  

$$
A=
\begin{bmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\ 
\end{bmatrix}
$$
$$
B=
\begin{bmatrix}
  7 & 8 \\
  9 & 10 \\ 
  11 & 12 \\
\end{bmatrix}
$$
$$
Result=
\begin{bmatrix}
  [(1 * 7) + (2 * 9) + (3 * 11)] & [(1 * 8) + (2 * 10) + (3 * 12)] \\
  [(4 * 7) + (5 * 9) + (6 * 11)] & [(4 * 8) + (5 * 10) + (6 * 12)] \\
\end{bmatrix}
=
\begin{bmatrix}
  58 & 64 \\
  139 & 154 \\
\end{bmatrix}
$$

## Python
```python
def multiple(a: list[list[int]], b: list[list[int]]):
    a_row_len = len(a)
    a_column_len = len(a[0])
    b_row_len = len(b)
    b_column_len = len(b[0])

    if a_column_len != b_row_len:
        raise ValueError("Unable to multiple")

    result_matrix = [
        [0 for _ in range(b_column_len)]
        for _ in range(a_row_len)
    ]

    for i in range(a_row_len):
        for j in range(b_column_len):
            summation = 0
            for k in range(b_row_len):
                summation += a[i][k] * b[k][j]
            result_matrix[i][j] = summation

    return result_matrix
```
