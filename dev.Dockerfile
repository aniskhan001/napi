FROM node:24.22.1-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . /app

RUN ls -la

EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "run", "dev" ]
