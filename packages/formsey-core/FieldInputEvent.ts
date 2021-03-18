export class FieldInputEvent<T> extends CustomEvent<{ name: string, value: T }> {
    constructor(name: string, value: T, bubbles?: boolean) {
        super('input', { bubbles, composed: bubbles, detail: { name, value } });
    }
}