export class ChangeEvent<T> extends CustomEvent<any> {
    constructor(name: string | undefined, value: T) {
        super("change", { bubbles : false, detail : { name, value } });
    }
}