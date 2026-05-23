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

export const updateUsernameModel = t.Object({
  username: t.String({
    minLength: 5,
    maxLength: 30,
    pattern: '[a-zA-Z0-9-_]+'
  })
})