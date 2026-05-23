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
  findUserByEmail: (email: string) => Promise<User | null>
  findUserByUsername: (username: string) => Promise<User | null>
  updateUsername: (userId: string, newUsername: string) => Promise<boolean>
}

export interface UserService {
  getUsers: (page: number, limit: number) => Promise<PaginatedResult<UserDto>>
  createUser: (user: CreateUserModel) => Promise<Pick<User, 'id'>>
  findUser: (identifier: string) => Promise<User | null>
  isAvailableUsername: (username: string) => Promise<boolean>
  updateUsername: (userId: string, newUsername: string) => Promise<boolean>
}
