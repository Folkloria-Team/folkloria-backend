export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORTS: process.env.PORTS || '3000',
  DATABASE_URL:
    process.env.DATABASE_URL || 'mysql://root:@localhost:3306/db_folkloria',
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || '10',
  JWT_SECRET: process.env.JWT_SECRET as string,
  COOKIE_SECRET_KEY: process.env.COOKIE_SECRET_KEY as string,
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
}
