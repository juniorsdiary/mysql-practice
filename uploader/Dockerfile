FROM node:14.15.0-alpine

WORKDIR /usr/src/app/uploader

COPY package*.json ./

RUN npm ci --silent

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "start"]
