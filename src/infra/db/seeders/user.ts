import { db } from '..'
import { users } from '../schema/user'

export async function userSeeder() {
  // Seed users here
  await db.insert(users).values([
    {
      username: 'user1@example.com',
      password: 'password1',
    },
    {
      username: 'user2@example.com',
      password: 'password2',
    },
  ])
}
