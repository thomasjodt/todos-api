import { env } from './config'
import { Elysia } from 'elysia'
import cors from '@elysia/cors'
import openapi, { fromTypes } from '@elysia/openapi'
import { userController } from '@/modules/user'
import { authController } from '@/modules/auth'
import { globalErrorHandler } from '@/shared/middleware/error.middleware'
import { AppError } from '@/shared/errors/app.error'

const app = new Elysia()
  .use(cors())
  .use(openapi({ references: fromTypes() }))
  .onError(globalErrorHandler)
  .use(authController)
  .use(userController)
  .listen(env.PORT)

console.log(
  `🦊 Elysia is running in ${env.NODE_ENV} mode at ${app.server?.hostname}:${app.server?.port}`
)
