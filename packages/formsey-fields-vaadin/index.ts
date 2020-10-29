export { BooleanField } from './BooleanField'
export { ButtonField } from './ButtonField'
export { CheckboxesField } from './CheckboxesField'
export { ColorField } from './ColorField'
export { DateField } from './DateField'
export { DateTimeField } from './DateTimeField'
export { EmailField } from './EmailField'
export { FormField } from './FormField'
export { ListField } from './ListField'
export { MonthField } from './MonthField'
export { MultipleChoiceField } from './MultipleChoiceField'
export { NumberField } from './NumberField'
export { PasswordField } from './PasswordField'
export { PhoneField } from './PhoneField'
export { SearchField } from './SearchField'
export { StringField } from './StringField'
export { StyledForm } from './StyledForm'
export { TextField } from './TextField'
export { TimeField } from './TimeField'
export { URLField } from './URLField'
export { WeekField } from './WeekField'
export { UploadField } from './UploadField'
import { getLibrary, Settings } from '@formsey/core/Components'
import { FieldDefinition, FormDefinition } from '@formsey/core/FieldDefinitions'
import { html } from 'lit-html'

const ICON_VAADIN = html`<svg viewBox="0 0 32 32"><path d="M17.01 13.92c-.26.252-.591.376-.991.376-.427 0-.768-.122-1.026-.374-.26-.251-.403-.613-.427-1.086-.047-.879-.284-1.492-.708-1.835s-1.12-.517-2.088-.517l-7.506-.035c-1.25 0-2.218-.338-2.902-1.016-.686-.675-1.028-1.645-1.028-2.904v-2.972c0-.427.119-.779.355-1.052s.579-.409 1.028-.409c.449 0 .789.144 1.026.427 .235.287 .353.631 .353 1.035v1.425c0 1.02.52 1.531 1.558 1.531h7.506c1.04 0 1.899-.035 2.584.497 .686.534 1.109 1.172 1.275 1.908.164-.736.584-1.371 1.258-1.907.671-.532 1.526-.497 2.567-.497h7.506c1.039 0 1.554-.511 1.554-1.531v-1.425c0-.405.122-.748.356-1.035.233-.283.577-.427 1.025-.427s.792.137 1.025.409c.237.272 .356.625 .356 1.052v2.972c0 1.259-.344 2.229-1.025 2.904-.687.678-1.655 1.016-2.903 1.016h-7.504c-.97 0-1.667.172-2.089.517-.425.344-.664.968-.711 1.87-.023.473-.164.836-.425 1.084zM17.586 29.397c-.45.338-.975.508-1.586.508s-1.145-.17-1.612-.508-.919-.961-1.143-1.536l-5.244-10.37c-.162-.442-.243-.831-.243-1.167 0-.575.169-1.052.506-1.423.337-.373.763-.558 1.276-.558.673 0 1.171.357 1.491 1.067l4.969 10.038 4.922-10.04c.321-.71.819-1.067 1.493-1.067.546 0 .985.193 1.321.586 .336.388 .506.87 .506 1.445 0 .305-.081.676-.242 1.118l-5.245 10.37c-.257.575-.72 1.198-1.17 1.536z"></path></svg>`

function createCustomProperties(unprocessed: string): Object {
  const processed = {}
  unprocessed.split(';').forEach(property => {
    const tokens = property.trim().split(':');
    processed[tokens[0]] = tokens[1]
  })
  return processed
}

let vaadinLibrary = getLibrary('vaadin')
if (vaadinLibrary) {
  vaadinLibrary.icon = ICON_VAADIN
  vaadinLibrary.displayName = "Vaadin"
  vaadinLibrary.settingsEditor = {
    "type": "form",
    "layout": {
      "style": "padding:0px;"
    },
    "fields": [
      {
        "type": "list",
        "name": "theme",
        "label": "Theme",
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
      },
      {
        "type": "markdown",
        "default": "Check out the great [lumo theme editor](https://demo.vaadin.com/lumo-editor/)\nto adjust all the nifty details of your form.\nPaste the generated styles into the editor below to apply the generated thme."
      },
      {
        "type": "sourceCode",
        "mode": "html",
        "name": "lumoTheme"
      },
      {
        "label": "Password fields",
        "controlLabel": "Hide reveal password button",
        "name": "hideRevealPasswordButton",
        "type": "boolean"
      }
    ]
  } as FormDefinition,
    vaadinLibrary.onSettingsChanged = (settings: Settings): Settings => {
      const lumoStylesheet = settings['lumoTheme']
      if (lumoStylesheet) {
        const themes = lumoStylesheet.match(/[^{\}]+(?=})/g)
        if (themes.length == 2) {
          settings['light'] = createCustomProperties(themes[0])
          settings['dark'] = createCustomProperties(themes[1])
        }
      }
      delete settings['lumoTheme']
      return settings
    }
}