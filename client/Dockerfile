FROM node:latest
WORKDIR /client
COPY ./package*.json /client
COPY / /client
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN nvm use 16.16.0
RUN npm install -g npm@9.4.2
RUN npm start
EXPOSE 3000
