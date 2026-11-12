import type { FormDefinition } from '@formsey/core';

/** One entry in the playground's example switcher. */
export interface Example {
  title: string
  definition: FormDefinition
  value?: { [key: string]: any }
}

/**
 * Field definitions are plain JSON. Each field type adds its own properties
 * (see FieldDefinitions.ts), which the generic `FieldDefinition[]` type of
 * `fields` cannot express, hence the loosely typed helper.
 */
function define(definition: { [key: string]: any }): FormDefinition {
  return definition as FormDefinition
}

const OPTIONS = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" }
]

/**
 * A responsive layout: one column on phones, two from the "m" breakpoint up.
 * Breakpoints are measured against the width of the form, not the viewport.
 */
const TWO_COLUMNS = {
  xs: { formatter: "columns", columns: [1], gaps: "narrow", padding: "wide" },
  m: { formatter: "columns", columns: [1, 1], gaps: "wide", padding: "wide" }
}

const ONE_COLUMN = {
  xs: { formatter: "columns", columns: [1], gaps: "narrow", padding: "wide" }
}

export const EXAMPLES: Example[] = [
  {
    title: "Contact form",
    definition: define({
      type: "form",
      layout: TWO_COLUMNS,
      fields: [
        { type: "string", name: "firstName", label: "First name", required: true, autocomplete: "given-name" },
        { type: "string", name: "lastName", label: "Last name", required: true, autocomplete: "family-name" },
        { type: "email", name: "email", label: "Email", helpText: "We will never share your address", required: true },
        { type: "phone", name: "phone", label: "Phone" },
        { type: "text", name: "message", label: "Message", placeholder: "How can we help?" },
        { type: "checkbox", name: "newsletter", label: "Newsletter", controlLabel: "Keep me posted" },
        { type: "button", name: "send", text: "Send", buttonType: "submit", theme: "primary" }
      ]
    }),
    value: { firstName: "Ada" }
  },
  {
    title: "Inputs",
    definition: define({
      type: "form",
      layout: TWO_COLUMNS,
      fields: [
        { type: "string", name: "string", label: "String", placeholder: "Single line" },
        { type: "password", name: "password", label: "Password" },
        { type: "number", name: "number", label: "Number", min: 0, max: 10, step: 1 },
        { type: "range", name: "range", label: "Range", min: 0, max: 100 },
        { type: "url", name: "url", label: "URL" },
        { type: "search", name: "search", label: "Search" },
        { type: "date", name: "date", label: "Date" },
        { type: "time", name: "time", label: "Time" },
        { type: "datetime", name: "datetime", label: "Date and time" },
        { type: "month", name: "month", label: "Month" },
        { type: "week", name: "week", label: "Week" },
        { type: "color", name: "color", label: "Color" },
        { type: "text", name: "text", label: "Text" },
        { type: "upload", name: "upload", label: "Upload", multiple: true }
      ]
    }),
    value: { number: 3, color: "#d97706" }
  },
  {
    title: "Choices",
    definition: define({
      type: "form",
      layout: TWO_COLUMNS,
      fields: [
        { type: "checkbox", name: "checkbox", label: "Checkbox", controlLabel: "I agree" },
        { type: "switch", name: "switch", label: "Switch", controlLabel: "Enabled" },
        { type: "checkboxes", name: "checkboxes", label: "Checkboxes", options: OPTIONS, layout: "vertical" },
        { type: "multipleChoice", name: "multipleChoice", label: "Multiple choice", options: OPTIONS, layout: "vertical" },
        { type: "select", name: "select", label: "Select", options: OPTIONS },
        { type: "list", name: "list", label: "List", options: OPTIONS },
        { type: "combobox", name: "combobox", label: "Combobox", options: OPTIONS },
        {
          type: "toggle", name: "toggle", label: "Toggle", buttons: [
            { name: "left", text: "Left" },
            { name: "center", text: "Center" },
            { name: "right", text: "Right" }
          ]
        }
      ]
    }),
    value: { select: "green", toggle: "center" }
  },
  {
    title: "Sections",
    definition: define({
      type: "form",
      layout: ONE_COLUMN,
      fields: [
        { type: "title", label: "Nested sections", helpText: "Forms can be nested, repeated and switched on demand" },
        {
          type: "optionalSection", name: "shipping", label: "Shipping", control: "switch", controlLabel: "Ship to a different address",
          layout: TWO_COLUMNS,
          fields: [
            { type: "string", name: "street", label: "Street" },
            { type: "string", name: "city", label: "City" }
          ]
        },
        {
          type: "repeatingSection", name: "guests", label: "Guests", min: 1, max: 4,
          layout: TWO_COLUMNS,
          fields: [
            { type: "string", name: "name", label: "Name", required: true },
            { type: "email", name: "email", label: "Email" }
          ]
        },
        {
          type: "selectableSection", name: "payment", label: "Payment", control: "select", key: "method",
          selections: [
            { label: "Invoice", value: "invoice", fields: [{ type: "string", name: "vatId", label: "VAT ID" }] },
            { label: "Card", value: "card", fields: [{ type: "string", name: "holder", label: "Card holder" }] }
          ]
        },
        {
          type: "dialogSection", name: "details", header: "Details", width: "24em",
          trigger: { type: "button", text: "Open dialog" },
          actions: [
            { type: "button", name: "ok", text: "OK", theme: "primary" },
            { type: "button", name: "cancel", text: "Cancel" }
          ],
          layout: ONE_COLUMN,
          fields: [
            { type: "string", name: "note", label: "Note" }
          ]
        },
        {
          type: "tabs", name: "tabs", location: "top", expand: false,
          selections: [
            { label: "First", value: "first", name: "first", layout: ONE_COLUMN, fields: [{ type: "string", name: "a", label: "Field on the first tab" }] },
            { label: "Second", value: "second", name: "second", layout: ONE_COLUMN, fields: [{ type: "string", name: "b", label: "Field on the second tab" }] }
          ]
        }
      ]
    })
  },
  {
    title: "Extended",
    definition: define({
      type: "form",
      layout: ONE_COLUMN,
      fields: [
        { type: "markdown", default: "## Markdown\nRendered with **@ts-stack/markdown** and highlighted by highlight.js:\n```javascript\nconst answer = 42\n```" },
        { type: "sourceCode", name: "source", label: "Source code", mode: "javascript", gutter: true, height: "140px" },
        { type: "signature", name: "signature", label: "Signature", width: "100%", height: "140px" },
        { type: "name", name: "name", label: "Name (compound field)" },
        {
          type: "address", name: "address", label: "Address (compound field)",
          includeAddressLine1: true, labelAddressLine1: "Street",
          includePostalCode: true, labelPostalCode: "Postal code",
          includeCity: true, labelCity: "City"
        }
      ]
    }),
    value: { source: "function hello() {\n  return 'Formsey'\n}" }
  }
]
