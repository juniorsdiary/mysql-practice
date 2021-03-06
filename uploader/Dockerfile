FROM node:14.15.5

WORKDIR /usr/src/app/uploader

#RUN apk update && apk upgrade
#RUN apk add build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

RUN apt-get update
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

COPY package*.json ./

RUN npm ci --silent

RUN npm i --build-from-source canvas

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "start"]
