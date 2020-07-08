export class FieldClickEvent<T> extends CustomEvent<any> {
    constructor(name: string | undefined) {
        super("click", { bubbles : true, composed: true, detail : { name } });
    }
}