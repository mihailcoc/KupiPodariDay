FROM node:24.4-alpine3.21 AS dev
RUN apk add --no-cache tzdata
ENV NODE_PATH /app/node_modules

WORKDIR /app/

COPY /*.json ./
RUN npm i
COPY . ./

ENTRYPOINT [ "npm", "run","start:dev"]

# production
FROM node:24.4-alpine3.21 AS production
RUN apk add --no-cache tzdata
ENV NODE_PATH /app/node_modules

WORKDIR /app/

COPY /*.json ./
RUN npm i
COPY . ./

ENTRYPOINT [ "npm", "run","start"]
