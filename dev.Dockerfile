FROM node:20.2.0-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . /app

RUN ls -la

EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "run", "dev" ]
