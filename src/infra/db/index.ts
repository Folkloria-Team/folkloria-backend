import { schema } from './schema'
import { relations } from './relations'
import { env } from 'infra/utils/env'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

/**
 * Cache the database connection in development.
 * This avoids creating a new connection on every HMR update.
 */
const globalForDb = globalThis as unknown as {
  conn: mysql.Pool | undefined
}

// bikin pool connection pakai DATABASE_URL
const conn =
  globalForDb.conn ??
  mysql.createPool({
    uri: env.DATABASE_URL,
  })

if (env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db = drizzle(conn, {
  schema: {
    ...schema,
    ...relations,
  },
  mode: 'default',
})
