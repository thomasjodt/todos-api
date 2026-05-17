import type { UserRepository, UserService, NewUser } from './user.types'

export const userService = (repository: UserRepository): UserService => ({
  getUsers: async (page, limit) => {
    const [data, count] = await Promise.all([
      repository.getUsers(page, limit),
      repository.count()
    ])

    return { count, data }
  },
  createUser: async (data: NewUser) => {
    return await repository.createUser(data)
  }
})
