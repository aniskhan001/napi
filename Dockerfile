FROM node:slim

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN cd /app
RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npm", "start"]
