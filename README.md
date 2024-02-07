Backend Developer Assignment
Assignment Description
This project is a backend application developed using the latest version of Fastify with TypeScript. 
It includes database migrations using Prisma and CRUD API endpoints for managing categories and products. 
The application utilizes MySQL as the database and implements features such as displaying categories as a tree structure, counting products of recursive children categories, 
and resizing images while uploading.

Instructions
Prerequisites
- Node.js installed on your machine
- MySQL database server running locally or remotely

Installation:
1- Clone the repository:
  git clone https://github.com/your-username/backend-project.git
2- Navigate to the project directory:
  cd fastify-ecommerce
3- Install dependencies:
  npm install 
  npx prisma generate

Database Setup
- Ensure MySQL database server is running.

- Create a MySQL database named ecommerce.

Running Migrations
Run the database migrations to create the necessary tables:
  npm run migrate dev --name init

Starting the Server
Start the Fastify server:
  npm run start:dev

API Documentation
(https://documenter.getpostman.com/view/19178013/2s9Yyy8dkF)

Docker Deployment
To deploy the project using Docker:
 docker-compose -f docker-compose.yml up 
