export class InvalidError {
    validityMessage: string
    custom?: boolean
    validityState?: any

    constructor(validityMessage: string, custom?: boolean, validityState?: any) {
        this.validityMessage = validityMessage
        if (custom) {
            this.custom = custom
        }
        if (validityState) {
            this.validityState = validityState
        }
    }
}

export class InvalidErrors extends Map<string, InvalidError> {
    constructor(map?: Map<string, InvalidError>) {
        super(map || new Map());
    }
}

export class InvalidEvent extends CustomEvent<InvalidErrors> {
    constructor(errors: InvalidErrors) {
        super("invalid", { bubbles: true, detail: errors });
    }

    public addError(path: string, error: InvalidError) {
        this.detail.set(path, error)
    }
}