export class FocusEvent extends CustomEvent<any> {
    constructor(name: string | undefined) {
        super("focus", { bubbles : true, composed: true, detail : { name } });
    }
}