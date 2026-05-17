import type { UserRepository, UserService, CreateUserModel } from './user.types'

export const userService = (repository: UserRepository): UserService => ({
  getUsers: async (page, limit) => {
    const [data, count] = await Promise.all([
      repository.getUsers(page, limit),
      repository.count()
    ])

    return { count, data }
  },
  createUser: async (data: CreateUserModel) => {
    const password = await Bun.password.hash(data.password, {
      algorithm: 'bcrypt',
      cost: 10
    })
    return await repository.createUser({ ...data, password })
  },
  findUser: async (credential) => {
    return (credential.includes('@'))
      ? await repository.findUserByEmail(credential)
      : await repository.findUserByUsername(credential)
  }
})
