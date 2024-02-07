import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string(),
    categoryId: z.string().uuid()
})

export const updateProductSchema = z.object({
    name: z.string().optional(),
    categoryId: z.string().uuid().optional()
})

export const productParamsSchema = z.object({
    productId: z.string().uuid('please enter valid uuid')
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ProductPatams = z.infer<typeof productParamsSchema>
