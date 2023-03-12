# Common build stage
FROM node:14.14.0-alpine3.12 as common

COPY . ./app

WORKDIR /app

RUN npm i typescript -g

RUN npm i -g ts-node

RUN npm install --production

EXPOSE 3000

# Development
FROM common as development

ENV NODE_ENV development

CMD ["npx", "nodemon", "index.ts"]
