FROM node:21.1.0-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --only=prod

COPY . /app

EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "start" ]
