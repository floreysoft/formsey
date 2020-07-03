import React, { ReactElement } from 'react';
import '@formsey/core';

export class FormseyForm extends React.Component {
    private formElement = null;

    constructor(props) {
        super(props);
        this.formElement = React.createRef();
    }

    render() {
        var src = (this as any).props.src;
        return React.createElement("formsey-form", { ref: this.formElement, src });
    }

    componentDidMount() {
        this.formElement.current.addEventListener('change', this.changeEventListenerBound);
        this.formElement.current.addEventListener('invalid', this.invalidEventListenerBound);
    }

    componentWillUnmount () {
        this.formElement.current.removeEventListener ('change', this.changeEventListenerBound);
        this.formElement.current.removeEventListener ('invalid', this.invalidEventListenerBound);
    }

    changeEventListenerBound = this.changeEventListener.bind(this);
    private changeEventListener(e: CustomEvent) {
        if ((this as any).props.onChange) {
            (this as any).props.onChange(e.detail);
        }
    }

    invalidEventListenerBound = this.invalidEventListener.bind(this);
    private invalidEventListener(e: CustomEvent) {
        if ((this as any).props.onInvalid) {
            (this as any).props.onInvalid(e.detail);
        }
    }

    public validate(report: boolean) {
        this.formElement.current.validate(report);
    }

    public focusField(path: string) {
        this.formElement.current.focusField(path);
    }

    public getValue(path: string): any {
        return this.formElement.current.getValue(path);
    }

    public setValue(path: string, value: any): any {
        this.formElement.current.setValue(path, value);
    }

    public getField(path: string): any {
        return this.formElement.current.getField(path);
    }

    public setField(path: string, value: any): any {
        this.formElement.current.setField(path, value);
    }
}
