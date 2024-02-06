FROM node:20.10.0 AS development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate dev --name init

CMD [ "npm", "run", "start:dev" ]