import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { users } from '@/modules/user'
import { categories } from '@/modules/categories'

export const frequentItems = pgTable('frequent_items', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade'
    }),

  categoryId: uuid('category_id')
    .references(() => categories.id, { onDelete: 'set null' }),

  name: text('name')
    .notNull(),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull()
})

export type FrequentItem = typeof frequentItems.$inferSelect
export type NewFrequentItem = typeof frequentItems.$inferInsert