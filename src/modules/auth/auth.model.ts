import { t } from 'elysia'

export const loginSchema = t.Object({
  email: t.Optional(t.String({ format: 'email' })),
  username: t.Optional(t.String()),
  password: t.String()
})

export const registerSchema = t.Object({
  name: t.String(),
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 })
})

export const cookieSchema = t.Cookie({
  refreshToken: t.Optional(t.String())
})