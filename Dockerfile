FROM node:12.16.1

WORKDIR /apps/

COPY package.json .

RUN yarn install

EXPOSE 3000

COPY . .

RUN yarn run build

CMD [ "node_modules/serve/bin/serve.js", "-s", "build", "-p", "3000" ]