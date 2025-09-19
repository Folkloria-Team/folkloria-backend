import { storyController } from 'app/controllers/story'
import { Hono } from 'hono'

export const storyRouter = new Hono()

storyRouter.post('/', ...storyController.storyCreateController)
storyRouter.get('/', ...storyController.storyListController)
storyRouter.get('/:id', ...storyController.storyByIdController)
storyRouter.get(
  '/province/:provinceId',
  ...storyController.storyByProvinceController
)
storyRouter.put('/:id', ...storyController.storyUpdateController)
storyRouter.delete('/:id', ...storyController.storyDeleteController)
