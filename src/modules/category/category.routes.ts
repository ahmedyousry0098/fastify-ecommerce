import { FastifyInstance } from "fastify";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./category.controller";
import { $ref, categoryParamsSchema, createCategorySchema, updateCategorySchema } from "./category.schema";
import { buildJsonSchemas } from "fastify-zod";
import zodToJsonSchema from "zod-to-json-schema";
import { upload } from "../../utils/multer";
import { asyncHandler } from "../../utils/errorHandler";

export async function categoryRoutes(server: FastifyInstance) {
    server.post(
        '/create', 
        {
            schema: {
                // body: zodToJsonSchema(createCategorySchema)
            },
            preHandler: [upload.single('picture')],
        },
        asyncHandler(createCategory)
    )

    server.get(
        '/all-categories', 
        asyncHandler(getCategories)
    )

    server.put(
        '/:categoryId/update',
        {
            schema: {
                // body: zodToJsonSchema(updateCategorySchema),
                params: zodToJsonSchema(categoryParamsSchema)
            },
            preHandler: upload.single('picture')
        },
        asyncHandler(updateCategory)
    )

    server.delete(
        '/:categoryId/delete',
        {
            schema: {
                params: zodToJsonSchema(categoryParamsSchema)
            }
        },
        asyncHandler(deleteCategory)
    )
}