FROM node:latest
WORKDIR /client
COPY ./package*.json /client
RUN npm install
COPY / /client
RUN npm run build
CMD ["npx", "serve", "-s", "build"]
EXPOSE 3000
