import { userRepository } from 'core/repositories/user'
import * as bcrypt from 'bcryptjs'
import { HTTPException } from 'hono/http-exception'
import { env } from 'infra/utils/env'
import { sign } from 'hono/jwt'
import { tokenRepository } from 'core/repositories/token'

async function login(username: string, password: string) {
  const user = await userRepository.getUserByUsername(username)
  if (!user) {
    throw new HTTPException(404, { message: 'User Tidak Ditemukan' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new HTTPException(400, { message: 'Password Salah' })
  }

  const refreshTokenJWT = await sign(
    {
      sub: user.id,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    },
    env.JWT_SECRET
  )

  const accessTokenJWT = await sign(
    {
      sub: user.id,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 15 * 60,
    },
    env.JWT_SECRET
  )

  tokenRepository.insertToken(refreshTokenJWT, user.id)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user

  return {
    accessToken: accessTokenJWT,
    refreshToken: refreshTokenJWT,
    user: userWithoutPassword,
  }
}

async function register(username: string, password: string) {
  const existingUser = await userRepository.getUserByUsername(username)
  if (existingUser) {
    throw new HTTPException(400, { message: 'Username sudah digunakan' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const userId = await userRepository.createUser(username, hashedPassword)
  if (!userId) {
    throw new HTTPException(500, { message: 'Gagal membuat user' })
  }

  return { user: userId }
}

export const authUseCase = {
  login,
  register,
}
