export * from '@formsey/core';
export { ButtonField } from './ButtonField';
export { CheckboxesField } from './CheckboxesField';
export { CheckboxField } from './CheckboxField';
export { ColorField, ICON_COLOR_FIELD } from './ColorField';
export { DateField } from './DateField';
export { DateTimeField } from './DateTimeField';
export { EmailField } from './EmailField';
export { ImageField } from './ImageField';
export { ImagesField } from './ImagesField';
export { LabelField } from './LabelField';
export { ListField } from './ListField';
export { MonthField } from './MonthField';
export { MultipleChoiceField } from './MultipleChoiceField';
export { NumberField } from './NumberField';
export { OptionalSectionField } from './OptionalSectionField';
export { PasswordField } from './PasswordField';
export { PhoneField } from './PhoneField';
export { PopupSectionField } from './PopupSectionField';
export { RangeField } from './RangeField';
export { RepeatingSectionField } from './RepeatingSectionField';
export { SearchField } from './SearchField';
export { SelectableSectionField } from './SelectableSectionField';
export { SplitPanel } from './SplitPanel';
export { StringField } from './StringField';
export { StyledForm } from './StyledForm';
export { SwitchField } from './SwitchField';
export { TableField } from './TableField';
export { TabsField } from './TabsField';
export { TemplateField } from './TemplateField';
export { TextField } from './TextField';
export { TimeField } from './TimeField';
export { TitleField } from './TitleField';
export { ToggleField } from './ToggleField';
export { ICON_FILE, ICON_REMOVE, ICON_UPLOAD, UploadField } from './UploadField';
export { URLField } from './URLField';
export { WeekField } from './WeekField';
export { YouTubeField } from './YouTubeField';
import { getLibrary } from '@formsey/core/Components';
import { html } from 'lit-html';

export const ICON_BROWSER = html`<svg viewBox="0 0 32 32"><path d="M30 2h-28c-1 0-2 .9-2 2v24c0 1.102.9 2 2 2h28c1 0 2-.9 2-2v-24c.002-1.1-.9-2-2-2zM11.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.83 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5zM7.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.83 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5zM3.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zM30 28c-.004 0-.004 0-.004.004h-28c-.002-.004-.002-.004-.004-.004v-20h28v20z"></path></svg>`

let nativeLibrary = getLibrary('native')
if (nativeLibrary) {
  nativeLibrary.icon = ICON_BROWSER
  nativeLibrary.displayName = "Native"
  nativeLibrary.settingsEditor = {
    "type": "form",
    "fields": [
      {
        "name": "theme",
        "label": "Theme",
        "helpText": "Select the theme for your form",
        "selections": [
          {
            "label": "Light",
            "name": "light",
            "value": "light",
            "fields": [
              {
                "type": "markdown",
                "default": "Make sure to load the Roboto fonts when using this theme by adding the following snippet in the head of your page:\n```\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap\">\n\n```"
              }
            ],
            "layout": {
              "sizes": {
                "xs": {
                  "formatter": "columns",
                  "columns": [
                    1
                  ]
                }
              }
            }
          },
          {
            "value": "dark",
            "name": "dark",
            "label": "Dark",
            "fields": [
              {
                "type": "markdown",
                "default": "Make sure to load the Roboto fonts when using this theme by adding the following snippet in the head of your page:\n```\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap\">\n\n```"
              }
            ],
            "layout": {
              "sizes": {
                "xs": {
                  "formatter": "columns",
                  "columns": [
                    1
                  ]
                }
              }
            }
          },
          {
            "fields": [
              {
                "type": "string",
                "label": "Font",
                "name": "--formsey-font",
                "helpText": "Enter font family and size",
                "placeholder": "13px Arial, sans-serif",
                "autocomplete": "off"
              },
              {
                "type": "string",
                "label": "Font on mobile",
                "name": "--formsey-font-coarse",
                "helpText": "Font used on pointer devices",
                "placeholder": "15px Arial, sans-serif",
                "autocomplete": "off"
              },
              {
                "helpText": "Background color of the form",
                "autocomplete": "off",
                "type": "color",
                "name": "--formsey-background",
                "label": "Background color"
              },
              {
                "name": "--formsey-color",
                "label": "Text color",
                "helpText": "Foreground color used for text, icons and more",
                "type": "color",
                "autocomplete": "off"
              },
              {
                "label": "Fields shade",
                "name": "--formsey-shade",
                "helpText": "Background color for input fields",
                "autocomplete": "off",
                "type": "color",
                "placeholder": "#80808030"
              },
              {
                "label": "Accent color",
                "autocomplete": "off",
                "name": "--formsey-accent-color",
                "type": "color",
                "helpText": "Color to highlight active field"
              },
              {
                "label": "Accent hover color",
                "autocomplete": "off",
                "name": "--formsey-accent-hover",
                "type": "color",
                "helpText": "Hover color for accented items"
              },
              {
                "autocomplete": "off",
                "type": "color",
                "name": "--formsey-accent-contrast",
                "label": "Accent contrast",
                "helpText": "Used for text and icons on top of accent color"
              },
              {
                "name": "--formsey-error-backkground",
                "label": "Error color",
                "helpText": "Background color for invalid fields",
                "type": "color",
                "autocomplete": "off",
                "placeholder": "#FF000020",
                "default": "#FF000020"
              },
              {
                "name": "--formsey-error-text",
                "label": "Error text color",
                "helpText": "Text color for error message",
                "type": "color",
                "autocomplete": "off"
              },
              {
                "type": "color",
                "helpText": "Background color for buttons",
                "label": "Buttons",
                "autocomplete": "off",
                "name": "--formsey-widget-background"
              },
              {
                "label": "Buttons hover",
                "name": "--formsey-widget-background-hover",
                "helpText": "Background color on hover",
                "autocomplete": "off",
                "type": "color"
              },
              {
                "label": "Border color",
                "name": "--formsey-border",
                "helpText": "Input field borders",
                "autocomplete": "off",
                "type": "color",
                "placeholder": ""
              },
              {
                "label": "Focus color",
                "name": "--formsey-border-focus",
                "helpText": "Focused border color",
                "autocomplete": "off",
                "type": "color",
                "placeholder": ""
              },
              {
                "placeholder": "3px",
                "label": "Border radius",
                "name": "--formsey-border-radius",
                "helpText": "Round borders for form fields",
                "autocomplete": "off",
                "type": "string"
              },
              {
                "label": "Padding",
                "autocomplete": "off",
                "placeholder": "0.1em 0.25em",
                "type": "string",
                "helpText": "Vertical and horizontal spacing",
                "name": "--formsey-padding"
              }
            ],
            "value": "custom",
            "label": "Custom",
            "name": "custom",
            "layout": {
              "responsive": {
                "s": {
                  "formatter": "columns",
                  "columns": [
                    1,
                    1,
                    1,
                    1
                  ]
                }
              }
            }
          },
          {
            "label": "None",
            "name": "none",
            "value": "none"
          }
        ],
        "type": "selectableSection"
      }
    ],
    "layout": {
      "static": {
        "formatter": "box",
        "spacing": "narrow"
      },
      "responsive": {
        "xs": {
          "formatter": "columns",
          "columns": [
            1
          ]
        }
      }
    }
  } as any
}