FROM node:14.15.0

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm ci --silent

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "start"]
