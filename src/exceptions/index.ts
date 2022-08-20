class ResponseError extends Error {
    public name;
    public success;
    public status_code;
    public errors;
    constructor(errors = null) {
        super();
        this.name = this.constructor.name;
        this.success = false;
        this.status_code = 500;
        this.errors = errors;
    }
}

class ValidationError extends ResponseError {
    constructor(errors) {
        super();
        this.name = this.constructor.name;
        this.success = false;
        this.status_code = 400;
        this.errors = errors;
    }
}

class RequestFailed extends ResponseError {
    constructor(errors) {
        super();
        this.name = this.constructor.name;
        this.success = false;
        this.status_code = 500;
        this.errors = {
            'message' : 'Request failed, please try again'
        };
    }
}

export {
    ResponseError,
    RequestFailed,
    ValidationError
};
