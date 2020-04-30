export class ChangedEvent<T> extends CustomEvent<any> {
    constructor(name: string | undefined, value: T) {
        super("change", { bubbles : true, detail : { name, value } });
    }
}