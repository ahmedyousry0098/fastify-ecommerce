import { FastifyInstance } from "fastify";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "./product.controller";
import { asyncHandler } from "../../utils/errorHandler";
import { upload } from "../../utils/multer";
import zodToJsonSchema from "zod-to-json-schema";
import { createProductSchema, productParamsSchema } from "./product.schema";

export async function productRoutes(server: FastifyInstance) {
    server.post(
        '/create',
        {
            preHandler: [upload.single('picture')],
        },
        asyncHandler(createProduct)
    )

    server.put(
        '/:productId/update',
        {
            schema: {
                params: zodToJsonSchema(productParamsSchema)
            },
            preHandler: [upload.single('picture')]
        },
        asyncHandler(updateProduct)
    )

    server.delete(
        ':/productId',
        {
            schema: {
                params: zodToJsonSchema(productParamsSchema)
            }
        },
        asyncHandler(deleteProduct)
    )

    server.get(
        '/all-products',
        asyncHandler(getAllProducts)
    )
}