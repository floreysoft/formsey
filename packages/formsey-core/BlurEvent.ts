export class BlurEvent extends CustomEvent<any> {
    constructor(name: string | undefined) {
        super("blur", { bubbles : true, composed: true, detail : { name } });
    }
}