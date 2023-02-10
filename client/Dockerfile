FROM node:latest
WORKDIR /client
COPY ./package*.json /client
RUN apt-get update
RUN apt-get install -y sudo
RUN sudo pm install
RUN sudo npm audit fix --force
COPY / /client
RUN sudo npm run build
CMD ["npx", "serve", "-s", "build"]
EXPOSE 3000
