import { reset } from 'drizzle-seed'
import { db } from '.'
import { schema } from './schema'

async function resetSeeder() {
  try {
    await reset(db, schema)

    console.log('🚀 : Reset Seeder Success ✅')
    process.exit(0)
  } catch (error) {
    console.error('🚀 : Reset Seeder Error ❌')

    console.error(error)

    process.exit(1)
  }
}

resetSeeder()
