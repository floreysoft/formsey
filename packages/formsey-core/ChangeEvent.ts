export class ChangeEvent<T> extends CustomEvent<any> {
    constructor(type: "change" | "input" | "inputChange", name: string | undefined, value: T) {
        super(type, { bubbles : false, detail : { name, value } });
    }
}