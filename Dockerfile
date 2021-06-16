FROM node:14-alpine

WORKDIR /usr/src/app

COPY svelte.config.js ./
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./src ./src
COPY ./static ./static

RUN npm run-script build

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "start" ]