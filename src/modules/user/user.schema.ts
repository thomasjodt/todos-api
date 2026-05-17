import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  username: text('username').unique(),
  email: text('email').notNull(),
  password: text('password').notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = Omit<typeof users.$inferInsert, 'username'>
