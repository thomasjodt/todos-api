import { createUserModel } from './user.model'
import type { PaginatedResult } from '@/types'
import { User } from '@/modules/user/user.schema'
export type { NewUser } from './user.schema'
export type { User } from './user.schema'

export type CreateUserModel = typeof createUserModel.static
export type UserDto = Omit<User, 'password'>

export interface UserRepository {
  count: () => Promise<number>
  getUsers: (page: number, limit: number) => Promise<UserDto[]>
  createUser: (user: NewUser) => Promise<Pick<User, 'id'>>
}

export interface UserService {
  getUsers: (page: number, limit: number) => Promise<PaginatedResult<UserDto>>
  createUser: (user: CreateUserModel) => Promise<Pick<User, 'id'>>
}
