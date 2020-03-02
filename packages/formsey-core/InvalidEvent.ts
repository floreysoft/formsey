export class InvalidError {
    path: string
    errorMessage: string

    constructor(path: string, errorMessage: string) {
        this.path = path
        this.errorMessage = errorMessage
    }
}

export class InvalidEvent extends Event {
    errors: InvalidError[];
    name: string | undefined;

    constructor(name: string | undefined, errorMessage: string, errors? : InvalidError[]) {
        super("validationFailed");
        if ( errors ) {
            this.errors = errors
        } else {
            this.errors = []
        }
        this.errors.push(new InvalidError(name, errorMessage))
    }

    public prependPath(path : string) {
        if ( this.errors ) {
            for ( let error of this.errors ) {
                error.path = path + "."+error.path
            }
        }
    }
}