FROM node:18.2.0-slim

RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend
RUN yarn install

COPY . .





