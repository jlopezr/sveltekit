FROM node:14-alpine

WORKDIR /usr/src/app

COPY svelte.config.js ./
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./src ./src
COPY ./static ./static

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview" ]
