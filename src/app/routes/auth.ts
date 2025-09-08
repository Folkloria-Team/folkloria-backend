import { authController } from 'app/controllers/auth'
import { Hono } from 'hono'

export const authRouter = new Hono()

authRouter.post('/login', ...authController.authLoginController)
