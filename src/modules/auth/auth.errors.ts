import { AppError } from '@/shared/errors/app.error'

export class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials") {
    super(message, 400, "INVALID_CREDENTIALS_ERROR")
  }
}

export class AlreadyExistingUserError extends AppError {
  constructor(message = "The username is already taken.") {
    super(message, 400, "ALREADY_EXISTING_USER_ERROR")
  }
}

export class UserCreationError extends AppError {
  constructor(message = "Failed to create user") {
    super(message, 500, "USER_CREATION_ERROR")
  }
}
