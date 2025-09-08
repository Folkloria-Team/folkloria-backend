import { Context } from 'hono'

export const createdUserResponseJSON = (
  c: Context,
  message: string,
  data: unknown
) => {
  return c.json(
    {
      message,
      data,
    },
    201
  )
}
