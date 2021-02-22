export class FieldActionEvent<T> extends CustomEvent<any> {
    constructor(action: string, name: string | undefined, value?: any) {
        super("action", { bubbles: true, composed: true, detail: { action, name, value } });
    }
}