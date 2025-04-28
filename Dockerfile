FROM node:18 as base

WORKDIR /usr/src/app

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build

COPY package*.json ./
RUN npm install

RUN npm install -g typescript

COPY . .

RUN tsc

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM postgres:15

# Copy schema.sql into the special initialization folder
COPY src/db/schema.sql /docker-entrypoint-initdb.d/