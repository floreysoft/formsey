import { Dialog } from '@floreysoft/dialog';
import { FieldDefinition, Form, ValueChangedEvent } from "@formsey/core";
import { FormConfiguration } from "@formsey/core/Field";
import '@formsey/core/Form';
import { InvalidEvent } from "@formsey/core/InvalidEvent";
import '@formsey/fields-compound/AddressField';
import '@formsey/fields-compound/CreditCardField';
import '@formsey/fields-compound/NameField';
import '@formsey/fields-vaadin/CheckboxesField';
import '@formsey/fields-vaadin/DateField';
import '@formsey/fields-vaadin/MultipleChoiceField';
import '@formsey/fields-vaadin/OptionalSectionField';
import '@formsey/fields-vaadin/SelectableSectionField';
import '@formsey/fields-vaadin/UploadField';
import { css, CSSResult, customElement, html, LitElement, property, query } from "lit-element";
import '../packages/formsey-fields-material/StringField';
import '../packages/formsey-fields-native/StringField';
import '../packages/formsey-fields-native/ImageField';
import '../packages/formsey-fields-native/MarkupField';
import '../packages/formsey-fields-native/RepeatingField';
import '../packages/formsey-fields-native/SourceCodeField';
import '../packages/formsey-fields-native/YouTubeField';
import '../packages/formsey-fields-vaadin/BooleanField';
import '../packages/formsey-fields-vaadin/ListField';
import '../packages/formsey-fields-vaadin/TextField';


@customElement("fs-demo-section")
export class DemoSection extends LitElement {
    @property() title: string
    @property() npm: string
    @property() github: string
    @property() minified: string
    @property() gzipped: string

    static get styles(): CSSResult[] {
        return [css`
            :host {
                display: block;
                margin-top: var(--lumo-space-l);
                border-top: var(--lumo-space-m) solid var(--lumo-primary-color-10pct);
                padding: 0 var(--lumo-space-m);
            }
            h3 {
                margin: var(--lumo-space-l) 0 0 0
            }
            a {
                color: var(--lumo-primary-color);
            }
            svg {
                vertical-align: text-top;
            }
        `]
    }

    render() {
        return html`
        <h3>${this.title} <a class="icon" href="${this.github}" title="GitHub">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentcolor">
                <path d="M12,2C6.48,2,2,6.59,2,12.25c0,4.53,2.87,8.37,6.84,9.73c0.5,0.09,0.68-0.22,0.68-0.49c0-0.24-0.01-0.89-0.01-1.74c-2.78,0.62-3.37-1.37-3.37-1.37c-0.45-1.18-1.11-1.5-1.11-1.5c-0.91-0.64,0.07-0.62,0.07-0.62c1,0.07,1.53,1.06,1.53,1.06c0.89,1.57,2.34,1.11,2.91,0.85c0.09-0.66,0.35-1.11,0.63-1.37c-2.22-0.26-4.56-1.14-4.56-5.07c0-1.12,0.39-2.03,1.03-2.75c-0.1-0.26-0.45-1.3,0.1-2.71c0,0,0.84-0.28,2.75,1.05c0.8-0.23,1.65-0.34,2.5-0.34c0.85,0,1.7,0.12,2.5,0.34c1.91-1.33,2.75-1.05,2.75-1.05c0.55,1.41,0.2,2.45,0.1,2.71c0.64,0.72,1.03,1.63,1.03,2.75c0,3.94-2.34,4.81-4.57,5.06c0.36,0.32,0.68,0.94,0.68,1.9c0,1.37-0.01,2.48-0.01,2.81c0,0.27,0.18,0.59,0.69,0.49c3.97-1.36,6.83-5.2,6.83-9.73C22,6.59,17.52,2,12,2"></path>
            </svg>
        </a></h3>
        <code>${this.npm}</code>
        <slot></slot>
        <p>Size: <a href="https://bundlephobia.com/result?p=${this.npm}" target="_size">${this.minified} kB (minified), ${this.gzipped} kB (gzipped)</a></p>`
    }
}

const CONFIG: FormConfiguration = {
    'boolean': 'formsey-boolean',
    'string': 'formsey-string',
    'text': 'formsey-text',
    'number': 'formsey-number',
    'date': 'formsey-date',
    'list': 'formsey-list',
    'multipleChoice': 'formsey-multiple-choice',
    'checkboxes': 'formsey-checkboxes',
    'signature': 'formsey-signature',
    'repeatingSection': 'formsey-repeating-section',
    'optionalSection': 'formsey-optional-section',
    'seletableSection': 'formsey-selectable-section',
    'form': 'formsey-form-field',
    'grid': 'formsey-grid',
    'address': 'formsey-address',
    'name': 'formsey-name',
    'creditCard': 'formsey-creditcard',
    'richText': 'formsey-rich-text',
    'sourceCode': 'formsey-sourcecode',
    'markup': 'formsey-markup',
    'image': 'formsey-image',
    'youtube': 'formsey-youtube',
    'upload': 'formsey-upload'
}

@customElement("fs-demo")
export class Demo extends LitElement {
    static get styles(): CSSResult[] {
        return [css`
            fs-tabs {
                height: 100px;
            }
        `]
    }

    @query("#demoForm")
    demoForm: Form

    @query("#demoFormValue")
    demoFormValue: HTMLElement

    @query("#demoFormPath")
    demoFormPath: HTMLElement

    @query("#demoFormValidation")
    demoFormValidation: HTMLElement

    private resizeHandler = ((e: Event) => this.resize())

    connectedCallback() {
        super.connectedCallback()
        window.addEventListener("resize", this.resizeHandler)
    }

    disconnectedCallback() {
        window.removeEventListener("resize", this.resizeHandler)
        super.disconnectedCallback()
    }

    render() {
        let simpleDemo = { name: "verticalForm", type: "form", fields: this.createFields(3) }
        return html`
        <fs-demo-section title="Form" npm="@formsey/core" github="https://github.com/floreysoft/floreysoft-components/tree/master/packages/formsey-core" minified="" gzipped="">
        <p>Formsey</p>
        <formsey-form id="demoForm" .definition=${simpleDemo} .configuration=${CONFIG} @valueChanged=${this.valueChanged} @validationFailed=${this.validationFailed}></formsey-form>
        <vaadin-button @click=${this.validate}>Validate</vaadin-button>
        <vaadin-button @click=${this.reportValidity}>Validate and report</vaadin-button>
        <vaadin-button @click=${this.error}>Error</vaadin-button>
        <pre id="demoFormValidation"></pre>
        <pre id="demoFormPath"></pre>
        <pre id="demoFormValue"></pre>
        <fs-dialog id="formDialog" header="Enter form" buttons='[{ "label" : "Submit", "theme" : "primary"}, { "label" : "Cancel", "theme" : "secondary"}]'>
           <formsey-form src="https://www.formsey.com/form/25eKDUrAPVnTm2yM0WoK.json" .configuration=${CONFIG}></formsey-form>
        </fs-dialog>
        <vaadin-button @click=${e => this.openDialog("formDialog")}>Show form</vaadin-button>
        </fs-demo-section>
        `
    }

    createFields(count: number): FieldDefinition[] {
        let fields: FieldDefinition[] = []
        for (let i = 0; i < count; i++) {
            fields.push({ name: String.fromCharCode(97 + i), prompt: String.fromCharCode(65 + i), type: "string", required: true })
        }
        return fields;
    }

    validate(e: Event) {
        this.demoForm.checkValidity()
    }

    reportValidity(e: Event) {
        this.demoForm.reportValidity()
    }

    error(e : Event) {
        this.demoForm.errors = { "verticalForm.a" : { "errorMessage" : "Blabla", customError: true, "details" : undefined } }
    }

    validationFailed(e: InvalidEvent) {
        this.demoFormValidation.innerText = JSON.stringify(e.errors, null, 2)
    }

    openDialog(id: string) {
        if (this.shadowRoot) {
            (<Dialog>this.shadowRoot.getElementById(id)).open = true
        }
    }

    valueChanged(e: ValueChangedEvent<Object>) {
        this.demoFormPath.innerText = e.name
        this.demoFormValue.innerHTML = JSON.stringify(e.value)
    }

    resize() {
        window.dispatchEvent(new Event("resizeForm"))
    }
}