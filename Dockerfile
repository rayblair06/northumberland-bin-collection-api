FROM node:16.13.2

ARG NODE_ENV=production

WORKDIR /app
COPY / ./

RUN yarn global add nodemon
RUN yarn install

EXPOSE 3000