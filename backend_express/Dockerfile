FROM node:14.15.0-alpine

RUN apk update && apk add bash

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm ci --silent

COPY . ./

EXPOSE 3000

RUN pwd

RUN chmod +x ./wait-for-it.sh

ENTRYPOINT ./wait-for-it.sh -s mysql:3306 -- npm run start

CMD ["npm", "run", "start"]
