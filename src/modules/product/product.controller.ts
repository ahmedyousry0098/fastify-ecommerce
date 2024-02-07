import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput, ProductPatams, UpdateProductInput } from "./product.schema";
import prisma from "../../utils/prisma";
import { ResponseError } from "../../utils/errorHandler";


export const createProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const {name, categoryId} = request.body as CreateProductInput
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })
    if (!category) {
        throw new ResponseError('Category Not Found', 400)
    }
    const product = await prisma.product.create({
        data: {
            name,
            categoryId: categoryId,
            picture: request.file?.filename || null
        }
    })
    if (!product) {
        throw new ResponseError('Something Went Wrong Please Try Again')
    }
    return reply.status(201).send({message: 'product created successfully'})
}

export const updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const {productId} = request.params as ProductPatams
    const {name, categoryId} = request.body as UpdateProductInput
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) {
        throw new ResponseError('Product Not Found', 400)
    }
    if (categoryId) {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        })
        if (!category) {
            throw new ResponseError('Category Not Exist', 400)
        }
    }
    const updatedProduct = await prisma.product.update({
        where: {
            id: productId
        }, 
        data:{ 
            ...request.body as UpdateProductInput, 
            picture: request.file?.filename
        }
    })
    return reply.status(200).send({message: 'Updated Successfully'})
}

export const deleteProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    const {productId} = request.params as ProductPatams
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) {
        throw new ResponseError('Product Not Found', 400)
    }
    await prisma.product.delete({
        where: {
            id: productId
        }
    })
    return reply.status(200).send({message: 'deleted successfully'})
}

export const getAllProducts = async(request: FastifyRequest, reply: FastifyReply) => {
    const products = await prisma.product.findMany({
        include: {
            category: true
        }
    })
    return reply.status(200).send({products, message: 'done'})
}