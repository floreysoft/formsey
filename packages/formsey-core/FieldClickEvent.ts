export class FieldClickEvent<T> extends CustomEvent<any> {
    constructor(name: string | undefined, value?: any) {
        super("click", { bubbles : true, composed: true, detail : { name, value } });
    }
}