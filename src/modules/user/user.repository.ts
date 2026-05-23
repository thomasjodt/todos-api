import { count, eq } from 'drizzle-orm'
import { Db } from '@/config/db'

import { users } from './user.schema'
import { type NewUser, UserRepository } from './user.types'

const userDtoFields = {
  id: users.id,
  name: users.name,
  username: users.username,
  email: users.email
}

export const userRepository = (db: Db): UserRepository => ({
  count: async () => {
    const [counter] = await db.select({ total: count() }).from(users)
    return counter.total
  },
  getUsers: async (page: number, limit: number) => {
    return db.select(userDtoFields).from(users)
      .limit(limit)
      .offset((page - 1) * limit)
  },
  createUser: async (user: NewUser) => {
    const [newUserID] = await db.insert(users)
      .values(user)
      .returning({ id: users.id })
    return newUserID
  },
  findUserByEmail: async (email) => {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return user ?? null
  },
  findUserByUsername: async (username) => {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    return user ?? null
  },
  updateUsername: async (id: string, newUsername: string): Promise<boolean> => {
    const [response] = await db.update(users)
      .set({ username: newUsername })
      .where(eq(users.id, id))
      .returning({ username: users.username })

    if (response === null) return false
    return response.username === newUsername
  }
})
