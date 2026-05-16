import { Elysia } from 'elysia'
import cors from '@elysia/cors'
import openapi, { fromTypes } from '@elysia/openapi'

const app = new Elysia()
  .use(cors())
  .use(openapi({ references: fromTypes() }))
  .get('/health', () => 'ok').listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
