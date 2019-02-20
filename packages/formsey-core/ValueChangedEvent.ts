export class ValueChangedEvent<T> extends Event {
    value: T;
    name: string | undefined;

    constructor(name: string | undefined, value: T) {
        super("valueChanged");
        this.value = value;
        this.name = name;
    }
}