export class ClickEvent<T> extends CustomEvent<any> {
    constructor(name: string | undefined) {
        super("click", { bubbles : true, composed: true, detail : { name } });
    }
}