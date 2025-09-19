import { v7 as uuidv7 } from 'uuid'
import { users } from './user'
import { relations, sql } from 'drizzle-orm'
import { mysqlTable } from 'drizzle-orm/mysql-core'
import { varchar } from 'drizzle-orm/mysql-core'
import { timestamp } from 'drizzle-orm/mysql-core'
import { char } from 'drizzle-orm/mysql-core'

export const refreshToken = mysqlTable('refresh_token', {
  id: char({ length: 36 })
    .primaryKey()
    .$default(() => uuidv7()),
  user_id: char({ length: 36 })
    .notNull()
    .references(() => users.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    })
    .unique(),
  token: varchar({ length: 255 }).notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updatedAt', { mode: 'date' }),
})

export const RefreshTokenRelation = relations(refreshToken, ({ one }) => ({
  user: one(users, { fields: [refreshToken.user_id], references: [users.id] }),
}))
