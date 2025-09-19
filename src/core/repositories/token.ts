import { db } from 'infra/db'
import { refreshToken } from 'infra/db/schema/refresh-token'

import { users } from 'infra/db/schema/user'

async function insertToken(
  refreshTokenJWT: string,
  user_id: (typeof users.$inferSelect)['id']
) {
  const createOrUpdateToken = await db
    .insert(refreshToken)
    .values({
      user_id,
      token: refreshTokenJWT,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .onDuplicateKeyUpdate({
      set: {
        token: refreshTokenJWT,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
    })
  return createOrUpdateToken
}

export const tokenRepository = {
  insertToken,
}
