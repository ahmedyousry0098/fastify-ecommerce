import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { CategoryParams, CreateCategorySchema, UpdateCategorySchema, updateCategorySchema } from "./category.schema";
import { IFile } from "../../interfaces/file.interface";
import { ResponseError } from "../../utils/errorHandler";

declare module "fastify" {
    interface FastifyRequest {
      file: IFile;
    }
  }

export const createCategory = async (
    request: FastifyRequest, 
    reply: FastifyReply
) => {
    
    const {name, parent_id} = request.body as CreateCategorySchema
    const category = await prisma.category.create({
        data: {
            name,
            parent_id,
            picture: request?.file?.filename || null
        }
    })
    if (!category) {
        throw new ResponseError('Something Went Wrong Please Try Again', 500)
    }
    return reply.status(201).send({message: 'Category Created Successfully'})
}

export const getCategories = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const categories = await prisma.category.findMany({
        include: {
            child: true
        }
    })
    return reply.status(200).send(categories)
}

export const updateCategory = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const {categoryId} = request.params as CategoryParams
    const {name, parent_id} = request.body as UpdateCategorySchema

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })
    if (!category) {
        throw new ResponseError('Category Not Found', 404)
    }
    const updatedCategory = await prisma.category.update({
        where: {
            id: categoryId
        },
        data: {
            name,
            parent_id,
            picture: request?.file?.filename || null
        }
    })
    if (!updatedCategory) {
        throw new ResponseError('Something Went Wrong Please Try Again', 500)
    }
    return reply.status(200).send({message: 'updated successfully'})
}

export const deleteCategory = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const {categoryId} = request.params as CategoryParams
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })
    if (!category) {
        throw new ResponseError('Category Not Found', 404)
    }
    const deletedCategory = await prisma.category.delete({
        where: {
            id: categoryId
        }
    })
    if (!deletedCategory) {
        throw new ResponseError('Something Went Wrong Please Try Again', 500)
    }
    return reply.status(200).send({message: 'deleted successfully'})
}