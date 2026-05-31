import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from '@/modules/user'

export const lists = pgTable('lists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade'
    }),
  name: text('name').notNull(),
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull()
})

export type List = typeof lists.$inferSelect
export type NewList = typeof lists.$inferInsert