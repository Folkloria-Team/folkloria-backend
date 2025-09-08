import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string({
      required_error: 'Username harus diisi',
    })
    .min(3, 'Username minimal 3 karakter')
    .max(255, 'Username maksimal 255 karakter'),
  password: z
    .string({
      required_error: 'Password harus diisi',
    })
    .min(6, 'Password minimal 6 karakter')
    .max(255, 'Password maksimal 255 karakter'),
})
