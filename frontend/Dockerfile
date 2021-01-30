FROM node:14.15.0

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm ci

COPY . ./

CMD ["npm", "run", "start"]

EXPOSE 8000