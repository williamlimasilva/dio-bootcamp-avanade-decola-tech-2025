FROM node:22.13.1

RUN apt-get update && apt-get install -qq -y --no-install-recommends

ENV INSTALL_PATH /barber-shop-ui

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY package*.json ./

#Install global Angular CLI Latest with @angular/cli or @angular/cli@19.1.5
#RUN yarn global add @angular/cli@19.1.5 --save-dev
RUN npm i -g @angular/cli --save-dev

#RUN yarn install
RUN npm install

COPY . .
