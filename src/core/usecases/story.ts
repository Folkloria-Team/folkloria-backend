import { storyRepository } from 'core/repositories/story'
import { story } from 'infra/db/schema/story'

async function createStory(data: typeof story.$inferInsert) {
  const createStory = await storyRepository.createStory(data)

  return createStory
}

async function getAllStories() {
  const stories = await storyRepository.getAllStories()
  return stories
}

async function getStoryById(id: string) {
  const story = await storyRepository.getStoryById(id)
  return story
}

async function getStoriesByProvince(provinceId: string) {
  const stories = await storyRepository.getStoriesByProvince(provinceId)
  return stories
}

async function updateStory(
  id: string,
  data: Partial<typeof story.$inferInsert>
) {
  const updatedStory = await storyRepository.updateStory(id, data)
  return updatedStory
}

async function deleteStory(id: string) {
  const deletedStory = await storyRepository.deleteStory(id)
  return deletedStory
}

export const storyUseCase = {
  createStory,
  getAllStories,
  getStoryById,
  getStoriesByProvince,
  updateStory,
  deleteStory,
}
