import { char } from 'drizzle-orm/mysql-core'
import { text } from 'drizzle-orm/mysql-core'
import { mysqlTable } from 'drizzle-orm/mysql-core'
import { uuidv7 } from 'infra/utils/uuidv7'
import { province } from './province'
import { relations } from 'drizzle-orm'

export const story = mysqlTable('story', {
  id: char({ length: 36 })
    .primaryKey()
    .$default(() => uuidv7()),
  province_id: char({ length: 36 })
    .notNull()
    .references(() => province.id, { onDelete: 'cascade' }),
  title: char({ length: 255 }).notNull(),
  sinopsis: text().notNull(),
  content: text().notNull(),
  cover: char({ length: 255 }).notNull(),
})

export const storyRelations = relations(story, ({ one }) => ({
  province: one(province, {
    fields: [story.province_id],
    references: [province.id],
  }),
}))
