import z from 'zod'

export const createStorySchema = z.object({
  title: z
    .string({
      required_error: 'Title harus diisi',
    })
    .min(3, 'Title minimal 3 karakter')
    .max(255, 'Title maksimal 255 karakter'),
  sinopsis: z
    .string({
      required_error: 'Sinopsis harus diisi',
    })
    .min(10, 'Sinopsis minimal 10 karakter'),
  content: z
    .string({
      required_error: 'Content harus diisi',
    })
    .min(10, 'Content minimal 10 karakter'),
  cover: z
    .string({
      required_error: 'Image URL harus diisi',
    })
    .url('Image URL harus berupa URL yang valid'),
  province_id: z
    .string({
      required_error: 'Province ID harus diisi',
    })
    .uuid('Province ID harus berupa UUID yang valid'),
})

export const updateStorySchema = z
  .object({
    title: z
      .string()
      .min(3, 'Title minimal 3 karakter')
      .max(255, 'Title maksimal 255 karakter')
      .optional(),
    sinopsis: z.string().min(10, 'Sinopsis minimal 10 karakter').optional(),
    content: z.string().min(10, 'Content minimal 10 karakter').optional(),
    cover: z.string().url('Image URL harus berupa URL yang valid').optional(),
    province_id: z
      .string()
      .uuid('Province ID harus berupa UUID yang valid')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Setidaknya satu field harus diupdate',
    path: ['title', 'content', 'image_url', 'province_id'],
  })
