import { UserService } from '@/modules/user/user.types'
import { AuthService } from '@/modules/auth/auth.types'

export const authService = (userService: UserService): AuthService => ({
  login: async (identifier: string, password: string) => {
    const user = await userService.findUser(identifier)

    if (!user) throw new Error('Invalid credentials')

    const isPasswordValid = await Bun.password.verify(
      password,
      user.password
    )

    if (!isPasswordValid) throw new Error('Invalid credentials')
    return user
  },
  register: async ({ password, name, email }) => {
    const user = await userService.findUser(email)
    if (user) throw new Error('El nombre de usuario ya existe')
    return await userService.createUser({ email , name, password })
  }
})
