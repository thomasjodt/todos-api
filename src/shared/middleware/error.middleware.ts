import { ErrorHandler } from 'elysia'
import { AppError } from '@/shared/errors/app.error'

export const globalErrorHandler: ErrorHandler<{'APPLICATION_ERROR': AppError}> = ({ code, error, set } ) => {
  // 1. Check if it's a custom error
  if (error instanceof AppError) {
    set.status = error.status
    return { code: error.code , message: error.message }
  }

  // 2. System errors or external libraries errors
  switch (code) {
    case 'VALIDATION':
      set.status = 400
      return {
        code: 'VALIDATION_ERROR',
        message: 'The submitted data is invalid.',
        details: error.all?.map((err: any) => ({
          field: err.path.replace('/', ''),
          message: err.message
        }))
      }

    case 'NOT_FOUND':
      set.status = 404
      return {
        code: 'NOT_FOUND_ERROR',
        message: 'The requested resource does not exist.'
      }

    default:
      // Database error handling (Drizzle unique constraints)
      if ((error as any).message?.includes("duplicate key value")) {
        set.status = 409
        return {
          error: {
            code: "CONFLICT_ERROR",
            message: "The record already exists in the system."
          }
        }
      }

      // Critical code or infrastructure error
      set.status = 500
      return {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error has occurred in the server."
        }
      }
  }
}
