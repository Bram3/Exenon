FROM node:17.6.0-alpine3.14

WORKDIR /usr/src/bot

COPY package*.json ./

RUN rm -rf node_modules && yarn install --frozen-lockfile
RUN yarn global add typescript

COPY . .

RUN yarn run build

CMD ["node", "./build/Main.js"]
