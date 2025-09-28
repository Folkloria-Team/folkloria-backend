import { Hono } from 'hono'
import { authRouter } from './auth'
import { storyRouter } from './story'
import { provinceRouter } from './province'

export const router = new Hono()

router.route('/auth', authRouter)
router.route('/story', storyRouter)
router.route('/province', provinceRouter)
