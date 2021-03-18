export class FieldChangeEvent<T> extends CustomEvent<{ name: string, value: T }> {
    constructor(name: string, value: T, bubbles?: boolean) {
        super('change', { bubbles, composed: bubbles, detail: { name, value } });
    }
}