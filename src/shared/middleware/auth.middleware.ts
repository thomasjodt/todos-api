import { Elysia } from 'elysia'
import jwt from '@elysia/jwt'
import { env } from '@/config'
import { AuthorizationError } from '@/shared/errors/auth.error'

export const authMiddleware = new Elysia({ name: 'auth' })
  .use(jwt({ name: 'jwt', secret: env.JWT_ACCESS_SECRET }))
  .derive(async ({ jwt, headers }) => {
    const authHeader: string | undefined = headers['authorization']

    if (!authHeader) {
      throw new AuthorizationError('Authorization header not found')
    }

    if (!authHeader?.startsWith('Bearer')) {
      throw new AuthorizationError('Authorization header must be in the format Bearer "<token>"')
    }

    const token: string = authHeader.split(' ')[1]
    const payload = await jwt.verify(token)

    if (!payload || typeof payload.id !== 'string') {
      throw new AuthorizationError('Invalid or expired token')
    }

    return {
      userId: payload.id
    }
  })