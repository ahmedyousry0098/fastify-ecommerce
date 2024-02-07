FROM node:20.10.0 AS development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["wait-for-it", "mysql:3306", "--", "npm", "run", "start:dev"]