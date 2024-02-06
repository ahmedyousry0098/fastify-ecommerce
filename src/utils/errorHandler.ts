import { FastifyReply, FastifyRequest } from "fastify";

export class ResponseError extends Error {
    constructor(public message: string, public status?: number) {
        super(message)
    }
}

export const asyncHandler = (Api: Function) => {
	return (request: FastifyRequest, reply: FastifyReply) =>
		Api(request, reply,).catch((err: ResponseError) => {
			return reply.status(err?.status || 500).send({message: 'Error has been occure', error: err.message});
		});
};