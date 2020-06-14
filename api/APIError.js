class APIError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
        super(message || name);
        this.name = name;
        this.status = statusCode;
        this.errorCode = errorCode;
    }
}

class NotFoundRelatedError extends APIError {
    constructor() {
        super('NotFoundRelatedError', 404, 'RELATED_RESOURCE_NOT_FOUND');
    }
}

class NotFoundError extends APIError {
    constructor() {
        super('NotFoundError', 404, 'RESOURCE_NOT_FOUND');
    }
}

class AlreadyExistError extends APIError {
    constructor(){
        super('AlreadyExistError', 409, 'RESOURCE_ALREADY_EXISTS')
    }
}

class BadRequestError extends APIError {
    constructor(){
        super('BadRequest', 400, 'BAD_REQUEST')
    }
}

class UnexpectedFailureError extends APIError{
    constructor(){
        super('UnexpectedFailureError', 500, 'INTERNAL_SERVER_ERROR')
    }
}

module.exports = {
    NotFoundError,
    NotFoundRelatedError,
    AlreadyExistError,
    BadRequestError,
    UnexpectedFailureError

};