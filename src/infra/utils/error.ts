import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

export const errorHandler = (
  err: Error | HTTPException | z.ZodError,
  c: Context
) => {
  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status)
  }
  if (err instanceof z.ZodError) {
    return c.json(
      {
        message: 'Validation Error',
        errors: err.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      },
      400
    )
  }
  return c.json({ message: 'Something went wrong' }, 500)
}
