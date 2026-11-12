// Renders one definition with the Material and the Vaadin field library.
//
// A library only has to provide the field types it wants to restyle. Types it
// does not know (here: the "form" container) are looked up in the other
// registered libraries, which is why the native library is imported as well.
import '@formsey/fields-native';
import '@formsey/fields-material';
import '@formsey/fields-vaadin';
// Vaadin 25 components are unstyled until a theme stylesheet is loaded
import '@vaadin/vaadin-lumo-styles/lumo.css';
import { getLibrary, type Form, type FormDefinition } from '@formsey/core';

const options = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" }
]

function createDefinition(): FormDefinition {
  return {
    type: "form",
    layout: {
      xs: { formatter: "columns", columns: [1], gaps: "wide", padding: "wide" },
      m: { formatter: "columns", columns: [1, 1], gaps: "wide", padding: "wide" }
    },
    fields: [
      { type: "string", name: "string", label: "String", required: true },
      { type: "email", name: "email", label: "Email" },
      { type: "number", name: "number", label: "Number" },
      { type: "password", name: "password", label: "Password" },
      { type: "text", name: "text", label: "Text" },
      { type: "date", name: "date", label: "Date" },
      { type: "checkbox", name: "checkbox", label: "Checkbox", controlLabel: "I agree" },
      { type: "switch", name: "switch", label: "Switch", controlLabel: "Enabled" },
      { type: "checkboxes", name: "checkboxes", label: "Checkboxes", options },
      { type: "multipleChoice", name: "multipleChoice", label: "Multiple choice", options },
      { type: "list", name: "list", label: "List", options },
      { type: "color", name: "color", label: "Color" },
      { type: "time", name: "time", label: "Time" },
      { type: "url", name: "url", label: "URL" }
    ]
  } as FormDefinition
}

for (const name of ["material", "vaadin"]) {
  const form = document.querySelector<Form>(`#${name}`)!
  form.library = getLibrary(name)
  form.definition = createDefinition()
  form.value = { string: "hello" }
  form.addEventListener('change', () => console.log(name, JSON.stringify(form.value)))
}
