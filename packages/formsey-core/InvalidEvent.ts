/**
 * A single validation error.
 *
 * - `validityMessage`: the text shown below the field
 * - `custom`: true for errors set by the application via `setCustomValidity`
 * - `validityState`: the flags of the native `ValidityState` that are set
 */
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

/** Validation errors keyed by the path of the invalid field, e.g. `"address.city"`. */
export class InvalidErrors extends Map<string, InvalidError> {
    constructor(map?: Map<string, InvalidError>) {
        super(map || new Map());
    }
}

/**
 * Dispatched as "invalid" when validation fails. `detail` contains all errors
 * collected so far. Parent fields add to it while the event travels upwards.
 */
export class InvalidEvent extends CustomEvent<InvalidErrors> {
    constructor(errors: InvalidErrors, composed?: boolean) {
        super("invalid", { bubbles: true, composed, detail: errors });
    }

    public addError(path: string, error: InvalidError) {
        this.detail.set(path, error)
    }
}