import { Dialog } from '@floreysoft/dialog';
import { FieldDefinition, Form, StringFieldDefinition, ChangeEvent } from "@formsey/core";
import { InvalidEvent } from "@formsey/core/InvalidEvent";
import '@formsey/fields-vaadin';
import '@formsey/fields-native';
import '@formsey/fields-native-extended';
import { css, CSSResult, customElement, html, LitElement, property, query } from "lit-element";

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
            #demoFormValue {
              word-break: break-all;
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

    @query("#realForm")
    realForm: HTMLFormElement

    private resizeHandler = ((e: Event) => this.resize())

    connectedCallback() {
        super.connectedCallback()
        window.addEventListener("resize", this.resizeHandler)
    }

    disconnectedCallback() {
        window.removeEventListener("resize", this.resizeHandler)
        super.disconnectedCallback()
    }
    private allFields = {
      "helpText": "Main Description",
      "fields": [
        {
          "helpText": "Ein String",
          "name": "string",
          "type": "string",
          "prompt": "Yes",
          "autocomplete": "off",
          "label": "String",
          "maxlength": "5"
        },
        {
          "label": "Text",
          "autocomplete": "off",
          "disabled": false,
          "helpText": "Long text",
          "name": "text",
          "type": "text",
          "autofocus": false,
          "minlength": "3"
        },
        {
          "helpText": "Email field",
          "name": "email",
          "type": "email",
          "autocomplete": "off",
          "label": "Email"
        },
        {
          "autocomplete": "off",
          "label": "Phone",
          "helpText": "Phone field",
          "name": "phone",
          "type": "phone"
        },
        {
          "type": "color",
          "autocomplete": "on",
          "label": "Color",
          "helpText": "Color field",
          "name": "ZU"
        },
        {
          "type": "search",
          "autocomplete": "off",
          "label": "Search",
          "helpText": "Search field",
          "name": "search"
        },
        {
          "helpText": "Url Field",
          "name": "uRL",
          "type": "url",
          "autocomplete": "off",
          "label": "URL"
        },
        {
          "autocomplete": "off",
          "label": "Password",
          "helpText": "Password field",
          "name": "password",
          "required": true,
          "type": "password"
        },
        {
          "label": "Number",
          "helpText": "Number field",
          "name": "number",
          "type": "number"
        },
        {
          "helpText": "Date field",
          "name": "date",
          "type": "date",
          "label": "Date"
        },
        {
          "helpText": "Time field",
          "name": "time",
          "type": "time",
          "label": "Time"
        },
        {
          "min": "2020-05-14",
          "label": "Date and Time",
          "disabled": false,
          "helpText": "Date and time field",
          "step": "2",
          "name": "dateAndTime",
          "type": "datetime"
        },
        {
          "label": "Week",
          "helpText": "Week field",
          "name": "week",
          "type": "week"
        },
        {
          "type": "month",
          "label": "Month",
          "helpText": "Month field",
          "name": "month"
        },
        {
          "label": "Checkbox",
          "helpText": "Some help on the checkbox",
          "name": "checkbox",
          "type": "boolean",
          "indeterminate": false
        },
        {
          "name": "listbox",
          "type": "list",
          "options": [
            {
              "label": "Option",
              "value": "value"
            },
            {
              "label": "Option2",
              "value": "value2"
            },
            {
              "label": "Option3",
              "value": "value3"
            }
          ],
          "label": "Listbox",
          "helpText": "List field"
        },
        {
          "helpText": "Multiple Choice field",
          "name": "multipleChoice",
          "type": "multipleChoice",
          "other": true,
          "options": [
            {
              "label": "Option",
              "value": "value"
            },
            {
              "label": "Option2",
              "value": "value2"
            },
            {
              "label": "Option3",
              "value": "value3"
            }
          ],
          "label": "Multiple Choice"
        },
        {
          "name": "checkboxes",
          "type": "checkboxes",
          "other": true,
          "options": [
            {
              "label": "Option",
              "value": "value"
            },
            {
              "label": "Option2",
              "value": "value2"
            },
            {
              "label": "Option3",
              "value": "value3"
            }
          ],
          "label": "Checkboxes",
          "helpText": "Checkboxes field"
        },
        {
          "mode": "javascript",
          "theme": "tomorrow",
          "label": "Source code",
          "gutter": true,
          "helpText": "JavaScript editor",
          "name": "sourceCode",
          "type": "sourceCode"
        },
        {
          "name": "signature",
          "type": "signature",
          "height": "300px",
          "width": "400px",
          "label": "Signature",
          "helpText": "Enter your signature"
        },
        {
          "name": "upload",
          "type": "upload",
          "label": "Upload"
        },
        {
          "type": "nestedLayout",
          "form": {
            "type": "form",
            "layout": "padding:15px;background-color:#d3d3d3;border-bottom:undefined;border-color:none",
            "label": "Nested layout",
            "helpText": "Description",
            "fields": [
              {
                "type": "string",
                "autocomplete": "off",
                "label": "Nested Name 1",
                "helpText": "With Help",
                "name": "nestedName1"
              },
              {
                "autocomplete": "off",
                "label": "Nested Name 2",
                "helpText": "With Help 2",
                "name": "nestedName2",
                "type": "string"
              }
            ]
          }
        },
        {
          "type": "nestedForm",
          "form": {
            "label": "Nested Form",
            "helpText": "Nested Form Description",
            "fields": [
              {
                "autocomplete": "off",
                "label": "Nested Form 1",
                "name": "nestedForm1",
                "type": "string"
              }
            ],
            "name": "nestedName",
            "type": "form",
            "layout": "padding:15px;background-color:undefined;border-bottom:undefined;border-color:undefined"
          },
          "name": "nestedName"
        },
        {
          "helpText": "Section subtitle",
          "name": "sectionTitle",
          "type": "section",
          "label": "Section title"
        },
        {
          "name": "markup",
          "type": "markup",
          "default": "<p>Huhu</p>",
          "label": "Markup",
          "helpText": "Markup Help"
        },
        {
          "width": "100%",
          "label": "Image",
          "url": "https://images.unsplash.com/photo-1533907650686-70576141c030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          "helpText": "Help",
          "name": "image",
          "align": "left",
          "type": "image"
        },
        {
          "min": "0",
          "label": "Repeating",
          "helpText": "Repeating help",
          "name": "repeating",
          "type": "repeatingSection",
          "form": {
            "layout": "padding:0px;background-color:undefined;border-bottom:undefined;border-color:undefined",
            "type": "form",
            "label": "Some stuff",
            "helpText": "Inside repeat",
            "fields": [
              {
                "helpText": "Name help",
                "name": "name",
                "type": "string",
                "autocomplete": "off",
                "label": "Name"
              },
              {
                "helpText": "Age help",
                "name": "age",
                "type": "number",
                "label": "Age"
              }
            ],
            "name": "someStuff"
          },
          "max": "5"
        },
        {
          "min": "0",
          "label": "Small repeating",
          "helpText": "Repeating help",
          "name": "repeating",
          "type": "repeatingSection",
          "form": {
            "layout": "padding:0px;background-color:undefined;border-bottom:undefined;border-color:undefined",
            "type": "form",
            "fields": [
              {
                "helpText": "Name help",
                "name": "name",
                "type": "string",
                "autocomplete": "off",
                "label": "Name"
              },
              {
                "helpText": "Age help",
                "name": "age",
                "type": "number",
                "label": "Age"
              }
            ],
            "name": "someStuff"
          },
          "max": "5"
        },
        {
          "type": "selectableSection",
          "label": "Selectable section",
          "helpText": "Some selectable help",
          "name": "selectableSection",
          "selections": [
            {
              "label": "First sectuion",
              "value": "section1",
              "form": {
                "layout" : "padding:0px",
                "helpText": "Section description",
                "fields": [
                  {
                    "autocomplete": "off",
                    "label": "Section A Field",
                    "name": "sectionafield",
                    "type": "string"
                  }
                ],
                "type": "form",
                "label": "Section title"
              }
            }
          ]
        },
        {
          "helpText": "Optional section",
          "name": "optionalSection",
          "type": "optionalSection",
          "form": {
            "label": "Optional Title",
            "helpText": "Optional description",
            "fields": [
              {
                "helpText": "Help",
                "name": "optionalName",
                "type": "string",
                "autocomplete": "off",
                "label": "Optional name"
              }
            ],
            "name": "optionalSection",
            "type": "form",
            "layout": "padding:0px;background-color:undefined;border-bottom:undefined;border-color:undefined"
          },
          "default": false,
          "label": "Optional section"
        }
      ],
      "layout": "padding:0px;background-color:none;border-bottom:undefined;border-color:none",
      "type": "form",
      "gridMedium": "grid-template-columns:1fr 1fr;grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;grid-auto-flow: column",
      "gridLarge": "grid-template-columns:1fr 1fr 1fr",
      "gridSmall": "grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;grid-template-areas:'_optionalSection _optionalSection _optionalSection _optionalSection _optionalSection _optionalSection _optionalSection _optionalSection _optionalSection _optionalSection _optionalSection _optionalSection' '_string _string _string _string _string _string _text _text _text _text _text _text' '_email _email _email _email _email _email _phone _phone _phone _phone _phone _phone' '_ZU _ZU _ZU _search _search _search _uRL _uRL _uRL _password _password _password' '_number _number _number _date _date _date _time _time _time _dateAndTime _dateAndTime _dateAndTime' '_week _week _week _month _month _month _checkbox _checkbox _checkbox _listbox _listbox _listbox' '_multipleChoice _multipleChoice _multipleChoice _multipleChoice _multipleChoice _multipleChoice _checkboxes _checkboxes _checkboxes _checkboxes _checkboxes _checkboxes' '_sourceCode _sourceCode _sourceCode _sourceCode _sourceCode _sourceCode _signature _signature _signature _signature _signature _signature' '_nestedLayout0 _nestedLayout0 _nestedLayout0 _nestedLayout0 _nestedLayout0 _nestedLayout0 _nestedLayout0 _nestedLayout0 _nestedLayout0 _nestedLayout0 _nestedLayout0 _nestedLayout0' '_sectionTitle _sectionTitle _sectionTitle _sectionTitle _sectionTitle _sectionTitle _sectionTitle _sectionTitle _sectionTitle _sectionTitle _sectionTitle _sectionTitle' '_markup _markup _markup _markup _markup _markup _markup _markup _markup _markup _markup _markup' '_image _image _image _image _image _image _image _image _image _image _image _image' '_repeating _repeating _repeating _repeating _repeating _repeating _repeating _repeating _repeating _repeating _repeating _repeating' '_selectableSection _selectableSection _selectableSection _selectableSection _selectableSection _selectableSection _selectableSection _selectableSection _selectableSection _selectableSection _selectableSection _selectableSection' '_upload _upload _upload _upload _upload _upload _nestedName _nestedName _nestedName _nestedName _nestedName _nestedName';grid-gap:5px 5px",
      "label": "Main Title"
    }

    render() {
        return html`
        <fs-demo-section title="Form" npm="@formsey/core" github="https://github.com/floreysoft/floreysoft-components/tree/master/packages/formsey-core" minified="" gzipped="">
        <p>Formsey</p>
        <form id="realForm" method="POST">
          <formsey-form id="demoForm" name="muskelmann" theme="native" .definition=${this.allFields} @change=${this.valueChanged} @invalid=${this.invalid}></formsey-form>
          <input type="submit" value="Send Request">
          <input type="reset" value="Reset">
        </form>
        <vaadin-button @click=${this.validate}>Validate</vaadin-button>
        <vaadin-button @click=${this.reportValidity}>Validate and report</vaadin-button>
        <vaadin-button @click=${this.error}>Error</vaadin-button>
        <vaadin-button @click=${this.value}>Value</vaadin-button>
        <vaadin-button @click=${this.refocus}>Focus</vaadin-button>
        <div id="demoFormValidation"></div>
        <div id="demoFormPath"></div>
        <div id="demoFormValue"></div>
        <fs-dialog id="formDialog" header="Enter form" buttons='[{ "label" : "Submit", "theme" : "primary"}, { "label" : "Cancel", "theme" : "secondary"}]'>
        </fs-dialog>
        <vaadin-button @click=${e => this.openDialog("formDialog")}>Show form</vaadin-button>
        </fs-demo-section>
        `
    }

    firstUpdated() {
      let that = this
      this.realForm.addEventListener('submit', function(e) {
        if ( !this.demoForm.reportValidity() ) {
          e.preventDefault()
          let x = that.realForm.elements;
          console.log("KLOBRILLE="+x['klobrille'].value)
          console.log("FORMSEY="+JSON.stringify(x['muskelmann'].value))
        }
      });
    }

    createFields(count: number): FieldDefinition[] {
        let fields: StringFieldDefinition[] = []
        for (let i = 0; i < count; i++) {
            fields.push({ name: String.fromCharCode(97 + i), label: String.fromCharCode(65 + i), type: "string", required: true, helpText: "Some more help", customValidity: "Was los!" })
        }
        return fields;
    }

    validate(e: Event) {
        this.demoForm.checkValidity()
    }

    reportValidity(e: Event) {
        this.demoForm.reportValidity()
    }

    refocus(e: Event) {
      this.demoForm.focusField("optional.aFieldInAForm")
    }

    error(e: Event) {
        this.demoForm.errors = {
            "a": {
              "validityMessage": "Blabla",
              "custom": true
            },
            "topLevel": {
              "validityMessage": "sdfsdf",
              "validityState": {}
            },
            "nestedLayoutA": {
              "validityMessage": "sdfsdf",
              "validityState": {}
            },
            "nestedLayoutB": {
              "validityMessage": "ffffff",
              "validityState": {}
            },
            "nestedForm.nestedFormA": {
              "validityMessage": "xxxxx",
              "validityState": {}
            },
            "nestedForm.nestedFormB": {
              "validityMessage": "aaaa",
              "validityState": {}
            },
            "repeatingSection[1].inRepeatA": {
              "validityMessage": "ssss",
              "validityState": {}
            },
            "repeatingSection[1].inRepeatB": {
              "validityMessage": "1c",
              "validityState": {}
            },
            "repeatingSection[1].nestedInRepeat.nestedInRepeatA": {
              "validityMessage": "21",
              "validityState": {}
            },
            "repeatingSection[1].nestedInRepeat.layoutInRepeatA": {
              "validityMessage": "123",
              "validityState": {}
            },
            "repeatingSection[1].nestedInRepeat.layoutInRepeatB": {
              "validityMessage": "1234",
              "validityState": {}
            }
          }
    }

    value(e: Event) {
        let value = {
          "checkboxes" : [ "value2", "Kacke" ]
        }
        this.demoForm.value = value
    }

    invalid(e: InvalidEvent) {
        this.demoFormValidation.innerText = JSON.stringify(e.errors, null, 2)
    }

    openDialog(id: string) {
        if (this.shadowRoot) {
            (<Dialog>this.shadowRoot.getElementById(id)).open = true
        }
    }

    valueChanged(e: ChangeEvent<Object>) {
      //  this.demoFormPath.innerText = e.detail.name
        // this.demoFormValue.innerHTML = JSON.stringify(e.detail.value)
    }

    resize() {
    }
}