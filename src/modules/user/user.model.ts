import { t } from 'elysia'

export const getUsersModel = t.Object({
  page: t.Number({ default: 1 }),
  limit: t.Number({ default: 10 })
})

export const createUserModel = t.Object({
  name: t.String({ minLength: 3 }),
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
})
