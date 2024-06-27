FROM node:18-alpine

ADD https://raw.githubusercontent.com/eficode/wait-for/v2.1.3/wait-for /usr/local/bin/wait-for
RUN chmod +x /usr/local/bin/wait-for

COPY wait-for-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-entrypoint.sh

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


CMD ["npm", "run", "dev"]