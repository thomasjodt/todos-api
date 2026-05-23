import type { UserRepository, UserService, CreateUserModel, User } from './user.types'
import { ExistingUsernameError } from './user.error'

export const userService = (repository: UserRepository): UserService => ({
  getUsers: async (page, limit) => {
    const [data, count] = await Promise.all([
      repository.getUsers(page, limit),
      repository.count()
    ])

    return { count, data }
  },
  createUser: async (data: CreateUserModel) => {
    const password: string = await Bun.password.hash(data.password, {
      algorithm: 'bcrypt',
      cost: 10
    })
    return await repository.createUser({ ...data, password })
  },
  findUser: async (credential: string) => {
    return (credential.includes('@'))
      ? await repository.findUserByEmail(credential)
      : await repository.findUserByUsername(credential)
  },
  isAvailableUsername: async (username: string): Promise<boolean> => {
    const user: User | null = await repository.findUserByUsername(username)
    return user === null
  },
  updateUsername: async (userId: string, newUsername: string): Promise<boolean> => {
    const isAvailable: boolean = await userService(repository)
      .isAvailableUsername(newUsername)

    if (!isAvailable) throw new ExistingUsernameError()
    return await repository.updateUsername(userId, newUsername)
  }
})
