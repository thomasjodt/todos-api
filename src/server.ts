import { env } from './config'
import { Elysia } from 'elysia'
import cors from '@elysia/cors'
import openapi, { fromTypes } from '@elysia/openapi'

import { protectedRouter, publicRouter } from './router'
import { globalErrorHandler } from '@/shared/middleware/error.middleware'

const app = new Elysia()
  .use(cors())
  .use(openapi({ references: fromTypes() }))
  .onError(globalErrorHandler)
  .use(publicRouter)
  .use(protectedRouter)
  .listen(env.PORT)

console.log(
  `🦊 Elysia is running in ${env.NODE_ENV} mode at ${app.server?.hostname}:${app.server?.port}`
)
