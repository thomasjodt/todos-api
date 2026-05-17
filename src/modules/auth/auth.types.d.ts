import { User } from '@/modules/user/user.schema'
import type { CreateUserModel } from '@/modules/user/user.types'

export interface AuthService {
  login: (identifier: string, password: string) => Promise<User>
  register: (user: CreateUserModel) => Promise<Pick<User, 'id'>>
}
