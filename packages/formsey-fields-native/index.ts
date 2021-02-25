export * from '@formsey/core';
export { ButtonField } from './ButtonField';
export { CheckboxesField } from './CheckboxesField';
export { CheckboxField } from './CheckboxField';
export { ColorField, ICON_COLOR_FIELD } from './ColorField';
export { ComboboxField } from './ComboboxField';
export { CurrencyField } from './CurrencyField';
export { DialogSectionField } from './DialogSectionField';
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
export { OptionField } from './OptionField';
export { PanelField } from './PanelField';
export { PasswordField } from './PasswordField';
export { PhoneField } from './PhoneField';
export { PopupSectionField } from './PopupSectionField';
export { RangeField } from './RangeField';
export { RepeatingSectionField } from './RepeatingSectionField';
export { ResponsivePanelField } from './ResponsivePanelField';
export { SearchField } from './SearchField';
export { LocaleField } from './LocaleField';
export { SelectableSectionField } from './SelectableSectionField';
export { SelectField } from './SelectField';
export { SplitPanelField } from './SplitPanelField';
export { StringField } from './StringField';
export { StyledForm } from './StyledForm';
export { SwitchField } from './SwitchField';
export { TableField } from './TableField';
export { TabsField } from './TabsField';
export { TemplateField } from './TemplateField';
export { TextField } from './TextField';
export { TimeField } from './TimeField';
export { TimezoneField } from './TimezoneField';
export { TitleField } from './TitleField';
export { ToggleField } from './ToggleField';
export { ICON_FILE, ICON_REMOVE, ICON_UPLOAD, UploadField } from './UploadField';
export { URLField } from './URLField';
export { WeekField } from './WeekField';
export { YouTubeField } from './YouTubeField';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary } from '@formsey/core/Registry';
import { html } from 'lit-html';

export const ICON_BROWSER = html`<svg viewBox="0 0 32 32"><path d="M30 2h-28c-1 0-2 .9-2 2v24c0 1.102.9 2 2 2h28c1 0 2-.9 2-2v-24c.002-1.1-.9-2-2-2zM11.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.83 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5zM7.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c-.83 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5zM3.5 3.5c.83 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zM30 28c-.004 0-.004 0-.004.004h-28c-.002-.004-.002-.004-.004-.004v-20h28v20z"></path></svg>`

const themes = new Map<string, Theme>([
  ["formsey", {
    colors: {
      light: {
        "--formsey-color": "#000000",
        "--formsey-error-text-color": "#ff3333",
        "--formsey-background": "#ffffff",
        "--formsey-accent-color": "#007dd2",
        "--formsey-accent-contrast": "#ffffff",
        "--formsey-border": "transparent",
        "--formsey-border-focus": "#007fd4",
        "--formsey-widget-background": "#eeeeee",
        "--formsey-widget-background-hover": "#dddddd",
        "--formsey-shade": "#80808030",

        "--formsey-palette-1": "#493657",
        "--formsey-palette-2": "#CE7DA5",
        "--formsey-palette-3": "#BEE5BF",
        "--formsey-palette-4": "#DFF3E3",
        "--formsey-palette-5": "#FFD1BA",

        "--formsey-token-invisible": "#bfbfbf",
        "--formsey-token-keyword": "#0000FF",
        "--formsey-token-constant": "#06960e",
        "--formsey-token-language": "#0000FF",
        "--formsey-token-library": "#06960e",
        "--formsey-token-invalid": "#CD3131",
        "--formsey-token-operator": "#000000",
        "--formsey-token-function": "#3c4c72",
        "--formsey-token-type": "#0000FF",
        "--formsey-token-string": "#A31515",
        "--formsey-token-comment": "#008000",
        "--formsey-token-tag": "#800000",
        "--formsey-token-numeric": "#098658",
        "--formsey-token-variable": "#000000",
        "--formsey-marker-step": "#fcff00",
        "--formsey-marker-stack": "#a4e565",
        "--formsey-marker-selection": "#3a3d4111",
        "--formsey-marker-selected-word": "#3a3d4144",

        "--formsey-elevation-1-shadow": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        "--formsey-elevation-2-shadow": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        "--formsey-elevation-3-shadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",

        "--formsey-elevation-0-opacity": "0%",
        "--formsey-elevation-1-opacity": "5%",
        "--formsey-elevation-2-opacity": "5%",
        "--formsey-elevation-3-opacity": "5%",
      },
      dark: {
        "--formsey-color": "#f5f5f5",
        "--formsey-error-text-color": "#ff9f9f",
        "--formsey-background": "#000000",
        "--formsey-accent-color": "#007fd4",
        "--formsey-accent-contrast": "#ffffff",
        "--formsey-border": "transparent",
        "--formsey-border-focus": "#007fd4",
        "--formsey-shade": "#80808040",
        "--formsey-widget-background": "#2d2d2d",
        "--formsey-widget-background-hover": "#37373d",

        "--formsey-token-invisible": "#bfbfbf",
        "--formsey-token-keyword": "#569CD6",
        "--formsey-token-constant": "#06960e",
        "--formsey-token-language": "#569CD6",
        "--formsey-token-library": "#06960e",
        "--formsey-token-invalid": "#F44747",
        "--formsey-token-operator": "#D4D4D4",
        "--formsey-token-function": "#3c4c72",
        "--formsey-token-type": "#6d79de",
        "--formsey-token-string": "#ce9178",
        "--formsey-token-comment": "#6A9955",
        "--formsey-token-tag": "#569CD6",
        "--formsey-token-numeric": "#B5CEA8",
        "--formsey-token-variable": "#9cdcfe",
        "--formsey-marker-step": "#fcff00",
        "--formsey-marker-stack": "#a4e565",
        "--formsey-marker-selection": "#3a3d4166",
        "--formsey-marker-selected-word": "#3a3d41",

        "--formsey-elevation-0-opacity": "0",
        "--formsey-elevation-1-opacity": "10%",
        "--formsey-elevation-2-opacity": "14%",
        "--formsey-elevation-3-opacity": "18%"
      }
    },
    fonts: {
      "--formsey-font": "14px Roboto",
      "--formsey-font-coarse": "15px Roboto"
    },
    spacing: {
      "--formsey-space-narrow": ".25em",
      "--formsey-space-wide": ".5em",
      "--formsey-border-radius": "3px",
    }
  }],
  ["candy", {
    colors: {
      light: {
        "--formsey-color": "#550051",
        "--formsey-error-text-color": "#ff3333",
        "--formsey-background": "#768546",
        "--formsey-accent-color": "#007dd2",
        "--formsey-accent-contrast": "#ffffff",
        "--formsey-border": "transparent",
        "--formsey-border-focus": "#007fd4",
        "--formsey-widget-background": "#eeeeee",
        "--formsey-widget-background-hover": "#dddddd",
        "--formsey-shade": "#80808030",

        "--formsey-palette-1": "#493657",
        "--formsey-palette-2": "#CE7DA5",
        "--formsey-palette-3": "#BEE5BF",
        "--formsey-palette-4": "#DFF3E3",
        "--formsey-palette-5": "#FFD1BA",

        "--formsey-token-invisible": "#bfbfbf",
        "--formsey-token-keyword": "#0000FF",
        "--formsey-token-constant": "#06960e",
        "--formsey-token-language": "#0000FF",
        "--formsey-token-library": "#06960e",
        "--formsey-token-invalid": "#CD3131",
        "--formsey-token-operator": "#000000",
        "--formsey-token-function": "#3c4c72",
        "--formsey-token-type": "#0000FF",
        "--formsey-token-string": "#A31515",
        "--formsey-token-comment": "#008000",
        "--formsey-token-tag": "#800000",
        "--formsey-token-numeric": "#098658",
        "--formsey-token-variable": "#000000",
        "--formsey-marker-step": "#fcff00",
        "--formsey-marker-stack": "#a4e565",
        "--formsey-marker-selection": "#3a3d4111",
        "--formsey-marker-selected-word": "#3a3d4144",

        "--formsey-elevation-1-shadow": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        "--formsey-elevation-2-shadow": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        "--formsey-elevation-3-shadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",

        "--formsey-elevation-0-opacity": "0%",
        "--formsey-elevation-1-opacity": "5%",
        "--formsey-elevation-2-opacity": "5%",
        "--formsey-elevation-3-opacity": "5%",
      },
      dark: {
        "--formsey-color": "#f5f5f5",
        "--formsey-error-text-color": "#ff9f9f",
        "--formsey-background": "#000000",
        "--formsey-accent-color": "#007fd4",
        "--formsey-accent-contrast": "#ffffff",
        "--formsey-border": "transparent",
        "--formsey-border-focus": "#007fd4",
        "--formsey-shade": "#80808040",
        "--formsey-widget-background": "#2d2d2d",
        "--formsey-widget-background-hover": "#37373d",

        "--formsey-token-invisible": "#bfbfbf",
        "--formsey-token-keyword": "#569CD6",
        "--formsey-token-constant": "#06960e",
        "--formsey-token-language": "#569CD6",
        "--formsey-token-library": "#06960e",
        "--formsey-token-invalid": "#F44747",
        "--formsey-token-operator": "#D4D4D4",
        "--formsey-token-function": "#3c4c72",
        "--formsey-token-type": "#6d79de",
        "--formsey-token-string": "#ce9178",
        "--formsey-token-comment": "#6A9955",
        "--formsey-token-tag": "#569CD6",
        "--formsey-token-numeric": "#B5CEA8",
        "--formsey-token-variable": "#9cdcfe",
        "--formsey-marker-step": "#fcff00",
        "--formsey-marker-stack": "#a4e565",
        "--formsey-marker-selection": "#3a3d4166",
        "--formsey-marker-selected-word": "#3a3d41",

        "--formsey-elevation-0-opacity": "0",
        "--formsey-elevation-1-opacity": "10%",
        "--formsey-elevation-2-opacity": "14%",
        "--formsey-elevation-3-opacity": "18%"
      }
    },
    fonts: {
      "--formsey-font": "15px Arial",
      "--formsey-font-coarse": "16px Arial"
    },
    spacing: {
      "--formsey-space-narrow": ".3em",
      "--formsey-space-wide": ".6em",
      "--formsey-border-radius": "5px",
    }
  }]
])

type CustomProperties = { [key: string]: string }

type Theme = {
  colors: {
    light: CustomProperties
    dark: CustomProperties
  }
  fonts: CustomProperties
  spacing: CustomProperties
}

function createFonts(properties: CustomProperties): any[] {
  return [
    {
      "type": "string",
      "name": "--formsey-font",
      "label": "Font"
    },
    {
      "type": "string",
      "name": "--formsey-font-coarse",
      "label": "Font on touch devices"
    }
  ]
}

function createSpacing(properties: CustomProperties): any[] {
  return [
    {
      "type": "string",
      "name": "--formsey-space-narrow",
      "label": "Spacing narrow"
    },
    {
      "type": "string",
      "name": "--formsey-space-wide",
      "label": "Spacing wide"
    },
    {
      "type": "string",
      "name": "--formsey-border-radius",
      "label": "Border radius"
    }
  ]
}

function createColors(properties: CustomProperties): any[] {
  return [
    {
      "type": "color",
      "name": "--formsey-background",
      "label": "Background color",
      "helpText": "Background color of the form"
    },
    {
      "helpText": "Foreground color used for text, icons and more",
      "name": "--formsey-color",
      "type": "color",
      "label": "Text color"
    },
    {
      "label": "Fields shade",
      "helpText": "Background color for input fields",
      "name": "--formsey-shade",
      "placeholder": "#80808030",
      "type": "color"
    },
    {
      "autocomplete": "off",
      "helpText": "Color to highlight active field",
      "type": "color",
      "name": "--formsey-accent-color",
      "label": "Accent color"
    },
    {
      "label": "Accent hover color",
      "helpText": "Hover color for accented items",
      "name": "--formsey-accent-hover",
      "type": "color"
    },
    {
      "autocomplete": "off",
      "helpText": "Used for text and icons on top of accent color",
      "label": "Accent contrast",
      "name": "--formsey-accent-contrast",
      "type": "color"
    },
    {
      "name": "--formsey-error-backkground",
      "placeholder": "#FF000020",
      "helpText": "Background color for invalid fields",
      "type": "color",
      "label": "Error color",
      "default": "#FF000020"
    },
    {
      "label": "Error text color",
      "helpText": "Text color for error message",
      "name": "--formsey-error-text",
      "type": "color"
    },
    {
      "autocomplete": "off",
      "helpText": "Background color for buttons",
      "label": "Buttons",
      "name": "--formsey-widget-background",
      "type": "color"
    },
    {
      "type": "color",
      "name": "--formsey-widget-background-hover",
      "helpText": "Background color on hover",
      "label": "Buttons hover"
    },
    {
      "placeholder": "",
      "name": "--formsey-border",
      "type": "color",
      "label": "Border color",
      "helpText": "Input field borders"
    },
    {
      "label": "Focus color",
      "placeholder": "",
      "name": "--formsey-border-focus",
      "helpText": "Focused border color",
      "type": "color"
    }
  ]
}

function createTheme(theme: Theme): any[] {
  return [
    {
      "type": "tabs",
      "expand": false,
      "location": "top",
      "selections": [
        {
          "label": "Colors",
          "name": "colors",
          "fields": [
            {
              "expand": true,
              "selections": [
                {
                  "fields": createColors(theme.colors.light),
                  "label": "Light mode",
                  "name": "light",
                  "layout": {
                    "l": {
                      "formatter": "areas",
                      "areas": [
                        "--formsey-background --formsey-color --formsey-shade --formsey-accent-color --formsey-accent-hover --formsey-accent-contrast",
                        "--formsey-error-backkground --formsey-error-text --formsey-widget-background --formsey-widget-background-hover --formsey-border --formsey-border-focus"
                      ],
                      "alignments": [],
                      "columns": [
                        2,
                        2,
                        2,
                        2,
                        2,
                        2
                      ]
                    },
                    "m": {
                      "columns": [
                        {
                          "width": 1,
                          "horizontal": "expand"
                        },
                        {
                          "width": 1,
                          "horizontal": "expand"
                        },
                        {
                          "horizontal": "expand",
                          "width": 1
                        },
                        {
                          "width": 1,
                          "horizontal": "expand"
                        }
                      ],
                      "formatter": "columns",
                      "gaps": "narrow"
                    },
                    "static": {
                      "formatter": "box",
                      "elevation": "0",
                      "padding": "wide"
                    },
                    "xs": {
                      "formatter": "columns",
                      "columns": [
                        {
                          "width": 1,
                          "horizontal": "expand"
                        },
                        {
                          "width": 1,
                          "horizontal": "expand"
                        }
                      ]
                    },
                    "s": {
                      "formatter": "columns",
                      "columns": [
                        {
                          "horizontal": "expand",
                          "width": 1
                        },
                        {
                          "width": 1,
                          "horizontal": "expand"
                        },
                        {
                          "width": 1,
                          "horizontal": "expand"
                        }
                      ]
                    }
                  }
                },
                {
                  "label": "Dark mode",
                  "fields": createColors(theme.colors.dark),
                  "name": "dark",
                  "layout": {
                    "l": {
                      "formatter": "areas",
                      "alignments": [],
                      "areas": [
                        "--formsey-background --formsey-color --formsey-shade --formsey-accent-color --formsey-accent-hover --formsey-accent-contrast",
                        "--formsey-error-backkground --formsey-error-text --formsey-widget-background --formsey-widget-background-hover --formsey-border --formsey-border-focus"
                      ],
                      "columns": [
                        2,
                        2,
                        2,
                        2,
                        2,
                        2
                      ]
                    },
                    "s": {
                      "columns": [
                        {
                          "horizontal": "expand",
                          "width": 1
                        },
                        {
                          "horizontal": "expand",
                          "width": 1
                        },
                        {
                          "width": 1,
                          "horizontal": "expand"
                        }
                      ],
                      "formatter": "columns"
                    },
                    "xs": {
                      "formatter": "columns",
                      "columns": [
                        {
                          "width": 1,
                          "horizontal": "expand"
                        },
                        {
                          "horizontal": "expand",
                          "width": 1
                        }
                      ]
                    },
                    "static": {
                      "padding": "wide",
                      "elevation": "0",
                      "formatter": "box"
                    },
                    "m": {
                      "columns": [
                        {
                          "width": 1,
                          "horizontal": "expand"
                        },
                        {
                          "width": 1,
                          "horizontal": "expand"
                        },
                        {
                          "width": 1,
                          "horizontal": "expand"
                        },
                        {
                          "width": 1,
                          "horizontal": "expand"
                        }
                      ],
                      "gaps": "narrow",
                      "formatter": "columns"
                    }
                  }
                }
              ],
              "location": "bottom",
              "type": "tabs"
            }
          ]
        },
        {
          "name": "fonts",
          "label": "Fonts",
          "fields": [
            ...createFonts(theme.fonts),
            {
              "type": "optionalSection",
              "control": "switch",
              "controlLabel": "Load font",
              "name": "loadWebfont",
              "label": "Load custom web font",
              "fields": [
                {
                  "type": "url",
                  "label": "URL",
                  "name": "url",
                  "autocomplete": "off"
                }
              ]
            }
          ],
          "layout": {
            "static": {
              "padding": "wide",
              "formatter": "box"
            }
          }
        },
        {
          "name": "spacing",
          "label": "Spacing",
          "fields": createSpacing(theme.spacing),
          "layout": {
            "xs": {
              "horizontal": "expand",
              "gaps": "narrow",
              "formatter": "flex",
              "vertical": "top",
              "wrap": "wrap",
              "direction": "horizontal"
            },
            "static": {
              "formatter": "box",
              "padding": "wide"
            }
          }
        }
      ]
    }
  ]
}

let nativeLibrary = getLibrary('native')
if (nativeLibrary) {
  nativeLibrary.icon = ICON_BROWSER
  nativeLibrary.displayName = "Native"
  nativeLibrary.defaultSettings = {
    theme: {
      value: themes.get("formsey")
    }
  }
  nativeLibrary.settingsEditor = {
    "type": "form",
    "fields": [
      {
        "name": "theme",
        "type": "selectableSection",
        "label": "Theme",
        "selection": "select",
        "selections": [
          {
            "value": "formsey",
            "name": "formsey",
            "label": "Formsey",
            "fields": createTheme(themes.get("formsey")),
            "default": themes.get("formsey")
          },
          {
            "value": "candy",
            "name": "candy",
            "label": "Candy",
            "fields": createTheme(themes.get("candy")),
            "default": themes.get("candy")
          }
        ],
        "default": {
          selection: "formsey",
          value: themes.get("formsey")
        }
      }
    ],
    layout: {
      static: {
        formatter: "box",
        padding: "wide"
      }
    }
  } as any
}