import { authUseCase } from 'core/usecases/auth'
import { createFactory } from 'hono/factory'
import { loginSchema, registerSchema } from 'infra/validators/auth'
import { setSignedCookie } from 'hono/cookie'
import { env } from 'infra/utils/env'
import { createdUserResponseJSON } from 'infra/utils/response'
import { validator } from 'infra/utils/zod-wrapper'

const factory = createFactory()

const authLoginController = factory.createHandlers(
  validator('json', loginSchema),
  async (c) => {
    const { username, password } = c.req.valid('json')

    const { accessToken, refreshToken, user } = await authUseCase.login(
      username,
      password
    )

    setSignedCookie(c, 'refreshToken', refreshToken, env.COOKIE_SECRET_KEY, {
      httpOnly: env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      sameSite: 'lax',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: '/',
      domain: env.APP_URL ?? 'localhost:3000',
      secure: env.NODE_ENV === 'production',
    })

    setSignedCookie(c, 'accessToken', accessToken, env.COOKIE_SECRET_KEY, {
      httpOnly: env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      sameSite: 'lax',
      expires: new Date(Date.now() + 60 * 60 * 1000),
      path: '/',
      domain: env.APP_URL ?? 'localhost:3000',
      secure: env.NODE_ENV === 'production',
    })

    return createdUserResponseJSON(c, 'Login success', {
      accessToken,
      refreshToken,
      user,
    })
  }
)

const authRegisterController = factory.createHandlers(
  validator('json', registerSchema),
  async (c) => {
    const { username, password } = c.req.valid('json')
    const { user } = await authUseCase.register(username, password)

    return createdUserResponseJSON(c, 'Register success', {
      user,
    })
  }
)

export const authController = { authLoginController, authRegisterController }
