import { UserService } from '@/modules/user/user.types'
import { AuthService } from '@/modules/auth/auth.types'
import { AlreadyExistingUserError, InvalidCredentialsError, UserCreationError } from '@/modules/auth/auth.errors'

export const authService = (userService: UserService): AuthService => ({
  login: async (identifier: string, password: string) => {
    const user = await userService.findUser(identifier)

    if (!user) throw new InvalidCredentialsError()

    const isPasswordValid = await Bun.password.verify(
      password,
      user.password
    )

    if (!isPasswordValid) throw new InvalidCredentialsError()
    return user
  },
  register: async ({ password, name, email }) => {
    const user = await userService.findUser(email)

    if (user) throw new AlreadyExistingUserError()
    const created = await userService.createUser({ email , name, password })

    if (!created) throw new UserCreationError()
    return created
  }
})
