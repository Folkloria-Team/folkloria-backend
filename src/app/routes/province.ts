import { provinceController } from 'app/controllers/province'
import { Hono } from 'hono'

export const provinceRouter = new Hono()

provinceRouter.get('/', ...provinceController.provinceGetAllController)
