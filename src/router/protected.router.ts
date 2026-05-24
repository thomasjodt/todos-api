import { Elysia } from 'elysia'
import jwt from '@elysia/jwt'
import bearer from '@elysia/bearer'

import { env } from '@/config'
import { db } from '@/config/db'
import { userController } from '@/modules/user'
import { AuthorizationError } from '@/shared/errors/auth.error'

export const protectedRouter = new Elysia({ prefix: '/api'})
  .use(bearer())
  .use(jwt({ name: 'jwt', secret: env.JWT_ACCESS_SECRET }))
  .derive(async ({ jwt, bearer }) => {
    if (!bearer) throw new AuthorizationError('Authorization header not found')

    const payload = await jwt.verify(bearer)
    if (!payload) throw new AuthorizationError('Invalid or expired token')

    return { userId: payload.id }
  })
  .use(userController(db))
