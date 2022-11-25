# meanstack-okta
Okta oauth Authentication with Meanstack
  - Forntend in angular js
  - backend in Nodejs
  - database Mongodb

Create account on Okta before runnign this project and configure okta in frontend and backend

Configure okta in frontend
  - Edit src/environments/environment.ts file
Configure okta in backend
  - add OKTA_ISSUER_URL and OKTA_AUDIENCE in .env file


 

Create .env file in backend
add "MONGO_CONNECTION_STRING", 
OKTA_ISSUER_URL, 
OKTA_AUDIENCE
 environment variables to connect mongo database and connect okta
 


Run FrontEnd:
  - cd frontend
  - npm install
  - ng serve

Frontend app runs at : http://localhost:4200

Run BackEnd:
  - cd backend 
  - npm install
  - npm start

Backend app runs at : http://localhost:3000



