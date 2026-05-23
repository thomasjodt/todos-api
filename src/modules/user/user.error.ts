import { AppError } from '@/shared/errors/app.error'

export class ExistingUsernameError extends AppError {
  constructor(message = "The username is already taken.") {
    super(message, 409, "EXISTING_USERNAME_ERROR")
  }
}
