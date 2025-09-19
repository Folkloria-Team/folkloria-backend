import { Context, Next } from 'hono'
import { jwt } from 'hono/jwt'

import { env } from 'infra/utils/env'
import { EXCLUDE_PATH_AUTH_JWT } from 'infra/utils/path'

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const currentPath = new URL(c.req.url).pathname
    if (EXCLUDE_PATH_AUTH_JWT.some((path) => currentPath.startsWith(path))) {
      return next()
    }

    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ message: 'Unauthorized: no token provided' }, 401)
    }

    const jwtMiddleware = jwt({
      secret: env.JWT_SECRET,
    })

    return jwtMiddleware(c, next)
  } catch (error) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
}
