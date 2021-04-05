# Dockerfile
# 1st Stage
FROM node:10.16.0 AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --ignore-platform
COPY . .
RUN yarn build
# 2nd Stage
FROM nginx:1.17.2-alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# COPY --from=0 /usr/src/app/conf.d/nginx.conf /etc/nginx/conf.d/runex.conf
# COPY --from=0 /usr/src/app/ssl/dcf3234228e95803.pem /etc/ssl/certs/dcf3234228e95803.pem
# COPY --from=0 /usr/src/app/ssl/dcf3234228e95803.crt /etc/ssl/certs/dcf3234228e95803.crt

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]