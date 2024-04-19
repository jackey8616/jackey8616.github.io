---
title: Migrating python backend to AWS Lambda(zhTW)
date: 2024-04-19 21:52:32
categories: AWS
tags:
  - AWS
  - GitHub Actions
  - Lambda
  - PyFun
  - zhTW
---

遷移一個Sanic後端從Linode VPC到AWS Lambda。
<!-- More -->

# Opening
最近想要把Linode VPC收掉，雖然一個月才花5塊美金而已；
但是覺得越來越懶的SSH連線進去VPC去處理部署，原先專案寫的方式，其實並沒有很好的部屬設計，當時的時空背景下還沒有想到CI/CD的部分；
剛好最近看到AWS Lambda有每個月1M的quota，所以就想PyFun適合這種Serverless的方式去Host，藉此機會摸一下許久未碰的AWS。

---

# Steps
- Refactor [PyFun Backend](https://github.com/jackey8616/PyFun-Backend/)
- Prepare IdP & IAM role
- Prepare ECR images
- Setup Lambda with proper CMD
- [TBD] API Gateway
- [TBD] Cloudflare redirect
- [TBD] [PyFun Frontend](https://github.com/jackey8616/PyFun-Frontend) point to v2 backend

---

# Refactor PyFun Backend
PyFun原先是以Sanic的方式去pack成image推到DockerHub上面，然後再自己SSH進去手動Pull然後部署；後來其實更慘，直接在機器裡面git pull然後當場build當場up，那個Docker image完全不知道推幹嘛的。

趁著把PyFun稍微refactor的機會，順便切分了一下Sanic部分跟預期要使用的Lambda。
> PyFun本身是一個類似online judge的東西，他的每一個Lesson都是用Python file去定義，
> 本身並沒有使用到資料庫，直接拿GitHub存每一個Lesson，
> 這次的Refactor是把原本用.py定義的lesson改成用.json，直接把GitHub當作NoSQL了。

詳細套用Lambda的commit可以參考[這邊](https://github.com/jackey8616/PyFun-Backend/compare/b520b78...f9c8776)

簡單來說就是，把lambda要用的handler切好、解析一下API Gateway給的event、包裝好API Gateway的response、ECR要用的Dockerfile跟推送的GitHub Actions寫一寫。
大概是這樣？

---

# Prepare Idp & IAM role
參考<small>[[註1 Use IAM roles to connect GitHub Actions to actions in AWS]][1]</small>、<small>[[註2 Creating a role for OIDC]][2]</small>設定好Idp跟role之後，Policy的部分，因為只是要推送到ECR，所以可以參考<small>[[註3 IAM permission for pushing an image]][3]</small>。

建議設定Policy的時候可以去指定Arn，以最低權限原則去設定最好。

---

# Prepare ECR images
## Dockerfile
這邊大概簡單介紹一下Dockerfile <small>[[註4 AWS Lambda - Using an AWS base image for Python]][4]</samll>。
```dockerfile
FROM public.ecr.aws/lambda/python:3.12

LABEL maintainer=Clooooode<clode@clo5de.info>

# Copy requirements.txt
COPY requirements-lambda.txt ${LAMBDA_TASK_ROOT}

# Copy function code
COPY manager ${LAMBDA_TASK_ROOT}/manager
COPY stage ${LAMBDA_TASK_ROOT}/stage
COPY utils ${LAMBDA_TASK_ROOT}/utils
COPY lambda_app.py ${LAMBDA_TASK_ROOT}

# Install the specified packages
RUN pip install -r requirements-lambda.txt

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda_app.stage_info_handler" ]
```
比較重要的大概是 `CMD [ "lambda_app.stage_info_handler" ]` 這邊。
每一個Lambda在設定，預設都會用CMD指向的<檔名>.<函式名>程式來執行。
我這邊的用法是把所有的東西(四個方法)都包在同一個image(詳細可以自己去參考一下Repo裡面的lambda_app.py)，所以後續在Lambda的設定介面，需要手動Override CMD到對應的函式。

除此之外，Lambda本身，可以有多種不同的觸發器，所以以下AWS的範例中：
```python
import sys
def handler(event, context):
    return 'Hello from AWS Lambda using Python' + sys.version + '!'
```
event這個參數，是有各種不同的可能，自己實際在local測試的時候要注意。
可以多多利用Lambda主控台中，預先建立一個函數(可以先用模板)，裡面的測試也有模板方便看一下參數長相。

context我還沒用到，估計是整個invoke chain的東西，下次有遇到再介紹。

## GitHub Actions to push to ECR
```yml
name: Deploy to ECR

on:
  workflow_dispatch:

jobs:
  build-n-deploy:
    permissions:
      id-token: write
      contents: read
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::533267006313:role/PyFun-Backend-GH-Idp-Role
          aws-region: ap-northeast-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build, tag, and push docker image to Amazon ECR
        env:
          REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          REPOSITORY: pyfun-backend
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $REGISTRY/$REPOSITORY:$IMAGE_TAG . -f lambda.Dockerfile
          docker push $REGISTRY/$REPOSITORY:$IMAGE_TAG
```

大概要特別注意的是`permissions`，要設定好，不然會沒辦法過Credentials。

---

# Setup Lambda with proper CMD
## Create function
PyFun本身有四個路由，所以我這次只是粗略的切分成四個Lambda function。
要注意的是CMD覆寫的部分：
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/Lambda-Override-CMD.png)
這邊標示的就是 <lambda handler 放置的檔案名>.<handler func name>。
所以對應Repo裡面`lambda_app.py`的四個handler，看起來會像這樣。

## Test function
建立好Function之後，點進去有測試的Tab可以試打。
因為我前面會套API Gateway，所以這邊選API Gateway的Http範本。
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/Lambda-Test-API-Gateway-Function.png)

基本上你在寫handler function的實作的時候，
event的結構，就可以參考這邊的test function範本。

---

# API Gateway
## API
### Type
這邊我建立的是Rest API，為了省錢，用的是區域性的API。
邊緣最佳化會牽扯到Cloudfront，那個是吃錢怪獸，而且PyFun流量低得可憐，用不到。
私有雖然不用流量，但是會需要多設定Private Link，這也是錢；流量不會不見，只是變成你不喜歡的樣子。

### Resource
基本上就是按照後端路由下去建立路徑資源，套用CORS等。
小重點是要記得把`Lambda代理整合`的選項給打開，這樣子API Gateway才會把傳入的資料以事件包裝丟給Lambda的函數去工作。
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-Lambda-Proxy-Integration.png)

CORS的部分，除了在`lambda_app.py`裡面，已經預設包裝好Access-Allow那一些的header回傳之外，
POST的Preflight Request會需要仰賴API Gateway去做CORS，
所以這一塊要到會使用到POST的路由資源底下，新增一個模擬CORS的設定：
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-CORS-Simulation.png)

### Stage
因為PyFun這次搬到AWS算是v2，所以我這邊把deploy stage定為v2。
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-Deploy.png)


## 自訂網域名稱
### Upload Cloudflare Certificate
因為我的CDN用Cloudflare，所以得先去建立CF的Cert拿出來匯入AWS ACM中。
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/CF-Create-Cert.png)
拿到之後直接塞進去ACM就好了。

### 建立網域名稱、設定API映射
把想要用的domain設定好、ACM憑證掛上去直接建立就可以了。
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-API-mapping.png)
回到組態的地方，把`API Gateway 網域名稱`的domain複製下來，待會要去Cloudflare掛CNAME。
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-Endpoint-Configuration.png)

---

# Cloudflare redirect
把CNAME掛上去，就可以直接試打看看了。
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/CF-CNAME.png)

因為回應會用base64編碼，所以解開要多一層解開。
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/Backend-v2-Test.png)

---

# PyFun Frontend point to v2 backend
這邊的Refactor就不贅述了，基本上後端改了啥，前端就是跟著改。
可以直接對照後端的Repo，然後參考[這邊前端的變動](https://github.com/jackey8616/PyFun-Frontend/commit/8a9ff4c5d63e7d0c1f45815a4d2bc88335c0f7c0)。

---

# After
未來應該還會弄一個個人的Terraform去管理這些東西，
前面ECR push的GitHub actions其實也仰賴去手動戳，原因是我有點懶得把整個Flow都弄好，
目前看起來是自己小練手搬到AWS Lambda的專案，暫時沒迫切完整push flow的需求。

後續Linode VPC上還有另外一個服務也要搬進去AWS才能完全移除掉那台機器。
估計之後還會研究一下DynamoDB，因為那個服務有用到MongoDB。

---

# Reference
- [[註1 Use IAM roles to connect GitHub Actions to actions in AWS]][1]
- [[註2 Creating a role for OIDC]][2]
- [[註3 IAM permission for pushing an image]][3]
- [[註4 AWS Lambda - Using an AWS base image for Python]][4]

<!-- This is reference link, below content would not show -->
[1]: <https://aws.amazon.com/tw/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/> (Use IAM roles to connect GitHub Actions to actions in AWS)
[2]: <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html#idp_oidc_Create> (Creating a role for OIDC)
[3]: <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-push.html#image-push-iam> (IAM permission for pushing an image)
[4]: <https://docs.aws.amazon.com/lambda/latest/dg/python-image.html#python-image-instructions> (AWS Lambda - Using an AWS base image for Python)
<!-- This is reference link, above content would not show -->
