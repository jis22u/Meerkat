FROM node:latest
WORKDIR /client
COPY ./package*.json /client
RUN apt-get update
RUN apt-get install -y sudo
RUN sudo npm install
COPY / /client
RUN sudo npm run build
CMD ["npx", "serve", "-s", "build"]
EXPOSE 3000
