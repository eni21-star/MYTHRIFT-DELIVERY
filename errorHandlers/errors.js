

export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
    }
}

export class BadreqError extends CustomError {
    constructor(message) {
        super(message, 400)
    }
}

export class ValidationErrror extends CustomError {
    constructor(message) {
        super(message, 400)
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message, 401)
    }
}

export class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, 403)
    }
}

export class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404)
    }
}

export class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409)
    }
}

