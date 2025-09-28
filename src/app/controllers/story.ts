import { storyUseCase } from 'core/usecases/story'
import { createFactory } from 'hono/factory'
import { validator } from 'infra/utils/zod-wrapper'
import { updateStorySchema } from 'infra/validators/story'
import { randomUUID } from 'crypto'
import fs from 'fs'

const factory = createFactory()

const storyCreateController = factory.createHandlers(async (c) => {
  const body = await c.req.parseBody()

  const title = body['title'] as string
  const content = body['content'] as string
  const sinopsis = body['sinopsis'] as string
  const province_id = body['province_id'] as string
  const cover = body['cover'] as File // 👈 File object

  // Simpan file (pakai Bun)
  const buffer = Buffer.from(await cover.arrayBuffer())
  fs.writeFileSync(`./uploads/${cover.name}`, buffer)

  const createStory = await storyUseCase.createStory({
    title,
    content,
    sinopsis,
    province_id,
    cover: `/uploads/${cover.name}`, // simpan path di DB
  })

  return c.json(
    { message: 'Story created successfully', data: createStory },
    201
  )
})

const storyListController = factory.createHandlers(async (c) => {
  const stories = await storyUseCase.getAllStories()
  return c.json({ message: 'Stories retrieved successfully', data: stories })
})

const storyByIdController = factory.createHandlers(async (c) => {
  const id = c.req.param('id') ?? '0'
  const story = await storyUseCase.getStoryById(id)

  if (!story) {
    return c.json({ message: 'Story not found' }, 404)
  }

  return c.json({ message: 'Story retrieved successfully', data: story })
})

const storyByProvinceController = factory.createHandlers(async (c) => {
  const provinceId = c.req.param('provinceId') ?? '0'
  const stories = await storyUseCase.getStoriesByProvince(provinceId)

  if (!stories) {
    return c.json({ message: 'No stories found for this province' }, 404)
  }

  return c.json({ message: 'Stories retrieved successfully', data: stories })
})

const storyUpdateController = factory.createHandlers(
  // validator('json', updateStorySchema),
  async (c) => {
    const id = c.req.param('id') ?? '0'
    const body = await c.req.parseBody()

    const title = body['title'] as string
    const content = body['content'] as string
    const sinopsis = body['sinopsis'] as string
    const province_id = body['province_id'] as string
    const cover = body['cover'] as File | undefined // cover bisa opsional

    let coverPath: string | undefined

    if (cover) {
      // cari story lama
      const oldStory = await storyUseCase.getStoryById(id)

      // hapus file lama jika ada
      if (oldStory?.cover) {
        const oldPath = `.${oldStory.cover}`
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath)
        }
      }

      // buat nama file unik
      const ext = cover.name.split('.').pop()
      const fileName = `${randomUUID()}.${ext}`

      const buffer = Buffer.from(await cover.arrayBuffer())
      await Bun.write(`./uploads/${fileName}`, buffer)

      coverPath = `/uploads/${fileName}`
    }

    const updateStory = await storyUseCase.updateStory(id, {
      title,
      sinopsis,
      content,
      cover: coverPath,
      province_id,
    })
    return c.json(
      { message: 'Story updated successfully', data: updateStory },
      200
    )
  }
)

const storyDeleteController = factory.createHandlers(async (c) => {
  const id = c.req.param('id') ?? '0'
  await storyUseCase.deleteStory(id)
  return c.json({ message: 'Story deleted successfully' }, 200)
})

export const storyController = {
  storyCreateController,
  storyListController,
  storyByIdController,
  storyByProvinceController,
  storyUpdateController,
  storyDeleteController,
}
