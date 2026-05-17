import { UserService } from '@/modules/user/user.types'

export const authService = (userService: UserService) => ({
  login: async () => {
    throw new Error('Not implemented')
  },
  register: async () => {
    throw new Error('Not implemented')
  }
})
