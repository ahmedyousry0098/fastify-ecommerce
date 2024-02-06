FROM node:20.10.0 AS development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]