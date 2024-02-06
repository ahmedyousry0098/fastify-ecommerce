import { buildJsonSchemas } from 'fastify-zod'
import {z} from 'zod'

export const createCategorySchema = z.object({
    name: z.string().min(2).max(50),
    parent_id: z.string().optional(),
    file: z.object({
        fieldname: z.string(),
        originalname: z.string(),
        encoding: z.string(),
        mimetype: z.string(),
        destination: z.string(),
        filename: z.string(),
        path: z.string(),
        size: z.number()
    }).optional()
})

export const updateCategorySchema = z.object({
    name: z.string().optional(),
    parent_id: z.string().optional(),
    file: z.object({
        fieldname: z.string(),
        originalname: z.string(),
        encoding: z.string(),
        mimetype: z.string(),
        destination: z.string(),
        filename: z.string(),
        path: z.string(),
        size: z.number()
    }).optional(),
})

export const categoryParamsSchema = z.object({
    categoryId: z.string().uuid('please enter valid uuid')
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>
export type CategoryParams = z.infer<typeof categoryParamsSchema>

export const {schemas: categorySchemas, $ref} = buildJsonSchemas({
    createCategorySchema,
    updateCategorySchema,
    categoryParamsSchema
})