#! /bin/bash 

cd backend 
yarn 
yarn build
yarn start:pm2

cd ../frontend 
yarn 
yarn start:pm2
