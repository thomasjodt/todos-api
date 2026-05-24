import { AppError } from '@/shared/errors/app.error'

export class AuthorizationError extends AppError {
  constructor(message = "Authentication failed.") {
    super(message, 401, "AUTH_ERROR")
  }
}