FROM node:19-alpine
WORKDIR /app
COPY . .
RUN yarn

CMD yarn serve