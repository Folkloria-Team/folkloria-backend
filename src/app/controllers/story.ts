import { storyUseCase } from 'core/usecases/story'
import { createFactory } from 'hono/factory'
import { validator } from 'infra/utils/zod-wrapper'
import { createStorySchema, updateStorySchema } from 'infra/validators/story'

const factory = createFactory()

const storyCreateController = factory.createHandlers(
  validator('json', createStorySchema),
  async (c) => {
    const { title, content, cover, sinopsis, province_id } = c.req.valid('json')

    const createStory = await storyUseCase.createStory({
      title,
      sinopsis,
      content,
      cover,
      province_id,
    })

    return c.json(
      { message: 'Story created successfully', data: createStory },
      201
    )
  }
)

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
  validator('json', updateStorySchema),
  async (c) => {
    const id = c.req.param('id') ?? '0'
    const { title, content, sinopsis, cover, province_id } = c.req.valid('json')
    const updateStory = await storyUseCase.updateStory(id, {
      title,
      sinopsis,
      content,
      cover,
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
