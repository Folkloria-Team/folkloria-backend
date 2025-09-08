import { Hono } from 'hono'
import { logger } from 'infra/services/winston'
import { router } from './routes'
import { cors } from 'hono/cors'
import type { JwtVariables } from 'hono/jwt'
import { errorHandler } from 'infra/utils/error'
import { authMiddleware } from './middlewares/auth'

type Variables = JwtVariables

const app = new Hono<{ Variables: Variables }>()

app.onError(errorHandler)

// fix issue with cors make it dynamic
app.use(cors())

// error handler

// jwt middleware
app.use('*', authMiddleware)

app.route('/', router)

logger.info(`🚀 Server is running on port ${process.env.PORT}`)

export default {
  port: process.env.PORT,
  fetch: app.fetch,
}
