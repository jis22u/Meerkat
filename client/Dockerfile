FROM node:latest
WORKDIR /client
COPY ./package*.json /client
RUN apt-get update
RUN apt-get install -y sudo
RUN sudo npm install
RUN sudo npm audit fix
COPY / /client
RUN sudo npm start
EXPOSE 3000
