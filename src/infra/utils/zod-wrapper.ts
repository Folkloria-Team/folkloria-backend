import { ValidationTargets } from 'hono'
import { z, ZodSchema } from 'zod'
import { zValidator as zv } from '@hono/zod-validator'

export const validator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result) => {
    if (!result.success) {
      throw new z.ZodError(result.error.issues)
    }
  })
