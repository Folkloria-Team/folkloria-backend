import { relations } from 'drizzle-orm'
import { char } from 'drizzle-orm/mysql-core'
import { mysqlTable } from 'drizzle-orm/mysql-core'
import { uuidv7 } from 'infra/utils/uuidv7'
import { story } from './story'

export const province = mysqlTable('provinces', {
  id: char({ length: 36 })
    .primaryKey()
    .$default(() => uuidv7()),
  name: char({ length: 100 }).notNull(),
  code: char({ length: 10 }).notNull().unique(),
})

export const provinceRelations = relations(province, ({ many }) => ({
  stories: many(story),
}))
