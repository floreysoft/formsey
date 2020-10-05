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
export { NestedFormField } from './NestedFormField';
export { NumberField } from './NumberField';
export { OptionalSectionField } from './OptionalSectionField';
export { PasswordField } from './PasswordField';
export { PhoneField } from './PhoneField';
export { RepeatingSectionField as RepeatingField } from './RepeatingSectionField';
export { SearchField } from './SearchField';
export { SectionField } from './SectionField';
export { SelectableSectionField } from './SelectableSectionField';
export { StringField } from './StringField';
export { TextField } from './TextField';
export { TimeField } from './TimeField';
export { ICON_FILE, ICON_REMOVE, ICON_UPLOAD, UploadField } from './UploadField';
export { URLField } from './URLField';
export { WeekField } from './WeekField';
export { YouTubeField } from './YouTubeField';

import { getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition, FormDefinition } from '@formsey/core/FieldDefinitions';
import { TemplateResult } from 'lit-element';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export const ICON_BROWSER = html`<svg viewBox="0 0 32 32"><path d="M30 2h-28c-1 0-2 .9-2 2v24c0 1.102.9 2 2 2h28c1 0 2-.9 2-2v-24c.002-1.1-.9-2-2-2zM11.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.83 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5zM7.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.83 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5zM3.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zM30 28c-.004 0-.004 0-.004.004h-28c-.002-.004-.002-.004-.004-.004v-20h28v20z"></path></svg>`

let nativeLibrary = getLibrary('native')
if (nativeLibrary) {
  nativeLibrary.icon = ICON_BROWSER
  nativeLibrary.displayName = "Native"
  nativeLibrary.settingsEditor = {
    "type": "form",
    "layout": {
      "style": "padding:0px;"
    },
    "fields": [
      {
        "type": "nestedForm",
        "form": {
          "type": "form",
          "fields": [
            {
              "type": "list",
              "label": "Theme",
              "name": "theme",
              "options": [
                {
                  "label": "Dark",
                  "name": "dark",
                  "value": "dark"
                },
                {
                  "label": "Light",
                  "name": "light",
                  "value": "light"
                }
              ]
            }
          ],
          "name": "options",
          "label": "Options",
          "layout": {
            "style": "padding:0px;background-color:undefined;border-bottom:undefined;border-color:undefined"
          },
          "helpText": ""
        },
        "name": "options"
      },
      {
        "type": "nestedForm",
        "form": {
          "type": "form",
          "fields": [
            {
              "type": "color",
              "label": "Primary color",
              "name": "--formsey-primary-color"
            },
            {
              "type": "color",
              "label": "Focus border color",
              "name": "--formsey-border-color-focus"
            }
          ],
          "name": "customProperties",
          "layout": {
            "style": "padding:0px;background-color:undefined;border-bottom:undefined;border-color:undefined"
          },
          "label": "Styles",
          "helpText": "Configure the style of the components in this library"
        },
        "name": "customProperties"
      } as FieldDefinition
    ]
  } as FormDefinition,
  nativeLibrary.canvas = (settings: Settings, content: TemplateResult ) => html`<fs-theme theme=${ifDefined(settings?.options['theme'])}>${content}</fs-theme>`
}