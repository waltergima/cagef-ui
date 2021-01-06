FROM tarampampam/node:12-alpine

WORKDIR /apps/

COPY package.json .

RUN yarn install

COPY . .

ENV NODE_ENV=production

RUN yarn run build

EXPOSE 3000

ENTRYPOINT [ "node_modules/serve/bin/serve.js", "-s", "build", "-p", "3000", "-n" ]
