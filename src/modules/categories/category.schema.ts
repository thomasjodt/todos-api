import { pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull(),

  name: text('name')
    .notNull(),

  color: text('color'),

  createdAt: timestamp('created_at').defaultNow().notNull()
}, (table) => [
  uniqueIndex('categories_user_name_idx').on(table.userId, table.name)
])
