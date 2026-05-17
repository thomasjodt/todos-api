export class AppError extends Error {
  constructor(
    public message: string,
    public status: number,
    public code: string
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

// 400 Bad Request
export class BadRequestError extends AppError {
  constructor(message = "Petición incorrecta") {
    super(message, 400, "BAD_REQUEST_ERROR")
  }
}

// 401 Unauthorized
export class UnauthorizedError extends AppError {
  constructor(message = "No autorizado") {
    super(message, 401, "UNAUTHORIZED_ERROR")
  }
}

// 403 Forbidden
export class ForbiddenError extends AppError {
  constructor(message = "Acceso prohibido") {
    super(message, 403, "FORBIDDEN_ERROR")
  }
}

// 404 Not Found
export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404, "NOT_FOUND_ERROR")
  }
}

// 409 Conflict
export class ConflictError extends AppError {
  constructor(message = "Conflicto en el recurso") {
    super(message, 409, "CONFLICT_ERROR")
  }
}
