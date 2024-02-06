import { FastifyInstance } from "fastify";
import { register } from "./user.controller";

export async function userRoute (server: FastifyInstance) {
    server.post('/register', register)
}