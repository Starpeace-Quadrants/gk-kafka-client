FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN yarn

RUN apk add --no-cache ca-certificates
ENV NODE_EXTRA_CA_CERTS=/app/certs/cert.pem

CMD yarn serve