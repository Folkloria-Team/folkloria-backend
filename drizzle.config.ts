import { type Config } from 'drizzle-kit'

export default {
  schema: './src/infra/db/schema',
  out: './src/infra/db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config
