FROM node:latest
WORKDIR /client
COPY ./package*.json /client
COPY / /client
RUN nvm use 16.16.0
RUN npm install -g npm@9.4.2
RUN npm start
EXPOSE 3000
