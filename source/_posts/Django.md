---
title: Django
date: 2018-04-10 19:44:03
tags:
  - Django
categories: Note
---

This is the tutorial for Yuntech OSC.  
English version, but no any future plang to translate to zh-TW.lol  

Feel free to corect anything through PM.  
Also we have a Gitbook version at [here](https://jackey8616.gitbooks.io/django/content/).  
  
<!-- More -->

# Installation

Pipe is a external import manage system.
This sesction will tell you how to install pipe into your ubuntu linux.

> ~$ sudo apt-get install python3-pip

install pip in python3

> ~$ sudo apt-get install python3-venv

venv should contain in python3 package.If not, just apt one for yourself!

> ~$ mkdir ~/django-tutorial
> ~$ mkdir ./django-tutorial/django-venv

Create a app folder for django in your home folder
Also another folder for installing virtual environment which named venv in app folder.

> ~/django-tutorial$ python3 -m venv django-venv

After that, create your venv in django-venv folder.

> ~/django-tutorial$ . ./django-venv/bin/active

and than active your venv.

> \(django-venv\) ~/django-tutorial$

If you see there is a pair of parentheses contains your venv folder's name,

It means you are in it!

> \(django-venv\) ~/django-tutorial$ pip install django

Which pip will handle all installation of django without root permission.

Be advised that you must install every python package you need in venv.

Or it might cause any other unknown interference by other python script.

---

## Examination

> \(django-venv\) ~/django-tutorial$ python

open python interpreter

> &gt;&gt;&gt; import django
>
> &gt;&gt;&gt; django.VERSION

import django and print it's version

> \(1, 11, 1, 'final', 0\)

this shows we installed 1.11.1 version's django.

---  

# MVC & MTV Framework
## MVC

![](https://wilmingtonbiz.s3.amazonaws.com/cieimage41517.gif)

Model / View / Controller

We don't talk too much, just give you some concept.

Model hook with Database or any other data storage, it's provide an interface to access with data\(s\).

View defined how a page elements shows.

and Controller responsible for receive parameter and send out after processed.

## MTV

![](http://blog.easylearning.guru/wordpress/wp-content/uploads/2015/08/Django-Template.png)

Model / Template / View

Compare with MVC framework, MTV is more detailed define other stuff which Controller responsible for.

All you have to know is: Template = View, View + Urls = Controller

---  

>
 **Once again, be advised that the following step should be operated under virtual environment.**

---

# First Project and Application
## Structure
> Command : django-admin.py startproject \(ProjectName\)
>
> \(django-venv\) ~/django-tutorial$ django-admin.py startproject Opensource

after this command, django will create a folder named by your \(ProjectName\).

> \(django-venv\) ~/django-tutorial$ cd Opensource

Tree Directory will shows:

```sh
Opensource/ (Project Folder)
├─ manage.py (Django Python Console)
├─ Opensource/ (Porject Settings)
│ ├─ __init__.py
│ ├─ settings.py
│ ├─ urls.py
│ └─ wsgi.py
│
├─ System/ (Application)
│ ├─ migrations/
│ │ └─ __init__.py
│ │
│ ├─ __init__.py
│ ├─ admin.py
│ ├─ apps.py
│ ├─ models.py
│ ├─ tests.py
│ └─ views.py
│
├─ opensource_01/ (Application)
│ ├─ migrations/
│ │ └─ __init__.py
│ │
│ ├─ __init__.py
│ ├─ admin.py
│ ├─ apps.py
│ ├─ models.py
│ ├─ tests.py
│ └─ views.py
│
.
.
.
.
.
│
│
└─ opensource_XX/ (Application)
├─ migrations/
│ └─ __init__.py
│
├─ __init__.py
├─ admin.py
├─ apps.py
├─ models.py
├─ tests.py
└─ views.py
```

## manage.py  
|指令 | 說明 |
| :--- | :--- |
| django-admin.py **startproject** `<project_name>` | 建立 Django 專案 |
| python manage.py **-h** `<command_name>`  | 查看 Django commands 的使用方法 |
| python manage.py **runserver** | 啟動開發伺服器 |
| python manage.py **startapp** `<app_name>` | 新增 Django app |

## settings.py
### Edit settings.py to host a appropreate django

``` python 
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = ''

DEBUG = True

# Allowed any host to interact with this django service
# DEFAULT : ALLOWED_HOSTS = []
ALLOWED_HOSTS = ['*']

# This tells django other applications which needs to install.
INSTALLED_APPS = [
    ...
    'System',
    'opensource_01',
    'opensource_02',
    ...
    'opensource_XX',
]

MIDDLEWARE = [ ... ]

ROOT_URLCONF = 'Opensource.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'APP_DIRS': True,
        'DIRS': [
            os.path.join(BASE_DIR),
        ],
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Opensource.wsgi.application'

DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'ENGINE': 'django.db.backends.mysql',
        # if you want to use mongodb
        # First install 'django-norel' by using pip.
        # Second install 'django tooblox' also by pip.
        # Third install 'mongodb-engine' still by pip.
        # At last, use 'django_mongodb_engine' in 'ENGINE' like bottom as your backend.
        # 'ENGINE': 'django_mongodb_engine',
        'NAME': 'DB_NAME',
        'USER': 'DB_USER',
        'PASSWORD': 'DB_PASSWD',
        'HOST': 'DB_LOCATION',
        'PORT': 'DB_PORT',
    }
}

AUTH_PASSWORD_VALIDATORS = [ ... ]

# DEFAULT: LANGUAGE_CODE = 'en-us'
LANGUAGE_CODE = 'zh-hant'

# DEFAULT: TIME_ZONE = 'UTC'
TIME_ZONE = 'Asia/Taipei'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = '/static/'
```  

---  

# Template / View  
## Template
Before you create a template file to store your static HTML file.
You must have a folder to manage files.

> ~$ cd Opensource/opensource\_XX/
>
> ~/Opensource/opensource\_XX$ mkdir templates

After this, now you can create any template you want,
just remember to put it into folder to make sure view.py can get it.

> ~/Opensource/opensource\_XX/templates$ vim index.html

use vim / nano or any other editor you like.

## View
Every pages has it's own view function.
If we want to appropreate render a page with right data,
we have to edit view.py first.

> ~$ Opensource/opensource\_XX/view.py

And this is your view.py
It sould be empty, and only one import inside.

```python 
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'opensource_XX/templates/index.html', local())
```  

## Template Rendering.

Local variable render:

In view.py render function:

```python  
import datetime
from django.shortcuts import render
import datetime

# Create your views here.
def index(request):
    now_time = datetime.datetime.now()
    staff = [
        'opensource_01', 'opensource_02', 'opensource_03', 'opensource_04', 'opensource_05',
        'opensource_06', 'opensource_07', 'opensource_08', 'opensource_09', 'opensource_10',
        'opensource_11', 'opensource_12', 'opensource_13', 'opensource_14', 'opensource_15',
        'opensource_16', 'opensource_17', 'opensource_18', 'opensource_19', 'opensource_20',
        'opensource_21', 'opensource_22', 'opensource_23', 'opensource_24', 'opensource_25'
    ]

return render(request, 'opensource_XX/templates/index.html', locals())
```  

now\_time is the local\(\) variable in function index.
and it will pass to django's render engine by locals\(\)

In opensource\_XX/templates/index.html

### **Variable render**

```python 
{{ now_time }}
``` 

this shows content of now\_time variable.

### **if statement **

```python 
{% if (condition) %}
....
{% endif %}
``` 

### **For loop statement and render**

```python 
{% for each in staff %}
    <div>{{ each }}</div>
{% endfor %}
``` 

---  

# Form
Django has a form system to replace traditional HTML's form
Before making a form for a application, you need to create a forms.py first.

```sh 
~$ cd Opensource/opensource_XX
~/Opensource/opensource_XX$ vim forms.py
``` 

And put following code into it.

```python 
# forms.py
from django import forms
``` 

That's all!

## Example for a Login form.

This is a bunch of HTML code for a basic login form.

```html 
<form>
    <label>Account</label>
    <input type="text" id="account" name="account" class="form-control" placeholder="Account" required/>
    <label>Password</label>
    <input type="password" id="password" name="password" class="form-control" placeholder="Password" required/>
</form>
``` 

The form has two field which is TextField and PasswordField.
every time when you design a form, you have to analysis it field structure, and go to django's official form field document and seek a proper field.

This is the website: [https://docs.djangoproject.com/en/1.11/ref/forms/fields/](https://docs.djangoproject.com/en/1.11/ref/forms/fields/)

In this case. We only need CharField.
Which is for reflect HTML's &lt;input&gt; label.

Also, by using &lt;input&gt; label's type element, we can control it's display form like normal text, or a password character \(\*\).

When editing forms.py, you do like this:

```python 
from django import forms

class login(forms.Form):
# form's name to class's name, and extends forms.Form object

    account = forms.CharField(
    # This is one of your field name
        label='Account',
        # <label>'s content with field.
        required=True,
        # one of the element we must assign to make it required.
        widget=forms.TextInput(attrs=
        {
            # this dictionary can let you assign any other element that might not be support by django.
            'id': 'account', # in case you have any other name way.
            'class': 'form-control', # Im more prefer a Bootstrap rendering
            'placeholder': 'Account', # Add more hint is always good.
            'type': 'text' # This is the most important part.
        })
    )
    password = forms.CharField(
        label='Password',
        required=True,
        widget=forms.TextInput(attrs=
        {
            'id': 'password',
            'class': 'form-control',
            'placeholder': 'Password',
            'type': 'password' # DO NOT FORGET !!!!!!
        })
    )
``` 

and this is all about creating your first form.

But still, not using it!.

## Usage in views.py

Every form is a variable in forms.py
Before use it in views.py, make sure you have already import it.

```python 
from opensource_XX import forms
``` 

After this, you can call any form variable in views.py to render in tempalte.

For example:

views.py

```python 
from opensource_XX import forms

def login(request):
    login_form = forms.login()
    return render(request, 'opensource_XX/templates/login.html', locals())
``` 

login.html

```html 
<html>
    <body>
        <form method="POST">
            {{ login_form.as_p }}
            <input type="submit" value="Submit"/>
        </form>
    </body>
</html>
``` 

After put variable into template html file.
Remember put submit button inside form like:

```html 
<input type="submit" value="Submit"/>
<input type="clear" value="Clear"/>
``` 

Also, the method you submit a form effect the way how django view function process the form result.

```html 
<form method="POST">
or
<form method="GET">
``` 

## Verify a form's data

You can get a request method by calling:

```python 
request.method
``` 

It will return a string like 'GET' or 'POST'

Put it into a if statement for a further process, like:

```python 
if request.method == 'GET':
    return render(...)
elif request.method == 'POST':
    # process form data.
    return render(...)
``` 

While you want to process a form, you might get some value from a form.
Once you make sure this request contains a form and it's definition in forms.py.

```python 
if request.method == 'POST':
    form = forms.login(request.POST)
``` 

By using the following method, you can easily get value in specific field in a form.

```python 
form.cleaned_data['filed_name']
``` 

For example:

```python 
Getting account field value:
login_form.cleaned_data['account']

Getting password field value:
login_form.cleaned_data['password']
``` 

Finally, you can verify datas

```python 
def login(request):
try:
    if request.method == "POST":
        login_form = forms.login(request.POST)
        if login_form.is_valid():
            account = login_form.cleaned_data['account']
            password = login_form.cleaned_data['password']
            if account == 'B10517031' and password == 'password':
                return HttpResponse('login success')
            else:
                return HttpResponse('login failed.')
    else:
        login_form = forms.login()
    return render(...)
except:
    error_report = traceback.format_exc()
    return redner(...)
``` 

## Other stuff you might interesting.

If you are using some specil filed like GerneralIPAddressField in django.
You can simplly use:

```python 
form.is_valid()
``` 

It can help you to check some element like "required=True" or IP format ... so on.

---  

# Advance template  
## Why we need base for templates?

By using template, we can make pages with same nature bind to one single file to define it.
Maxinumize the flexibilty of whole system.

But sometime we may want to merge pages with same feature.
And the only way to reach this purpose is to extend another page.

## Make your first base.html

Base is also a template file.
In YOUR application folder's 'templates' folder:

```sh 
~$ cd Opensource/opensource_XX/templates
~/Opensource/opensource_XX/templates$ vim base.html
``` 

This gives you another new html file called base.html

And put follow code into it.
If you wish to add any code you want, just do so:

```html 
<html>
    <head>
        <title>{% block page_title %}YunNet OSC{% endblock %}</title>
        {% block head_style %}{% endblock%}
        {% block head_js %}{% endblock %}
    </head>
    <body>
        {% block body_top_js %}{% endblock %}
        {% block content %}{% endblock %}
        {% block body_bottom_js %}{% endblock %}
    </body>
</html>
``` 

Structure of this base html allowed pages who extends it can:
\(1\) Have its own title, and default is 'YunNet OSC'
\(2\) Ability to edit meta by different page/
\(3\) Have its own CSS style or JaveScript.
\(4\) Also provide a body top/bottom section to put javascript whom need to be load in body.


Extends a base is very easy.
Just add one single line on top.

```html 
{% extends 'base.html' %}
``` 

So, just simply open another html file called 'new\_index.html'

```html 
{% extends 'base.html' %}
{% block page_title %}YunNet OSC - New Index{% endblock %}
{% block content %}
    This is extends base.html test.
{% endblock %}
``` 

Of course, remeber to add a new define in views.py and routing in urls.py to make sure this page is correctly loaded. 

---  

# models
With django default ORM, we can easily control database's data, without traditional way to access it.
More effective, safty, and easy.

Different application can have it own model define data field.

```python 
# System/models.py

from django.db import models

class system_test(models.Model):
    name = models.CharField(max_length=20)
``` 

And this is a basic model in database a table named 'system_test' with only single field which is 'name'
also, this field defaultly has a primary key called 'pk', the field has only one paremeter which is max\_length.

For further model filed to use. you can check the following url:
[https://docs.djangoproject.com/en/2.0/ref/models/fields/](https://docs.djangoproject.com/en/2.0/ref/models/fields/)

Every time you edit a models.py always comes with a pair of command to execute.

```sh 
# python manage.py makemigrations
# python manage.py migrate
``` 

ORM helps developer to construce entire database, before system do the reall change of it.
Developer should use makemigrations to commit to the ORM, let ORM organize every table/field whom may effect by this change.

Once the ORM checked the migrations is valid. Developer can us migrate to confirm the operation,
and let ORM do the migrate job.

Be advice, this doesn't mean after makemigrations, ORM can 100% migrate changes.
Especially some operation involve with ForiegnKey.

---  

# To Be Continue... (Maybe.

