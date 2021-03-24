export class FieldClickEvent extends CustomEvent<any> {
    constructor(name: string | undefined, value?: any, bubbles?: boolean) {
        super("click", { bubbles, composed: bubbles, detail: { name, value } });
    }
}