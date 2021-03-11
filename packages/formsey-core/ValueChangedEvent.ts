export class ValueChangedEvent<T> extends CustomEvent<any> {
    constructor(type: "change" | "input" | "inputChange", name: string | undefined, value: T, bubbles? : boolean) {
        super(type, { bubbles, composed: bubbles, detail : { name, value } });
    }
}