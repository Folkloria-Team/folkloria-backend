import { varchar } from 'drizzle-orm/mysql-core'
import { mysqlEnum } from 'drizzle-orm/mysql-core'
import { char } from 'drizzle-orm/mysql-core'
import { mysqlTable } from 'drizzle-orm/mysql-core'
import { uuidv7 } from 'infra/utils/uuidv7'

export const users = mysqlTable('users', {
  id: char({ length: 36 })
    .primaryKey()
    .$default(() => uuidv7()),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: mysqlEnum('role', ['admin', 'user']).notNull().default('user'),
})
