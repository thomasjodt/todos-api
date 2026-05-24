import { UnauthorizedError } from '@/shared/errors/app.error'

export class AuthorizationError extends UnauthorizedError {
  constructor(message = "Authentication failed.") {
    super(message)
  }
}