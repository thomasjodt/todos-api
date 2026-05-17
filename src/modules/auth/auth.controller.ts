import { Elysia } from 'elysia'
import { db } from '@/config/db'
import { userService } from '@/modules/user/user.service'
import { userRepository } from '@/modules/user/user.repository'
import jwt from '@elysia/jwt'
import { env } from '@/config'
import { authService } from '@/modules/auth/auth.service'
import { loginSchema, registerSchema } from './auth.model'

const repo = userRepository(db)
const user = userService(repo)
const auth = authService(user)

export const authController = new Elysia({ prefix: '/auth' })
  .use(jwt({ name: 'jwt', secret: env.JWT_SECRET }))
  .post('/login', async ({ body, jwt, set }) => {
    try {
      const { email, password, username } = body
      const userIdentifier = (email ?? username) as string

      const user = await auth.login(userIdentifier, password)
      const token = await jwt.sign({ id: user.id, exp: '3m' })
      const refreshToken = await jwt.sign({ id: user.id, exp: '7d' })

      return { token, refreshToken }
    }

    // TODO: Mover toda la lógica hacia un middleware para manejar los errores
    catch (error) {
      set.status = 401
      throw new Error('Invalid credentials')
    }
  }, { body: loginSchema })
  .post('/register', async ({ body }) => {
    return await user.createUser(body)
  }, { body: registerSchema })
