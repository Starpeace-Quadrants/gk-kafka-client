FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN yarn

COPY certs/cert.pem /usr/local/share/ca-certificates/cert.pem
RUN apk add --no-cache ca-certificates \
  && update-ca-certificates
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/cert.pem

CMD yarn serve