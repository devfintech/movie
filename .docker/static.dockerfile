FROM node:20-alpine as BASE
LABEL author="moonops"

RUN corepack enable
RUN corepack prepare yarn@1.22.19 --activate

WORKDIR /app

COPY package.json yarn.lock gsap-bonus.tgz ./
RUN apk add --no-cache git \
    && yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:alpine

WORKDIR /app

COPY ./.config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=BASE /app/dist /usr/share/nginx/html