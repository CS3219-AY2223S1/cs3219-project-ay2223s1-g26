FROM node:18

WORKDIR /collab-service

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["npm", "start"]

EXPOSE 8081