import { Dialog } from '@floreysoft/dialog';
import { FieldDefinition, Form, StringFieldDefinition, ChangeEvent } from "@formsey/core";
import { InvalidEvent } from "@formsey/core/InvalidEvent";
import '@formsey/fields-vaadin';
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

    private simpleDemo = {
      "fields": [
        {
          "name": "name",
          "label": "Name",
          "helpText": "Enter name",
          "type": "string",
          "required": true,
          "readonly" : true,
          "default" : "Huhuhuhu"
        },
        {
          "name": "checkboxes",
          "label": "Checkboxes",
          "helpText": "Checkboxes help",
          "other": true,
          "options": [
            {
              "label": "OptionA",
              "value": "valueA"
            },
            {
              "label": "OptionB",
              "value": "valueB"
            },
            {
              "label": "OptionC",
              "value": "valueC"
            }
          ],
          "type": "multipleChoice"
        },
        {
          "label": "Simple section",
          "type": "section",
          "helpText": "Just some text in the section"
        },
        {
          "name": "optional",
          "label": "Optional",
          "helpText": "Optional help",
          "required": true,
          "form": {
            "fields": [
              {
                "name": "aFieldInAForm",
                "label": "A field in a form",
                "autocomplete": "off",
                "type": "string",
                "required": true
              }
            ],
            "gridLarge": "grid-template-columns:1fr",
            "name": "optional",
            "type": "form"
          },
          "type": "optionalSection",
          "gridLarge": {
            "fields": [],
            "gridLarge": "grid-template-columns:1fr",
            "type": "form"
          }
        },
        {
          "name": "selection",
          "label" : "Selection section",
          "helpText" : "mit hilfe",
          "selections": [
            {
              "form": {
                "fields": [
                  {
                    "autocomplete": "off",
                    "name": "inA",
                    "label": "In A",
                    "type": "string"
                  }
                ],
                "gridLarge": "grid-template-columns:1fr",
                "type": "form"
              },
              "gridLarge": {
                "fields": [],
                "gridLarge": "grid-template-columns:1fr",
                "type": "form"
              },
              "label": "A",
              "value": "a"
            },
            {
              "label": "B",
              "value": "b",
              "form": {
                "fields": [
                  {
                    "name": "inB",
                    "label": "In B",
                    "autocomplete": "off",
                    "type": "string"
                  }
                ],
                "gridLarge": "grid-template-columns:1fr",
                "type": "form"
              },
              "gridLarge": {
                "fields": [],
                "gridLarge": "grid-template-columns:1fr",
                "type": "form"
              }
            }
          ],
          "type": "selectableSection"
        },
        {
          "name": "email",
          "label": "Email",
          "helpText": "Email help dsddd",
          "autofocus" : true,
          "autocomplete": "off",
          "type": "email",
          "required": true
        },
        {
          "name": "date",
          "label": "Date",
          "helpText": "Date help",
          "autocomplete": "off",
          "type": "date",
          "required": true
        },
        {
          "name": "number",
          "label": "Number",
          "helpText": "Number help",
          "min": 5,
          "max": 15,
          "step": 0.5,
          "type": "number",
          "required": true
        }
      ],
        "gridLarge": "grid-template-columns:1fr",
        "gridMedium": "grid-template-columns:1fr",
        "type": "form"
      }

    render() {
        return html`
        <fs-demo-section title="Form" npm="@formsey/core" github="https://github.com/floreysoft/floreysoft-components/tree/master/packages/formsey-core" minified="" gzipped="">
        <p>Formsey</p>
        <form id="realForm" method="POST">
          <formsey-form id="demoForm" name="muskelmann" .definition=${this.simpleDemo} @change=${this.valueChanged} @invalid=${this.invalid}></formsey-form>
          <input type="submit" value="Send Request">
          <input type="reset" value="Reset">
        </form>
        <vaadin-button @click=${this.validate}>Validate</vaadin-button>
        <vaadin-button @click=${this.reportValidity}>Validate and report</vaadin-button>
        <vaadin-button @click=${this.error}>Error</vaadin-button>
        <vaadin-button @click=${this.value}>Value</vaadin-button>
        <vaadin-button @click=${this.refocus}>Focus</vaadin-button>
        <pre id="demoFormValidation"></pre>
        <pre id="demoFormPath"></pre>
        <pre id="demoFormValue"></pre>
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
        let definition = {
            name: "verticalForm", type: "form", fields: [
                {
                    "default": "valuea",
                    "disabled": false,
                    "helpText": "feeeeee",
                    "name": "Testeeeee",
                    "options": [
                      {
                        "label": "OptionA",
                        "value": "valuea"
                      },
                      {
                        "label": "OptionV",
                        "value": "valuev"
                      },
                      {
                        "label": "Option3",
                        "value": "value3"
                      },
                      {
                        "label": "Option4",
                        "value": "value4"
                      }
                    ],
                    "label": "testeeeee",
                    "type": "list"
                  }
            ]
        }
        this.demoForm.definition = definition
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
        this.demoFormPath.innerText = e.detail.name
        this.demoFormValue.innerHTML = JSON.stringify(e.detail.value)
    }

    resize() {
    }
}