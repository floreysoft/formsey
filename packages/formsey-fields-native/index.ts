export * from '@formsey/core';
export { BooleanField } from './BooleanField';
export { ButtonField } from './ButtonField';
export { CheckboxesField } from './CheckboxesField';
export { ColorField, ICON_COLOR_FIELD } from './ColorField';
export { DateField } from './DateField';
export { DateTimeField } from './DateTimeField';
export { EmailField } from './EmailField';
export { ImageField } from './ImageField';
export { ImagesField } from './ImagesField';
export { ListField } from './ListField';
export { MarkupField } from './MarkupField';
export { MonthField } from './MonthField';
export { MultipleChoiceField } from './MultipleChoiceField';
export { NumberField } from './NumberField';
export { OptionalSectionField } from './OptionalSectionField';
export { PasswordField } from './PasswordField';
export { PhoneField } from './PhoneField';
export { RepeatingSectionField as RepeatingField } from './RepeatingSectionField';
export { SearchField } from './SearchField';
export { TitleField as SectionField } from './TitleField';
export { SelectableSectionField } from './SelectableSectionField';
export { StringField } from './StringField';
export { StyledForm } from './StyledForm';
export { TextField } from './TextField';
export { TimeField } from './TimeField';
export { ICON_FILE, ICON_REMOVE, ICON_UPLOAD, UploadField } from './UploadField';
export { URLField } from './URLField';
export { WeekField } from './WeekField';
export { YouTubeField } from './YouTubeField';

import { getLibrary } from '@formsey/core/Components';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { html } from 'lit-html';

export const ICON_BROWSER = html`<svg viewBox="0 0 32 32"><path d="M30 2h-28c-1 0-2 .9-2 2v24c0 1.102.9 2 2 2h28c1 0 2-.9 2-2v-24c.002-1.1-.9-2-2-2zM11.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.83 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5zM7.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.83 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5zM3.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zM30 28c-.004 0-.004 0-.004.004h-28c-.002-.004-.002-.004-.004-.004v-20h28v20z"></path></svg>`

let nativeLibrary = getLibrary('native')
if (nativeLibrary) {
  nativeLibrary.icon = ICON_BROWSER
  nativeLibrary.displayName = "Native"
  nativeLibrary.settingsEditor = {
    "type": "form",
    "layout": {
      "grids": {
        "xs": "grid-template-columns:minmax(0,1fr);grid-gap:5px 5px;padding:0px 0px",
      }
    },
    "fields": [
      {
        "label": "Theme",
        "helpText": "Select the theme for your form",
        "options": [
          {
            "name": "light",
            "label": "Light",
            "value": "light"
          },
          {
            "value": "dark",
            "label": "Dark",
            "name": "dark"
          },
          {
            "name": "auto",
            "value": "auto",
            "label": "Auto"
          },
          {
            "name": "none",
            "label": "None",
            "value": "none"
          }
        ],
        "type": "list",
        "name": "theme"
      },
      {
        "form": {
          "fields": [
            {
              "label": "",
              "helpText": "Light theme",
              "name": "",
              "type": "title"
            },
            {
              "name": "--formsey-background",
              "type": "color",
              "label": "Background color",
              "helpText": "Background color of the form",
              "autocomplete": "off"
            },
            {
              "label": "Text color",
              "helpText": "Foreground color used for text, icons and more",
              "autocomplete": "off",
              "name": "--formsey-color",
              "type": "color"
            },
            {
              "name": "--formsey-accent-color",
              "helpText": "Color to highlight active field",
              "type": "color",
              "autocomplete": "off",
              "label": "Accent color"
            },
            {
              "name": "--formsey-accent-contrast",
              "type": "color",
              "label": "Contrast color",
              "helpText": "Used for text and icons on top of accent color",
              "autocomplete": "off"
            },
            {
              "autocomplete": "off",
              "name": "--formsey-widget-background",
              "label": "Widget background",
              "helpText": "Background color for buttons",
              "type": "color"
            },
            {
              "helpText": "Background color on hover",
              "autocomplete": "off",
              "type": "color",
              "name": "--formsey-widget-background-hover",
              "label": "Widget hover background"
            },
            {
              "label": "Padding",
              "placeholder": "0.1em 0.25em",
              "autocomplete": "off",
              "name": "--formsey-padding",
              "type": "string",
              "helpText": "Vertical and horizontal spacing"
            },
            {
              "placeholder": "3px",
              "autocomplete": "off",
              "helpText": "Round borders for form fields",
              "name": "--formsey-border-radius",
              "type": "string",
              "label": "Border radius"
            }
          ],
          "name": "light",
          "type": "form",
          "layout": {
            "grids": {
              "m": "grid-template-columns:minmax(0,4fr) minmax(0,2fr) minmax(0,2fr) minmax(0,4fr);grid-template-areas: '_title0 _title0 _title0 _title0' '_--formsey-background _--formsey-color _--formsey-color _--formsey-accent-color' '_--formsey-accent-contrast _--formsey-widget-background _--formsey-widget-background _--formsey-widget-background-hover' '_--formsey-padding _--formsey-padding _--formsey-border-radius _--formsey-border-radius';grid-gap:5px 5px;padding:5px 0px",
              "xs": "grid-template-columns:minmax(0,1fr);grid-gap:5px 0px;padding:0px 0px",
            }
          }
        },
        "name": "light",
        "type": "nestedForm"
      },
      {
        "label": "",
        "name": "",
        "helpText": "Dark theme",
        "type": "title"
      }
    ]
  } as any
}