FROM node:14.14.0-alpine3.12 as common

COPY . ./client

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent

EXPOSE 3010

# Development
FROM common as development

ENV NODE_ENV development

CMD ["npm", "run", "start"]
