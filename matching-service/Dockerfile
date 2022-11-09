FROM node:18

WORKDIR /matching-service

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["npm", "start"]

EXPOSE 3000