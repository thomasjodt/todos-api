import type { PaginatedResult } from '@/types'
import type { NewUser } from './user.schema'
export type { User, NewUser } from './user.schema'

export interface UserRepository {
  count: () => Promise<number>
  getUsers: (page: number, limit: number) => Promise<User[]>
  createUser: (user: NewUser) => Promise<Pick<User, 'id'>>
}

export interface UserService {
  getUsers: (page: number, limit: number) => Promise<PaginatedResult<User>>
  createUser: (user: NewUser) => Promise<Pick<User, 'id'>>
}
