import { Elysia } from 'elysia'
import { db } from '@/config/db'
import { userService } from '@/modules/user/user.service'
import { userRepository } from '@/modules/user/user.repository'
import jwt from '@elysia/jwt'
import { env } from '@/config'

const repo = userRepository(db)
const user = userService(repo)

export const authController = new Elysia({ prefix: '/auth' })
  .use(jwt({ name: 'jwt', secret: env.JWT_SECRET }))
  .post('/login', () => 'login')
  .post('/register', () => 'register')
