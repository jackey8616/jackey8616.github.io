---
title: Migrating python backend to AWS Lambda
date: 2024-04-16 21:05:32
categories: AWS
tags:
  - AWS
  - GitHub Actions
  - Lambda
  - PyFun
---

Migrating a Sanic backend from Linode VPC to AWS Lambda.
<!-- More -->

# Opening
Recently I want to close my Linode VPC, although it only took me 5 USD/mo.
But I'm getting lazier to deal with deploying stuffs through SSH,
The origin design of PyFun did not doing well on deploying, at that time, I don't even considering about CI/CD.
AWS Lambda have 1M quota per month, which PyFun is very suit of this kind of way to serve service, and also let me have chances get back to AWS.

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
PyFun is wrote by Sanic, pack as image and push to DockerHub, when its time to deploy, I have to SSH into VPC then manually pull the image then run.
Late version of PyFun is more worst, I have to `git pull` in VPC then build the image locally then up, DockerHub is become meaningless.

This time I decides to refactor a little bit, split to Sanic and Lambda's logics.
> PyFun is a toy-project, which is working like some sort of online judge platform.
> Each lesson defines in a single python file, whole service is not using any database, it takes GitHub as a store.
> This time, I plan to refactor each `.py` file into `.json`, and treat GitHub as a NoSQL database.

You can reference [these commits](https://github.com/jackey8616/PyFun-Backend/compare/b520b78...f9c8776) about how I apply Lambda.

All in all, I split logics to different handler for lambda, extract the event from API Gateway, pack the response format which API Gateway needs, build and push ECR image in GitHub Actions.
I guess?

---

# Prepare Idp & IAM role
Check [this][1] and [this][2] out.
After you setup your Idp and role, you can use [this][3] instructions from AWS, cuz we are just only push to ECR.

And I suggest you can specify the ARN in order to follow the minimum permissions principle while setting Policies.

---

# Prepare ECR images
## Dockerfile
Here is the simple Dockerfile, and you can check [this][4] out.
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

`CMD [ "lambda_app.stage_info_handler" ]` would be the critical part.
Each lambda function will setup(or override) CMD to the handler it wants to execute.
and the format of CMD would be `<file name>.<handler func name>`.

I pack all of the four handlers into same image - you can check the file `lambda_app.py` - thus, We have to override CMD to the given function by our own. 

Besides, Lambda provides various of Trigger, at the belows example:
```python
import sys
def handler(event, context):
    return 'Hello from AWS Lambda using Python' + sys.version + '!'
```
parameter named `event` have different possibilities, since the event is pass by different trigger.
You can make use of the test event in Lambda console.
By pre-creating a test event - yes, you can use template if you want to - you can check the actually structure of event parameter.

I have'nt use `context` yet, I think it describes the whole invoke chain from API Gateway to Lambda or something like that,
I will introduce it next time if there is chances.

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

`permissions` field should be properly setup, otherwise AWS credentials would fail.

---

# Setup Lambda with proper CMD
## Create function
PyFun have four routes, this time I just simply split these routes into four lambda function.
Be aware that the overriding the CMD attributes:
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/Lambda-Override-CMD.png)

## Test event
After creating lambda function, click into it, there is a `Test` tab, you can try it.
I will put API Gateway in front of my Lambda, so here I choose API Gateway:
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/Lambda-Test-API-Gateway-Function.png)

Basically when you are implementing handler function,
you can take this test event's template as reference of event structure.

---

# API Gateway
## API
### Type
Here I built Regional Rest API for saving budgets.
Edge-optimized involve Cloudfront, which is a budget monster, also PyFun is almost zero traffic.
Private requires VPC endpoint, it also cost a lot.

### Resource
Just follows the thought of building a Backend, apply CORS, etc.
And remember to turn on the `Lambda proxy integration`, API Gateway will transmit in coming data as event to lambda function.
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-Lambda-Proxy-Integration.png)

I've already return some `Access-Allow` cross origin headers in `lambda_app.py`.
But POST request will send a preflight request which needs cooperate with API Gateway.
We need to add a CORS simulates under the resource which is POST method:
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-CORS-Simulation.png)

### Stage
This time I treat this API as version 2, thus the naming here I use is v2.
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-Deploy.png)


## Custom domain names
### Upload Cloudflare Certificate
My CDN is Cloudflare, we need to create a CF cert to import into AWS ACM.
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/CF-Create-Cert.png)

### Create domain names, API mappings
Setup desire domain, put on ACM certs then create.

![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-API-mapping.png)

Back to configuration, copy the `API Gateway domain name`, we will setup a CNAME at Cloudflare later.
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/API-Gateway-Endpoint-Configuration.png)

---

# Cloudflare redirect
Create a CNAME, then you can try it!
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/CF-CNAME.png)

Response would encode with base64.
![](/images/note/AWS/pyfun-migrate-to-aws-lambda/Backend-v2-Test.png)

---

# PyFun Frontend point to v2 backend
You can check [this](https://github.com/jackey8616/PyFun-Frontend/commit/8a9ff4c5d63e7d0c1f45815a4d2bc88335c0f7c0) out to see what changes in Frontend.

---

# After
I might setup another repository to manage my personal AWS or something through Terraform.
This migration is not perfect, pushing images to ECR still need to manually trigger the GitHub actions, because I want to keep it simple at the moment.

On the Linode VPC, there is still another service needs to migrate to AWS in order to fully remove the VPC.
I will survey DynamoDB latter, cuz the service is using MongoDB.

---

# Reference
- [[1 - Use IAM roles to connect GitHub Actions to actions in AWS]][1]
- [[2 - Creating a role for OIDC]][2]
- [[3 - IAM permission for pushing an image]][3]
- [[4 - AWS Lambda - Using an AWS base image for Python]][4]

<!-- This is reference link, below content would not show -->
[1]: <https://aws.amazon.com/tw/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/> (Use IAM roles to connect GitHub Actions to actions in AWS)
[2]: <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html#idp_oidc_Create> (Creating a role for OIDC)
[3]: <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-push.html#image-push-iam> (IAM permission for pushing an image)
[4]: <https://docs.aws.amazon.com/lambda/latest/dg/python-image.html#python-image-instructions> (AWS Lambda - Using an AWS base image for Python)
<!-- This is reference link, above content would not show -->
