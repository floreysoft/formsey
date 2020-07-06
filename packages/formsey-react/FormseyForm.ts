import React, { ReactElement } from 'react';
import '@formsey/core';
import { ValueChangedEvent } from '@formsey/core';
import { InvalidErrors } from '@formsey/core/InvalidEvent';

export class FormseyForm extends React.Component {
    private formElement = null;

    public set action(action: string) {
        this.formElement.current.action = action;
    }

    public get action(): string {
        return this.formElement.current.action;
    }

    public set method(method: "GET" | "POST" | "dialog") {
        this.formElement.current.method = method;
    }

    public get method(): "GET" | "POST" | "dialog" {
        return this.formElement.current.method;
    }

    public set src(src: string) {
        this.formElement.current.src = src;
    }

    public get src(): string {
        return this.formElement.current.src;
    }

    public set theme(theme: string) {
        this.formElement.current.theme = theme;
    }

    public set valid(valid: boolean) {
        this.formElement.current.valid = valid;
    }

    public get valid(): boolean {
        return this.formElement.current.valid;
    }

    public set report(report: boolean) {
        this.formElement.current.report = report;
    }

    public get report(): boolean {
        return this.formElement.current.report;
    }

    public set errors(errors: InvalidErrors) {
        this.formElement.current.errors = errors;
    }

    public get errors(): InvalidErrors {
        return this.formElement.current.errors;
    }

    constructor(props) {
        super(props);
        this.formElement = React.createRef();
    }

    render() {
        var src = (this as any).props.src;
        return React.createElement("formsey-form", { ref: this.formElement, src });
    }

    componentDidMount() {
        this.formElement.current.addEventListener ('change', this.changeEventListenerBound);
        this.formElement.current.addEventListener ('invalid', this.invalidEventListenerBound);
        this.formElement.current.addEventListener ('input', this.inputEventListenerBound);
        this.formElement.current.addEventListener ('blur', this.blurEventListenerBound);
        this.formElement.current.addEventListener ('focus', this.focusEventListenerBound);
        this.formElement.current.addEventListener ('click', this.clickEventListenerBound);
        this.formElement.current.action = (this as any).props.action;
        this.formElement.current.method = (this as any).props.method;
    }

    componentWillUnmount () {
        this.formElement.current.removeEventListener ('change', this.changeEventListenerBound);
        this.formElement.current.removeEventListener ('invalid', this.invalidEventListenerBound);
        this.formElement.current.removeEventListener ('input', this.inputEventListenerBound);
        this.formElement.current.removeEventListener ('blur', this.blurEventListenerBound);
        this.formElement.current.removeEventListener ('focus', this.focusEventListenerBound);
        this.formElement.current.removeEventListener ('click', this.clickEventListenerBound);
    }

    private changeEventListenerBound = this.changeEventListener.bind(this);
    private changeEventListener(e: ValueChangedEvent<any>) {
        if ((this as any).props.onChange) {
            (this as any).props.onChange(e.detail);
        }
    }

    private invalidEventListenerBound = this.invalidEventListener.bind(this);
    private invalidEventListener(e: Event) {
        if ((this as any).props.onInvalid) {
            (this as any).props.onInvalid(e);
        }
    }

    private inputEventListenerBound = this.inputEventListener.bind(this);
    private inputEventListener(e: ValueChangedEvent<any>) {
        if ((this as any).props.onInput) {
            (this as any).props.onInput(e.detail);
        }
    }

    private blurEventListenerBound = this.blurEventListener.bind(this);
    private blurEventListener(e: CustomEvent) {
        if ((this as any).props.onBlur) {
            (this as any).props.onBlur(e.detail);
        }
    }

    private focusEventListenerBound = this.focusEventListener.bind(this);
    private focusEventListener(e: CustomEvent) {
        if ((this as any).props.onFocus) {
            (this as any).props.onFocus(e.detail);
        }
    }

    private clickEventListenerBound = this.clickEventListener.bind(this);
    private clickEventListener(e: CustomEvent) {
        if ((this as any).props.onClick) {
            (this as any).props.onClick(e.detail);
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

    public setCustomValidity(customErrors: InvalidErrors) {
        this.formElement.current.setCustomValidity(customErrors);
    }

    public reportValidity(): boolean {
        return this.formElement.current.reportValidity();
    }

    public checkValidity(): boolean {
        return this.formElement.current.checkValidity();
    }
}
