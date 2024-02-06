import Fastify from 'fastify'
import { userRoute } from './modules/user/user.routes'
import { PrismaClient } from '@prisma/client'
import { log } from 'console'
import prisma from './utils/prisma'

const server = Fastify({logger: true})

async function main() {
    server.register(userRoute, {prefix: '/api'})
    server.listen({port: 3000, host: '0.0.0.0'}, (err) => {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
    })
}

prisma.$connect()
        .then(() => console.log('connected successfully'))
        .catch((err) => log(err))

main()