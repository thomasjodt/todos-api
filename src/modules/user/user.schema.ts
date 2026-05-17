import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
})
