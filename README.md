<p align="center">
  <img src="https://www.formsey.com/assets/images/formsey.png" alt="Formsey" width="400" height="auto" />
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@formsey/core"><img alt="NPM Version" src="https://img.shields.io/npm/v/@formsey/core.svg" height="20"/></a>
  <a href="https://npmcharts.com/compare/@formsey/core?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@formsey/core.svg" height="20"/></a>
</p>

# Formsey

Responsive forms from JSON definitions, built with Web Components and [Lit](https://lit.dev).

A form is described by a plain JSON **definition**. Formsey renders it with a
**library** of field components, keeps the **value** (also plain JSON) in sync
and reports changes and validation errors through events. Layouts are
responsive to the width of the form itself, not of the viewport, so the same
form works in a sidebar and on a full page.

Demo: <https://www.formsey.com>

## Quick start

```
npm install @formsey/fields-native
```

```html
<formsey-form></formsey-form>

<script type="module">
  // Importing a field package registers its components
  import '@formsey/fields-native'

  const form = document.querySelector('formsey-form')
  form.definition = {
    type: "form",
    layout: {
      // one column on narrow forms, two columns from 568px
      xs: { formatter: "columns", columns: [1], padding: "wide" },
      m: { formatter: "columns", columns: [1, 1], gaps: "wide", padding: "wide" }
    },
    fields: [
      { type: "string", name: "firstName", label: "First name", required: true },
      { type: "string", name: "lastName", label: "Last name" },
      { type: "email", name: "email", label: "Email", helpText: "We will never share your address" },
      { type: "button", name: "send", text: "Send", theme: "primary" }
    ]
  }
  form.value = { firstName: "Ada" }

  form.addEventListener('change', e => console.log(e.detail.name, 'changed', form.value))
  form.addEventListener('click', e => {
    if (e.detail.name == "send") form.reportValidity()
  })
  form.addEventListener('invalid', e => console.log('errors by field path', e.detail))
</script>
```

The native library has no built-in color palette. Pass theme settings to make
it look right, see [demo/src/settings.ts](demo/src/settings.ts) for a complete
example:

```js
form.settings = {
  mode: "light", // "light", "dark" or "auto"
  colors: { light: { "--formsey-accent-color": "#d97706", /* ... */ }, dark: { /* ... */ } },
  fonts: { "--formsey-font": "14px system-ui" },
  spacing: { "--formsey-space-narrow": "8px", "--formsey-space-wide": "16px" }
}
```

## Running it locally

Requirements: Node.js 20.19+ or 22.12+ (needed by Vite), npm 10 or newer, and
a checkout of [floreysoft-components](https://github.com/floreysoft/floreysoft-components)
next to this repository (see [Linked components](#linked-components)).

```
npm install
npm start
```

This starts the playground at <http://localhost:5173>. It renders the example
forms in [demo/src/examples.ts](demo/src/examples.ts) straight from the
TypeScript sources of the packages, shows the live value and logs the events.
Edit any file under `packages/` and the page reloads. The link
"Material / Vaadin" opens a second page that renders a form with the two
alternative field libraries.

| Command | What it does |
|---------|--------------|
| `npm start` | Starts the playground with hot reload |
| `npm test` | Runs the `*.spec.ts` files in headless Chrome (needs Chrome installed) |
| `npm run test:watch` | Same, re-running on change |
| `npm run typecheck` | Type checks all packages and the demo without writing files |
| `npm run build:demo` | Production build of the playground into `demo/dist` |
| `npm run compile` | Compiles the packages in place (`.js` and `.d.ts` next to each `.ts`), as published to npm |
| `npm run rollup` | Compiles this repository and the linked components, then creates the minified CDN bundles in `packages/*/esm` |
| `npm run clean` | Removes everything `compile` and `rollup` generated |

## Linked components

Formsey builds on the `@floreysoft/*` web components (icon, theme, splitter,
Ace editor, utilities). They are developed in the repository
`floreysoft-components`, which is expected next to this one:

```
floreysoft-components/
formsey/
```

The `overrides` in the root [package.json](package.json) replace the published
`@floreysoft/*` packages with links to that checkout, so `npm install` fails
without it. Run `npm install` in `floreysoft-components` as well, the linked
packages resolve their own dependencies there.

The playground, the type check and the tests use the TypeScript sources of the
components directly (through the export condition `@floreysoft/source`), so a
change in a component shows up immediately. Only `npm run rollup` needs
compiled components and takes care of that itself.

To work against the versions published on npm instead, delete the `overrides`
block and reinstall. Keep in mind that the components have to be published on
Lit 3 for that.

## Packages

This is an npm workspace. All packages live in `packages/`.

| Package | Content |
|---------|---------|
| [`@formsey/core`](packages/formsey-core) | `<formsey-form>`, the field base classes, the registry, layouts and events. No visible fields. |
| [`@formsey/fields-native`](packages/formsey-fields-native) | The "native" library: fields built on plain HTML controls. This is the complete one, with sections, tabs, tables, dialogs and more. |
| [`@formsey/fields-native-extended`](packages/formsey-fields-native-extended) | Heavier native fields: `markdown`, `sourceCode` (Ace) and `signature`. |
| [`@formsey/fields-compound`](packages/formsey-fields-compound) | Fields composed of other fields: `name`, `address`, `creditCard`. |
| [`@formsey/fields-material`](packages/formsey-fields-material) | The "material" library: input fields rendered with Material Web Components. |
| [`@formsey/fields-vaadin`](packages/formsey-fields-vaadin) | The "vaadin" library: input fields rendered with Vaadin components. |
| [`formsey`](packages/formsey) | Convenience package: `fields-native` plus `fields-native-extended`. |

## Concepts

### Definitions and values

Every field definition has a `type` that selects the component. `name` is the
key of the field in the value of the enclosing form; a field without a name
contributes no value. The definition types are documented in
[FieldDefinitions.ts](packages/formsey-core/FieldDefinitions.ts).

Forms nest. A nested form with a name creates a nested object in the value, and
fields are addressed by **paths** such as `address.city` or `guests[0].name`.
Paths are what events carry in `detail.name`, what validation errors are keyed
by and what `form.getValue(path)`, `form.setValue(path, value)` and
`form.focusField(path)` accept.

Field types of the native library:

- Input: `string`, `text`, `email`, `password`, `phone`, `url`, `search`, `number`, `range`, `date`, `time`, `datetime`, `month`, `week`, `color`, `upload`, `hidden`
- Choice: `checkbox`, `switch`, `checkboxes`, `multipleChoice`, `list`, `select`, `combobox`, `toggle`, `images`, `locale`, `timezone`, `currency`, `numberUnit`
- Display: `title`, `label`, `numberFormat`, `currencyFormat`, `dateFormat`, `image`, `youtube`, `template`, `button`
- Containers: `form`, `panel`, `optionalSection`, `repeatingSection`, `selectableSection`, `tabs`, `popupSection`, `dialogSection`, `responsivePanel`, `horizontalSplitPanel`, `verticalSplitPanel`, `table`
- Extended: `markdown`, `sourceCode`, `signature`
- Compound: `name`, `address`, `creditCard`

### Layouts

`layout` maps sizes to layouts. The size is derived from the width of the
field: `xs` below 320px, `s` below 568px, `m` below 768px, `l` below 1024px and
`xl` above (override with `layout.breakpoints`). A size without its own layout
uses the layout of the next smaller size.

Each layout names a formatter (see [Layouts.ts](packages/formsey-core/Layouts.ts)):

| Formatter | Arranges fields |
|-----------|-----------------|
| `columns` | in columns of relative widths, e.g. `columns: [2, 1]` |
| `areas` | in named grid areas, e.g. `areas: ["firstName lastName", "email email"]` |
| `flex` | in a row or column with alignment, wrapping and grow factors |
| `table` | as table columns (used by the `table` field) |

All of them accept the box properties `margin`, `padding`, `elevation`,
`border` and `backgroundColor`. Register your own with `registerFormatter()`.

### Events

Fields dispatch custom events that reuse the native event names. They are
defined in [Events.ts](packages/formsey-core/Events.ts).

| Event | When | `detail` |
|-------|------|----------|
| `load` | the definition has been rendered for the first time | `{ definition, value, library, settings }` |
| `input` | on every edit | `{ name, value }`: path of the edited field, value of the form |
| `change` | a value has been committed | `{ name, value }` |
| `click` | a named button has been clicked | `{ name, value }` |
| `focus` / `blur` | a field received or lost focus | `{ name }` |
| `invalid` | validation found errors | `InvalidErrors`: a `Map` from field path to error |

### Validation

`form.reportValidity()` validates all fields and shows the messages,
`form.checkValidity()` validates silently. Both lead to an `invalid` event
carrying all errors. Use `form.setCustomValidity(errors)` to display errors
that come from elsewhere, for example from a server.

Note that for nested forms the *return value* of these methods does not
reflect invalid child fields unless a form field overrides
`reportNestedErrors()`. Rely on the `invalid` event or `form.errors`.

### Libraries and the registry

A library is a named set of components. `getLibrary("native")` returns it,
`library.registerComponent(type, component)` adds a field type. Field types a
library does not provide are looked up in the other registered libraries, which
is how the material and vaadin libraries reuse the native containers.

To add your own field, extend `LabeledField` (or `Field`) and register it:

```ts
import { LabeledField, getLibrary, type FieldDefinition, type Resources } from '@formsey/core'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement("my-rating")
export class RatingField extends LabeledField<FieldDefinition, number> {
  protected renderField() {
    return html`<input type="range" min="1" max="5" .value=${String(this.value ?? 3)}
      @input=${this.inputted} @change=${this.changed}>`
  }
}

getLibrary("native").registerComponent("rating", {
  importPath: "my-rating",
  template: ({ library, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler }: Resources<FieldDefinition, number>) =>
    html`<my-rating .library=${library} .settings=${settings} .definition=${definition} .value=${value}
      .parentPath=${parentPath} .errors=${errors}
      @change=${changeHandler} @input=${inputHandler} @invalid=${invalidHandler}></my-rating>`
})
```

The registry ([Registry.ts](packages/formsey-core/Registry.ts)) also holds
icons (`registerIcon`), layout formatters (`registerFormatter`), translations
(`registerMessages`) and the editors used by the form designer.

## Notes for integrators

- **Lit 3.** All packages use Lit 3 with TypeScript's legacy decorators
  (`experimentalDecorators`, `useDefineForClassFields: false`).
- **Source code field.** Ace loads modes, themes and workers at runtime from
  `/ace`. Serve `node_modules/ace-builds/src-min-noconflict` under that path.
  The playground does this in [demo/vite.config.ts](demo/vite.config.ts).
- **Vaadin.** Vaadin 25 components are unstyled until a theme is loaded. Import
  `@vaadin/vaadin-lumo-styles/lumo.css` in the page.
- **Material.** The material library is built on `@material/mwc-*` 0.27, the
  final release of the deprecated Material Web Components. They only run on
  Lit 2, so installing `@formsey/fields-material` brings a second copy of Lit.
  This works, but Lit logs a "multiple versions" warning. Moving to
  `@material/web` is the way forward.
- **CDN bundles.** `npm run rollup` writes single file bundles to
  `packages/*/esm`. They import Lit from `https://unpkg.com/@floreysoft/lit?module`
  (configured in each `rollup.config.js`). That package is the Lit bundle built
  in `floreysoft-components`. Publish it on Lit 3 before publishing new Formsey
  bundles, the version currently on npm still contains Lit 2.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributors

- [Daniel Florey](https://twitter.com/danielflorey)
- [Oliver Zeigermann](https://github.com/DJCordhose)

## License

See [LICENSE](LICENSE).
