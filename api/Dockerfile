FROM node:22-slim

WORKDIR /api
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD npm start
