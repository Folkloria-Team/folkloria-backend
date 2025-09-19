import { eq } from 'drizzle-orm'
import { db } from 'infra/db'
import { users } from 'infra/db/schema/user'

async function createUser(username: string, password: string) {
  const user = await db
    .insert(users)
    .values({
      username,
      password: password,
    })
    .$returningId()

  return user
}

async function getUserByUsername(username: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  return user
}

export const userRepository = {
  createUser,
  getUserByUsername,
}
