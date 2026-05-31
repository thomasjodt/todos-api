import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { lists } from '@/modules/list'
import { categories } from '@/modules/categories'

export const items = pgTable('items', {
  id: uuid('id').defaultRandom().primaryKey(),

  listId: uuid('list_id')
    .notNull()
    .references(() => lists.id, { onDelete: 'cascade' }),

  categoryId: uuid('category_id')
    .references(() => categories.id, { onDelete: 'set null' }),

  name: text('name')
    .notNull(),

  completed: boolean('completed')
    .default(false)
    .notNull(),

  position: integer('position')
    .default(0)
    .notNull(),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
})

export type Item = typeof items.$inferSelect
export type NewItem = typeof items.$inferInsert