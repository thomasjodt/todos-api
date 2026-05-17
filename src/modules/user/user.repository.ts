import { count } from 'drizzle-orm'
import { Db } from '@/config/db'

import { users } from './user.schema'
import { type NewUser, UserRepository } from './user.types'

export const userRepository = (db: Db): UserRepository => ({
  count: async () => {
    const [counter] = await db.select({ total: count() }).from(users)
    return counter.total
  },
  getUsers: async (page: number, limit: number) => {
    return db.select().from(users)
      .limit(limit)
      .offset((page - 1) * limit)
  },
  createUser: async (user: NewUser) => {
    const [newUserID] = await db.insert(users)
      .values(user)
      .returning({ id: users.id })

    if (!newUserID) {
      // TODO: Crear nuevo error
      throw new Error('Failed to create user')
    }
    return newUserID
  }
})
