import { reset } from 'drizzle-seed'
import { db } from '.'
import { schema } from './schema'
import { userSeeder } from './seeders/user'
import { provinceSeeder } from './seeders/province'

async function databaseSeeder() {
  try {
    await reset(db, schema)
    await userSeeder()
    await provinceSeeder()
    console.log('🚀 : Generate Seeder Success ✅')
    process.exit(0)
  } catch (error) {
    console.error('🚀 : Generate Seeder Error ❌')

    console.error(error)

    process.exit(1)
  }
}

databaseSeeder()
