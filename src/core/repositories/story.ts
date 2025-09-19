import { eq } from 'drizzle-orm'
import { db } from 'infra/db'
import { story } from 'infra/db/schema/story'

async function createStory(data: typeof story.$inferInsert) {
  const newStory = await db.insert(story).values(data)

  return newStory
}

async function getAllStories() {
  const stories = await db.select().from(story)
  return stories
}

async function getStoryById(id: string) {
  const foundStory = await db.query.story.findFirst({
    where: (story) => eq(story.id, id),
  })
  return foundStory
}

async function getStoriesByProvince(provinceId: string) {
  const stories = await db
    .select()
    .from(story)
    .where(eq(story.province_id, provinceId))
  return stories
}

async function updateStory(
  id: string,
  data: Partial<typeof story.$inferInsert>
) {
  const updatedStory = await db.update(story).set(data).where(eq(story.id, id))
  return updatedStory
}

async function deleteStory(id: string) {
  const deletedStory = await db.delete(story).where(eq(story.id, id))
  return deletedStory
}

export const storyRepository = {
  createStory,
  getAllStories,
  getStoryById,
  getStoriesByProvince,
  updateStory,
  deleteStory,
}
