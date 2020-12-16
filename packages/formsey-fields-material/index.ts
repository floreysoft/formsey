export { CheckboxesField } from './CheckboxesField'
export { CheckboxField } from './CheckboxField'
export { ColorField } from './ColorField'
export { DateField } from './DateField'
export { DateTimeField } from './DateTimeField'
export { EmailField } from './EmailField'
export { ListField } from './ListField'
export { MonthField } from './MonthField'
export { MultipleChoiceField } from './MultipleChoiceField'
export { NumberField } from './NumberField'
export { PasswordField } from './PasswordField'
export { PhoneField } from './PhoneField'
export { SearchField } from './SearchField'
export { StringField } from './StringField'
export { StyledForm } from './StyledForm'
export { SwitchField } from './SwitchField'
export { TextField } from './TextField'
export { TimeField } from './TimeField'
export { URLField } from './URLField'
export { WeekField } from './WeekField'

import { getLibrary } from '@formsey/core'
import { html } from 'lit-html'

export const ICON_MATERIAL = html`<svg viewBox="0 0 32 32"><path d="M15.938 0.063c-8.802 0.001-15.937 7.135-15.938 15.938 0.001 8.802 7.135 15.937 15.938 15.938 8.802-0.001 15.937-7.135 15.937-15.938h0c-0.001-8.803-7.135-15.937-15.938-15.938zM24.070 6.915l-8.132 16.779-8.132-16.779 16.265 0zM15.938 1.944c3.293 0 6.315 1.13 8.71 3.024h-17.421c2.396-1.894 5.418-3.024 8.71-3.024zM5.281 25.165c-2.119-2.462-3.399-5.66-3.399-9.165s1.28-6.703 3.399-9.165v18.33zM7.057 10.105l7.313 15.088h-7.313v-15.088zM15.938 30.056c-3.293-0-6.315-1.13-8.711-3.024h17.421c-2.396 1.894-5.418 3.024-8.71 3.024zM17.505 25.193l7.313-15.088v15.088h-7.313zM26.594 25.165v-18.33c2.119 2.462 3.399 5.66 3.399 9.165-0 3.505-1.28 6.703-3.399 9.165z"></path></svg>`

let materialLibrary = getLibrary('material')
if (materialLibrary) {
    materialLibrary.icon = ICON_MATERIAL
    materialLibrary.displayName = "Material Design"
    materialLibrary.settingsEditor = {
        "type": "form",
        "layout": {
          "grids": {
            "xs": "grid-template-columns:minmax(0,1fr);grid-gap:10px 10px;padding:10px 10px"
          }
        },
        "fields": [
          {
            "helpText": "Select the theme for your form",
            "type": "selectableSection",
            "name": "theme",
            "label": "Theme",
            "selections": [
              {
                "label": "Light",
                "name": "light",
                "value": "light",
                "form": {
                  "type": "form",
                  "fields": [
                    {
                      "type": "markdown",
                      "default": "Make sure to load the Roboto fonts when using this theme by adding the following snippet in the head of your page:\n```\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap\">\n\n```"
                    }
                  ]
                }
              },
              {
                "value": "dark",
                "name": "dark",
                "label": "Dark",
                "form": {
                  "type": "form",
                  "fields": [
                    {
                      "type": "markdown",
                      "default": "Make sure to load the Roboto fonts when using this theme by adding the following snippet in the head of your page:\n```\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap\">\n\n```"
                    }
                  ]
                }
              },
              {
                "form": {
                  "fields": [
                    {
                      "label": "Primary color",
                      "autocomplete": "off",
                      "name": "--mdc-theme-primary",
                      "type": "color",
                      "helpText": "The theme primary color"
                    },
                    {
                        "label": "Secondary color",
                        "autocomplete": "off",
                        "name": "--mdc-theme-secondary",
                        "type": "color",
                        "helpText": "The theme secondary color"
                      },
                      {
                        "label": "Surface color",
                        "autocomplete": "off",
                        "name": "--mdc-theme-surface",
                        "type": "color",
                        "helpText": "The theme surface color"
                      },
                      {
                        "label": "Background color",
                        "autocomplete": "off",
                        "name": "--mdc-theme-background",
                        "type": "color",
                        "helpText": "The theme background color"
                      }
                    ],
                  "type": "form",
                  "layout": {
                    "grids": {
                      "xs": "grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-gap:5px 5px;padding:0px 0px",
                      "m": "grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);grid-gap:5px 5px;padding:0px 0px"
                    }
                  }
                },
                "value": "custom",
                "label": "Custom",
                "name": "custom"
              },
              {
                "label": "None",
                "name": "none",
                "value": "none"
              }
            ]
          }
        ]
      } as any
}