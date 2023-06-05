FROM node:19-alpine

WORKDIR /app
ADD back/package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install

ADD back/. /app

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]

