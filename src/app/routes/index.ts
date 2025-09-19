import { Hono } from 'hono'
import { authRouter } from './auth'
import { storyRouter } from './story'

export const router = new Hono()

router.route('/auth', authRouter)
router.route('/story', storyRouter)
