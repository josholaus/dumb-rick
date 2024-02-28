import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { serverTiming } from '@elysiajs/server-timing'
import { quotePlugin, discordPlugin } from './plugins'
import { database } from '../common/Database'

const server = new Elysia()
    .state('name', 'doofus-rick API')
    .state('version', 1)
    .decorate('database', database)
    .use(swagger())
    .use(cors())
    .use(serverTiming())
    .get('/', ({ store: { name, version }}) => ({ name, version }))
    .use(quotePlugin)
    .use(discordPlugin)

export { server }
export type Server = typeof server