import { AppError } from '@/shared/errors/app.error'

export class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials.") {
    super(message, 400, "INVALID_CREDENTIALS_ERROR")
  }
}

export class AlreadyExistingUserError extends AppError {
  constructor(message = "The username is already taken.") {
    super(message, 409, "ALREADY_EXISTING_USER_ERROR")
  }
}

export class UserCreationError extends AppError {
  constructor(message = "Failed to create user.") {
    super(message, 500, "USER_CREATION_ERROR")
  }
}

export class MissingRefreshTokenError extends AppError {
  constructor(message = "Missing refresh token.") {
    super(message, 401, "MISSING_REFRESH_TOKEN_ERROR")
  }
}

export class InvalidRefreshTokenError extends AppError {
  constructor(message = "Invalid refresh token.") {
    super(message, 401, "INVALID_REFRESH_TOKEN_ERROR")
  }
}

export class ExpiredRefreshTokenError extends AppError {
  constructor(message = "Expired Refresh token.") {
    super(message, 401, "REFRESH_TOKEN_EXPIRED_ERROR")
  }
}