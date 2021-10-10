A simple dashboard site built using [Next.js](https://nextjs.org/), [Material-UI](https://mui.com/) [next-iron-session](https://github.com/vvo/next-iron-session).
Credentials to the site are admin/admin or use same username and password.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on AWS

The site is deployed to AWS using [Serverless](https://www.serverless.com/blog/serverless-nextjs).
![Architecture](https://s3-us-west-2.amazonaws.com/assets.blog.serverless.com/serverless-nextjs/serverless_nextjs_lambda_edge_aws_architecture.png)

```bash
# Build AWS template
npx serverless create --template aws-nodejs

# Edit serverless.yml file as per your needs
```

See [serverless.yml](serverless.yml)

```bash
#Deploy
npx serverless

#Undeploy
npx serverless remove
```