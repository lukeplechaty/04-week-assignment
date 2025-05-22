#! /user/bin/bash
npm create vite@latest client -- --template vanilla
cd client
npm i
cd ..
mkdir server
cd server
npm init -y
npm i express pg dotenv cors
touch .gitignore .env server.js queries.sql
echo "node_modules\n.env" >> .gitignore
cd ..
code . 