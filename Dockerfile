FROM node

WORKDIR /app

COPY . /app

RUN yarn

EXPOSE 3333

CMD ["node", "./server.js"]