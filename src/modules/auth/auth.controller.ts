import { Elysia } from 'elysia'
import { db } from '@/config/db'
import { env } from '@/config'
import jwt from '@elysia/jwt'

import { authService } from './auth.service'
import { cookieSchema, loginSchema, registerSchema } from './auth.model'
import { userRepository, userService } from '@/modules/user'
import { User } from '@/modules/user/user.schema'
import {
  ExpiredRefreshTokenError,
  InvalidCredentialsError,
  InvalidRefreshTokenError,
  MissingRefreshTokenError
} from '@/modules/auth/auth.errors'

const repo = userRepository(db)
const user = userService(repo)
const auth = authService(user)

export const authController = new Elysia({ prefix: '/auth' })
  .use(jwt({ name: 'jwt', secret: env.JWT_ACCESS_SECRET }))
  .use(jwt({ name: 'refreshJWT', secret: env.JWT_REFRESH_SECRET }))
  .post('/login', async ({ body, jwt, refreshJWT, cookie }) => {
    const { email, password, username } = body

    const userIdentifier: string | undefined = email ?? username
    if (!userIdentifier) throw new InvalidCredentialsError('Email or username is required')

    const user: User = await auth.login(userIdentifier, password)

    const tokenExpiration: number = Math.floor(Date.now() / 1000) + 60 * 3
    const refreshTokenExpiration: number = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7

    const token: string = await jwt.sign({ id: user.id, exp: tokenExpiration })
    const refreshToken: string = await refreshJWT.sign({ id: user.id, exp: refreshTokenExpiration })

    cookie.refreshToken.set({
      value: refreshToken,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth',
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
    })

    return { token }
  }, { body: loginSchema, cookie: cookieSchema })
  .post('/register', async ({ body }) => {
    return await auth.register(body)
  }, { body: registerSchema })
  .post('/refresh', async ({ jwt, refreshJWT, cookie }) => {
    const refreshToken: string | undefined = cookie.refreshToken.value
    if (!refreshToken) throw new MissingRefreshTokenError()

    const payload = await refreshJWT.verify(refreshToken)
    if (!payload || typeof payload.id !== 'string') throw new InvalidRefreshTokenError()
    if (
      typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now()/ 1000)
    ) throw new ExpiredRefreshTokenError()

    const tokenExpiration: number = Math.floor(Date.now() / 1000) + 60 * 3
    const token: string = await jwt.sign({ id: payload.id, exp: tokenExpiration })
    return { token }
  },
    { cookie: cookieSchema }
  )
  .post('/logout', async ({ cookie }) => {
    cookie.refreshToken.remove()
    return { success: true }
  }, { cookie: cookieSchema })
