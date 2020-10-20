export { BooleanField } from './BooleanField'
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
export { OptionalSectionField } from './OptionalSectionField'
export { PasswordField } from './PasswordField'
export { PhoneField } from './PhoneField'
export { SearchField } from './SearchField'
export { SectionField } from './SectionField'
export { SelectableSectionField } from './SelectableSectionField'
export { StringField } from './StringField'
export { StyledForm } from './StyledForm'
export { TextField } from './TextField'
export { TimeField } from './TimeField'
export { WeekField } from './WeekField'

import { getLibrary } from '@formsey/core'
import { html } from 'lit-html'

export const ICON_MATERIAL = html`<svg viewBox="0 0 32 32"><path d="M15.938 0.063c-8.802 0.001-15.937 7.135-15.938 15.938 0.001 8.802 7.135 15.937 15.938 15.938 8.802-0.001 15.937-7.135 15.937-15.938h0c-0.001-8.803-7.135-15.937-15.938-15.938zM24.070 6.915l-8.132 16.779-8.132-16.779 16.265 0zM15.938 1.944c3.293 0 6.315 1.13 8.71 3.024h-17.421c2.396-1.894 5.418-3.024 8.71-3.024zM5.281 25.165c-2.119-2.462-3.399-5.66-3.399-9.165s1.28-6.703 3.399-9.165v18.33zM7.057 10.105l7.313 15.088h-7.313v-15.088zM15.938 30.056c-3.293-0-6.315-1.13-8.711-3.024h17.421c-2.396 1.894-5.418 3.024-8.71 3.024zM17.505 25.193l7.313-15.088v15.088h-7.313zM26.594 25.165v-18.33c2.119 2.462 3.399 5.66 3.399 9.165-0 3.505-1.28 6.703-3.399 9.165z"></path></svg>`

let materialLibrary = getLibrary('material')
if (materialLibrary) {
    materialLibrary.icon = ICON_MATERIAL
    materialLibrary.displayName = "Material Design"
}