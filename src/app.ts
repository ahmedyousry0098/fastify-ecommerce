import Fastify from 'fastify'
import { log } from 'console'
import prisma from './utils/prisma'
import { userRoute } from './modules/user/user.routes'
import { categoryRoutes } from './modules/category/category.routes'
import { categorySchemas } from './modules/category/category.schema'
import {contentParser} from 'fastify-multer'

const server = Fastify({logger: true})

async function main() {
    // for (let schema of categorySchemas) {
    //     server.addSchema(schema)
    // }
    server.register(contentParser)
    server.register(userRoute, {prefix: '/api'})
    server.register(categoryRoutes, {prefix: '/api/category'})
    server.listen({port: 3001, host: '0.0.0.0'}, (err) => {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
    })
}

prisma.$connect()
        .then(() => console.log('db connected successfully'))
        .catch((err) => log(err))

main()