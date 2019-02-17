
endpoints:
  POST - https://ve1gddi9wd.execute-api.us-east-2.amazonaws.com/dev/plans
  GET - https://ve1gddi9wd.execute-api.us-east-2.amazonaws.com/dev/plans/{id}
functions:
  new: dental-plan-config-dev-new
  getPlan: dental-plan-config-dev-getPlan
layers:
  None

Stack Outputs
NewLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:763718075650:function:dental-plan-config-dev-new:1
GetPlanLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:763718075650:function:dental-plan-config-dev-getPlan:1
ServiceEndpoint: https://ve1gddi9wd.execute-api.us-east-2.amazonaws.com/dev
ServerlessDeploymentBucketName: dental-plan-config-dev-serverlessdeploymentbucket-wbhkesumponv

Serverless: Invoke aws:deploy:finalize
Serverless: [AWS s3 200 0.241s 0 retries] listObjectsV2({ Bucket: 'dental-plan-config-dev-serverlessdeploymentbucket-wbhkesumponv',
  Prefix: 'serverless/dental-plan-config/dev' })


curl -X POST https://ve1gddi9wd.execute-api.us-east-2.amazonaws.com/dev/plans --data '{ "planName": "DNT1", "description":"Dental plan 1", "enabled":"true", "benefits" : [{"description":"low price"}] }'

id: uuid.v1(),
            name: data.name,
            description: data.description,
            enabled: data.enabled,
            benefits: data.benefits,
            createdAt: timestamp,
            updatedAt: timestamp,