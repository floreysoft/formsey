export class InvalidError {
    errorMessage: string
    details: any

    constructor(errorMessage: string, details?: any) {
        this.errorMessage = errorMessage
        this.details = details
    }
}

export interface InvalidErrors {
    [index: string]: InvalidError
  }

export class InvalidEvent extends Event {
    errors: InvalidErrors;

    constructor(errors : InvalidErrors) {
        super("validationFailed");
        if ( errors ) {
            this.errors = errors
        } else {
            this.errors = {}
        }
    }

    public addError(path: string, error : InvalidError) {
        this.errors[path] = error
    }
}