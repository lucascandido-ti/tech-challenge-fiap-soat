FROM node:21-slim

RUN apt update -y  && \
    apt install procps -y && \
    yarn add -g @nestjs/cli@9.0.0 -y

WORKDIR /home/node/app

USER node

EXPOSE 3000

CMD [ "tail", "-f", "/dev/null" ]

