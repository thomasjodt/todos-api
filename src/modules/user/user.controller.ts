import { Elysia, t } from 'elysia'
import { db } from '@/config/db'
import { userService } from '@/modules/user/user.service'
import { userRepository } from '@/modules/user/user.repository'

export const userController = new Elysia({ prefix: '/users' })
  .get('/', async ({ query }) => {
    const { page, limit } = query

    const repo = userRepository(db)
    const user = userService(repo)

    return await user.getUsers(page, limit)
  },
    {
      query: t.Object({
        page: t.Number({ default: 1 }),
        limit: t.Number({ default: 10 })
      })
    }
  )
