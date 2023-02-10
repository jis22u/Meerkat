FROM node:latest
WORKDIR /client
COPY ./package*.json /client
RUN npm install
COPY / /cient
RUN npm run bild
CMD ["npx", "serve", "-s", "build"]
EXPOSE 3000
