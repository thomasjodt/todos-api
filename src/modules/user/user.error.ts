import { ConflictError } from '@/shared/errors/app.error'

export class ExistingUsernameError extends ConflictError {
  constructor(message = "The username is already taken.") {
    super(message)
  }
}
