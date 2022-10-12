FROM node:18

WORKDIR /question-service

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["npm", "start"]

EXPOSE 3005