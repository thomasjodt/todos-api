import { authController } from '@/modules/auth'
import { Elysia } from 'elysia'

export const publicRouter = new Elysia()
  .use(authController)