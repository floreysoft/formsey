export class InvalidError {
    validityMessage: string
    custom?: boolean
    validityState?: any

    constructor(validityMessage: string, custom?: boolean, validityState?: any) {
        this.validityMessage = validityMessage
        if ( custom ) {
            this.custom = custom
        }
        if ( validityState ) {
            this.validityState = validityState
        }
    }
}

export interface InvalidErrors {
    [index: string]: InvalidError
  }

export class InvalidEvent extends Event {
    errors: InvalidErrors;

    constructor(errors : InvalidErrors) {
        super("invalid");
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