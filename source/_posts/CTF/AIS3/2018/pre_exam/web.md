---
title: web
date: 2018-08-01 21:08:54
tags:
  - CTF
  - AIS3
  - pre exam
categories:
  - CTF
  - AIS3
  - 2018
---

## warmup
Check header found `Paritial-Flag`,
Wrote a simple python crawler keeping get this praitial-flag until get last char `}`

```python=
import urllib.request

url = 'http://104.199.235.135:31331/index.php?p='

i = 0 
while True:
    response = urllib.request.urlopen('%s%d' % (url, i)) 
    letter = response.getheader('Partial-Flag')
    letter = ' ' if letter == '' else letter
    print(letter, end='')
    if letter == '}':
        break
    i += 1
```

---

## hidden
Find a hidden page `_hidden_flag_.php` other url from `robots.txt`.
Test with a form POST, found `Flag` shows `AIS3{NOT_A_VALID_FLAG}`
Wrote a simple python crawler keep sending POST to form with increase value until get right flag.

```python
import requests, re

url = 'http://104.199.235.135:31332/_hidden_flag_.php'

values = [ 
  (0,'0',''),
  (1,'3241b876891b9ea67db897e940db6ea9e7e351447546b8da82bbf3693dfe9ebb','')
]

print(values[1][0], values[1][1])
for each in range(1, 100000):
    r = requests.post(url, {'c': values[each][0], 's': values[each][1] })
    c = int(re.compile(r'\"c\" value=\"[0-9]*\"').search(r.text)
    c = c.group(0)[11:-1])
    s = str(re.compile(r'\"s\" value=\".*\"').search(r.text).group(0)[11:-1])
    header = r.headers['Flag']
    values.append(tuple((c, s, header)))
    print(c, s, header)
    if header != 'AIS3{NOT_A_VALID_FLAG}':
        break
```

---

## sushi
A php check input value can not contain `'` and `"` at 0 or above position.
and `die` function can not be avoid.
Input with `". [php statement] ."` to get value to send from `die` to browser.

Use `system(ls)` to get folder content.
Get a file name is `flag_name_1s_t00_l0ng_QAQQQQQQ`
and concat with url. get it.
