import { Elysia, t } from 'elysia'
import { db } from '@/config/db'
import { userService } from './user.service'
import { userRepository } from './user.repository'
import { createUserModel, getUsersModel, updateUsernameModel } from './user.model'

const repo = userRepository(db)
const user = userService(repo)

export const userController = new Elysia({ prefix: '/users' })
  .get('/', async ({ query }) => {
    const { page, limit } = query
    return await user.getUsers(page, limit)
  },
    { query: getUsersModel }
  )
  .post('/', async ({ body }) => {
    const { email, name, password } = body
      const userId = await user.createUser({ email, name, password })
    return userId.id
    },
    { body: createUserModel, response: t.String() }
  )
  .patch('/:id/username', async ({ params, body }) => {
    const { id } = params
    const isUpdated: boolean = await user.updateUsername(id, body.username)
    return { success: isUpdated }
  }, { body: updateUsernameModel, response: t.Object({ success: t.Boolean() }) })
