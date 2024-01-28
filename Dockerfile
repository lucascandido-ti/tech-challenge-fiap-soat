FROM node:20

RUN apt update -y  && \
    apt install iputils-ping -y && \
    apt install procps -y && \
    yarn global add @nestjs/cli@9.0.0 -y

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install 

COPY . .

COPY ./src/config/settings.template-dockerfile ./src/config/settings.json

RUN yarn build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]

