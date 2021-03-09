export class FieldClickEvent<T> extends CustomEvent<any> {
    constructor(name: string | undefined, value?: any) {
        super("click", { bubbles : false, composed: false, detail : { name, value } });
    }
}