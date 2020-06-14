class APIError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
        super(message || name);
        this.name = name;
        this.status = statusCode;
        this.errorCode = errorCode;
    }
}

class NotFoundError extends APIError {
    constructor() {
        super('NotFoundError', 404, 'RESOURCE_NOT_FOUND');
    }
}

class AlreadyExistsError extends APIError {
    constructor() {
        super('AlreadyExistsError', 409, 'RESOURCE_ALREADY_EXISTS');
    }
}

module.exports = {
    NotFoundError,
    AlreadyExistsError
};