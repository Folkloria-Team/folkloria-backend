import { Hono } from 'hono'
import { logger } from 'infra/services/winston'
import { router } from './routes'
import { cors } from 'hono/cors'
import type { JwtVariables } from 'hono/jwt'
import { errorHandler } from 'infra/utils/error'
import { authMiddleware } from './middlewares/auth'
import fs from 'fs'
import path from 'path'

type Variables = JwtVariables

const app = new Hono<{ Variables: Variables }>()

app.onError(errorHandler)

// fix issue with cors make it dynamic
app.use(cors())

// error handler

// jwt middleware
// app.use('*', authMiddleware)

app.route('/api/', router)

app.get('/api/uploads/:filename', async (c) => {
  const filename = c.req.param('filename')
  const filePath = path.join('./uploads', filename)

  if (!fs.existsSync(filePath)) {
    return c.json({ error: 'File not found' }, 404)
  }

  // stream file ke response
  const fileStream = fs.createReadStream(filePath)
  return new Response(fileStream as any)
})

logger.info(`🚀 Server is running on port ${process.env.PORT}`)

export default {
  port: process.env.PORT,
  fetch: app.fetch,
}
