import { AppError, BadRequestError, ConflictError, UnauthorizedError } from '@/shared/errors/app.error'

export class InvalidCredentialsError extends BadRequestError {
  constructor(message = "Invalid credentials.") {
    super(message)
  }
}

export class AlreadyExistingUserError extends ConflictError {
  constructor(message = "The username is already taken.") {
    super(message)
  }
}

export class UserCreationError extends AppError {
  constructor(message = "Failed to create user.") {
    super(message, 500, "USER_CREATION_ERROR")
  }
}

export class MissingRefreshTokenError extends UnauthorizedError {
  constructor(message = "Missing refresh token.") {
    super(message)
  }
}

export class InvalidRefreshTokenError extends UnauthorizedError {
  constructor(message = "Invalid refresh token.") {
    super(message)
  }
}

export class ExpiredRefreshTokenError extends UnauthorizedError {
  constructor(message = "Expired Refresh token.") {
    super(message)
  }
}