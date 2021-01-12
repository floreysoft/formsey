import { html } from 'lit-element'
import { registerFormatter, registerIcon } from './Components'
import { FieldDefinition, TableFieldDefinition } from './FieldDefinitions'
import { AreasLayout, ColumnsLayout, ToolbarLayout, TableLayout } from './ResponsiveLayout'

export * from './Components'
export * from './Field'
export { FieldBlurEvent } from './FieldBlurEvent'
export { FieldClickEvent } from './FieldClickEvent'
export * from './FieldDefinitions'
export { FieldFocusEvent } from './FieldFocusEvent'
export * from './Form'
export * from './FormField'
export { FormNavigator } from './FormNavigator'
export { HiddenField } from './HiddenField'
export * from './InvalidEvent'
export { LabeledField } from './LabeledField'
export { NestedFormField } from './NestedFormField'
export { Toolbar } from './Toolbar'
export { ValueChangedEvent } from './ValueChangedEvent'

registerIcon("Cut", html`<fs-icon><svg viewBox="0 0 32 32"><path d="M9.309 0l-.538 1.04c-.185.359-.215.965 .245 2.758.29 1.133.755 2.641 1.381 4.483.79 2.325 1.736 4.881 2.579 7.073l1.911-3.918-5.578-11.435zM27.86 27.231l-.096-1.095-.074.035c-.399-1.56-1.443-3.068-3.006-4.316-1.584-1.265-3.457-2.051-4.888-2.051-.283 0-.544.031-.782.092l-.982-2.013c1.009-2.526 2.447-6.299 3.57-9.603.626-1.841 1.09-3.35 1.381-4.482.46-1.793.43-2.4.245-2.758l-.538-1.04-9.705 19.896c-.238-.061-.499-.092-.782-.092-1.431 0-3.304.786-4.888 2.051-1.827 1.459-2.947 3.275-3.152 5.113l-.023.263c-.163 2.278.852 4.146 2.526 4.649.265 .079.567 .12.898 .12 1.7 0 3.824-1.038 4.738-3.356.127-.302.267-.669.428-1.094.518-1.359 1.301-3.414 2.118-4.265.299-.311.531-.537.717-.719.167-.163.308-.3.434-.439.127 .139.267 .276.434 .439.186 .182.418 .407.717 .719.818 .851 1.6 2.905 2.118 4.264.162 .425.302 .792.429 1.094.914 2.318 3.038 3.356 4.738 3.356 0 0 0 0 0 0 .331 0 .634-.04.898-.12 1.673-.503 2.688-2.371 2.525-4.649zM10.314 27.559c-1.176 2.147-2.227 2.468-2.749 2.468-.711 0-1.243-.577-1.347-1.136-.068-.368-.081-.745-.037-1.122.176-1.51 1.201-2.807 2.03-3.628 1.139-1.129 2.416-1.879 3.235-2.206.082-.029.132-.033.155-.033.012 0 .019.001 .02.001 0 0 0 0 0 0 .241.159 .526 1.972-1.306 5.656zM25.8 28.892c-.105.558-.64 1.136-1.356 1.136-.526 0-1.583-.321-2.766-2.468-1.844-3.685-1.556-5.499-1.316-5.655 0 0 .006-.002.022-.002.023 0 .073.004 .156.033 .825.327 2.109 1.077 3.255 2.206.834 .822 1.865 2.118 2.042 3.628.044 .378.032 .756-.037 1.123z"></path></svg></fs-icon>`)
registerIcon("Copy", html`<fs-icon><svg viewBox="0 0 32 32"><path d="M25.531 3.969h-3.51v-1.938c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v1.938h-3.552c-1.378 0-2.5 1.122-2.5 2.5v23.063c0 1.378 1.122 2.5 2.5 2.5l13.479-.011 8.063-8v-1.113l.021-.001v-16.437c0-1.378-1.122-2.5-2.5-2.5zM12.021 2.035c.001-.001.002-.002.004-.004h7.993c.001.001 .003.002 .004.004v1.934h-8v-1.934zM26.031 20.031v1.989h-8.021v8.011h-11.542c-.274 0-.5-.228-.5-.5v-23.063c0-.272.226-.5.5-.5 0 0 .054 0 1.5 0v2.063h16v-2.063c1.457 0 1.563 0 1.563 0 .272 0 .5.228 .5.5v13.563z"></path></svg></fs-icon>`)
registerIcon("Paste", html`<fs-icon><svg viewBox="0 0 32 32"><path d="M27.5 9.969h-3.521v-3.531c0-1.378-1.122-2.5-2.5-2.5h-3.458v-1.969c0-1.1-.9-2-2-2h-5.99c-1.1 0-2 .9-2 2v1.969h-3.552c-1.378 0-2.5 1.122-2.5 2.5v19.063c0 1.378 1.122 2.5 2.5 2.5h3.49v1.531c0 1.378 1.122 2.5 2.5 2.5l11.448-.011 8.063-8v-1.113l.021-.001v-10.437c0-1.378-1.122-2.5-2.5-2.5zM10.031 1.972c.001-.001.002-.002.004-.004h5.982c.001.001 .003.002 .004.004v1.965h-5.99l0-1.965zM4.479 26c-.274 0-.5-.228-.5-.5v-19.062c0-.272.226-.5.5-.5h1.542l.01 2.031h13.948l-.01-2.031h1.51c.272 0 .5.228 .5.5v3.531h-11.51c-1.378 0-2.5 1.122-2.5 2.5v13.531h-3.49zM28 20.031v1.989h-8.083v8.011h-9.448c-.274 0-.5-.228-.5-.5v-17.063c0-.272.226-.5.5-.5 0 0 3.745 0 6.531 0 0 0 .836 0 2 0 2.786 0 8.5 0 8.5 0 .272 0 .5.228 .5.5v7.563z"></path></svg></fs-icon>`)

registerIcon("Minus", html`<fs-icon><svg viewBox="0 0 24 24"><title>Remove section</title><path d="M5 13h14c0.552 0 1-0.448 1-1s-0.448-1-1-1h-14c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path></svg></fs-icon>`)
registerIcon("Plus", html`<fs-icon><svg viewBox="0 0 24 24"><title>Add section</title><path d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path></svg></fs-icon>`)

registerIcon("Sort ascending", html`<fs-icon><svg viewBox="0 0 32 32"><path d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path></svg></fs-icon>`)
registerIcon("Sort descending", html`<fs-icon><svg viewBox="0 0 32 32"><path d="M4.586 19.414l10 10c0.781 0.781 2.047 0.781 2.828 0l10-10c0.781-0.781 0.781-2.047 0-2.828s-2.047-0.781-2.828 0l-6.586 6.586v-19.172c0-1.105-0.895-2-2-2s-2 0.895-2 2v19.172l-6.586-6.586c-0.391-0.39-0.902-0.586-1.414-0.586s-1.024 0.195-1.414 0.586c-0.781 0.781-0.781 2.047 0 2.828z"></path></svg></fs-icon>`)

registerIcon("Start", html`<fs-icon><svg viewBox="0 0 32 32"><path d="M8 28v-24h4v11l10-10v22l-10-10v11z"></path></svg></fs-icon>`)
registerIcon("Previous", html`<fs-icon><svg viewBox="0 0 32 32"><path d="M18 5v10l10-10v22l-10-10v10l-11-11z"></path></svg></fs-icon>`)
registerIcon("Next", html`<fs-icon><svg viewBox="0 0 32 32"><path d="M16 27v-10l-10 10v-22l10 10v-10l11 11z"></path></svg></fs-icon>`)

registerIcon("Row short", html`<fs-icon><svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M12.002 11.511v-7h-.626c-.3 0-.479-.37-.312-.645l1.422-1.645a.7.7 0 0 1 1.059 0l1.422 1.645c.166.276-.013.646-.312.646H14v7h.655c.3 0 .478.37.312.645l-1.417 1.677a.7.7 0 0 1-1.07 0l-1.416-1.677c-.167-.276.012-.646.312-.646h.626zM1.5 2h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5zm0 5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1 0-1zm0 3h8a.5.5 0 1 1 0 1h-8a.5.5 0 1 1 0-1zm0 3h8a.5.5 0 1 1 0 1h-8a.5.5 0 1 1 0-1z"></path></svg></fs-icon>`)
registerIcon("Row medium", html`<fs-icon><svg viewBox="0 0 16 16"><path fill-rule="evenodd" fill="currentColor" d="M12.002 11.511v-7h-.626c-.3 0-.479-.37-.312-.645l1.422-1.645a.7.7 0 0 1 1.059 0l1.422 1.645c.166.276-.013.646-.312.646H14v7h.655c.3 0 .478.37.312.645l-1.417 1.677a.7.7 0 0 1-1.07 0l-1.416-1.677c-.167-.276.012-.646.312-.646h.626zM1.5 2h8a.5.5 0 0 1 .5.5v5.02a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5V2.5a.5.5 0 0 1 .5-.5zm0 8h8a.5.5 0 1 1 0 1h-8a.5.5 0 1 1 0-1zm0 3h8a.5.5 0 1 1 0 1h-8a.5.5 0 1 1 0-1z"></path></svg></fs-icon>`)
registerIcon("Row large", html`<fs-icon><svg viewBox="0 0 16 16"><path fill-rule="evenodd" fill="currentColor" d="M12.002 11.511v-7h-.626c-.3 0-.479-.37-.312-.645l1.422-1.645a.7.7 0 0 1 1.059 0l1.422 1.645c.166.276-.013.646-.312.646H14v7h.655c.3 0 .478.37.312.645l-1.417 1.677a.7.7 0 0 1-1.07 0l-1.416-1.677c-.167-.276.012-.646.312-.646h.626zM1.5 2h8a.5.5 0 0 1 .5.5v7.979a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5V2.5a.5.5 0 0 1 .5-.5zm0 11h8a.5.5 0 1 1 0 1h-8a.5.5 0 1 1 0-1z"></path></svg></fs-icon>`)
registerIcon("Row extra large", html`<fs-icon><svg viewBox="0 0 16 16"><path fill-rule="evenodd" fill="currentColor" d="M12.002 11.511v-7h-.626c-.3 0-.479-.37-.312-.645l1.422-1.645a.7.7 0 0 1 1.059 0l1.422 1.645c.166.276-.013.646-.312.646H14v7h.655c.3 0 .478.37.312.645l-1.417 1.677a.7.7 0 0 1-1.07 0l-1.416-1.677c-.167-.276.012-.646.312-.646h.626zM1.5 2h8a.5.5 0 0 1 .5.5v11.023a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5V2.5a.5.5 0 0 1 .5-.5z"></path></svg></fs-icon>`)

registerFormatter("columns", {
  containerStyle(layout: ColumnsLayout): string {
    return `display:grid;grid-template-columns:${layout.columns.map(column => `minmax(0,${column}fr)`).join(" ")}`
  },
  fieldStyle(layout: ColumnsLayout, field: FieldDefinition): string {
    return `width:100%`
  }
})
registerFormatter("table", {
  containerStyle(layout: TableLayout, definition: TableFieldDefinition, fixed: boolean, selectable: boolean): string {
    return `display:grid;gap:0;grid-template-rows:2em;grid-auto-rows:minmax(0,${layout.rowHeight == "xl" ? "5em" : layout.rowHeight == "l" ? "4em" : layout.rowHeight == "m" ? "3em" : "2.5em"});grid-template-columns:${selectable ? "min-content " : ""}${layout.columns.filter((column, index) => !layout.fixedColumns || index < layout.fixedColumns && fixed || index >= layout.fixedColumns && !fixed).map(column => `${column.width}px`).join(" ")}`
  },
  fieldStyle(layout: TableLayout, field?: FieldDefinition): string {
    return `align-items:${layout.vertical == "top" ? "flex-start" : layout.vertical == "bottom" ? "flex-end" : "center"}`
  }
})
registerFormatter("areas", {
  containerStyle(layout: AreasLayout): string {
    return `display:grid;grid-template-columns:${layout.columns.map(column => `minmax(0,${column}fr)`).join(" ")};grid-template-areas:${layout.areas.map((row: string) => `'${row.split(" ").map(column => column == "." ? column : ("_"+column)).join(" ")}'`).join(" ")}`
  },
  fieldStyle(layout: AreasLayout, field: FieldDefinition): string {
    return `grid-area:_${field.name}`
  }
})
registerFormatter("toolbar", {
  containerStyle(layout: ToolbarLayout): string {
    return `display:flex;flex-flow: row ${layout.wrap || "nowrap"};align-items:${layout.vertical == "top" ? "flex-start" : layout.vertical == "bottom" ? "flex-end" : "center"};justify-content:${layout.horizontal == "left" ? "flex-start" : layout.horizontal == "right" ? "flex-end" : "center"}`
  },
  fieldStyle(layout: ToolbarLayout, field: FieldDefinition): string {
    return `flex-grow: ${layout.grow?.[field.name] || 0}`
  }
})