// Formsey playground: renders example forms from the workspace sources and
// shows the value and the events a host application would receive.
//
// Importing a field package registers its components in the "native" library
// as a side effect, so the imports below are all the setup that is needed.
import '@formsey/fields-native';
import '@formsey/fields-native-extended';
import '@formsey/fields-compound';
import type { Form } from '@formsey/core';
import { EXAMPLES } from './examples';
import { createSettings } from './settings';

const form = document.querySelector<Form>('#form')!
const nav = document.querySelector<HTMLElement>('#examples')!
const valueView = document.querySelector<HTMLElement>('#value')!
const eventView = document.querySelector<HTMLElement>('#events')!
const definitionView = document.querySelector<HTMLElement>('#definition')!
const validateButton = document.querySelector<HTMLButtonElement>('#validate')!
const modeButton = document.querySelector<HTMLButtonElement>('#mode')!

let mode: "light" | "dark" = "light"
const eventLog: string[] = []

/** Formsey events are CustomEvents that reuse native event names. */
function detail(e: Event): any {
  return (e as unknown as CustomEvent).detail
}

function log(message: string) {
  eventLog.unshift(message)
  eventLog.length = Math.min(eventLog.length, 30)
  eventView.textContent = eventLog.join("\n")
}

function showValue() {
  valueView.textContent = JSON.stringify(form.value ?? {}, null, 2)
}

function show(index: number) {
  const example = EXAMPLES[index]
  // Clone so edits made by the form never leak back into the example.
  form.value = structuredClone(example.value ?? {})
  form.definition = structuredClone(example.definition)
  definitionView.textContent = JSON.stringify(example.definition, null, 2)
  nav.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-current', String(i == index)))
  location.hash = String(index)
  showValue()
}

function applyMode() {
  document.documentElement.dataset.mode = mode
  form.settings = createSettings(mode)
  modeButton.textContent = mode == "light" ? "Dark mode" : "Light mode"
}

EXAMPLES.forEach((example, index) => {
  const button = document.createElement('button')
  button.type = 'button'
  button.textContent = example.title
  button.addEventListener('click', () => show(index))
  nav.append(button)
})

// "input" fires while typing, "change" once a value is committed. Both carry
// the path of the field that changed and the complete form value.
form.addEventListener('input', e => {
  showValue()
  log(`input   ${detail(e).name}`)
})
form.addEventListener('change', e => {
  showValue()
  log(`change  ${detail(e).name}`)
})
form.addEventListener('click', e => {
  const name = detail(e)?.name
  if (name) log(`click   ${name}`)
})
// Fired by reportValidity()/checkValidity(); detail maps field paths to errors.
form.addEventListener('invalid', e => {
  const errors = detail(e) as Map<string, { validityMessage: string }>
  errors.forEach((error, path) => log(`invalid ${path}: ${error.validityMessage}`))
})

validateButton.addEventListener('click', () => {
  // reportValidity() marks invalid fields and collects their errors, which
  // arrive asynchronously in the "invalid" event. Its return value is not
  // a reliable summary for nested forms (see FormField.reportNestedErrors),
  // so look at the collected errors instead.
  form.reportValidity()
  setTimeout(() => {
    if (!form.errors?.size) log("valid")
  }, 50)
})
modeButton.addEventListener('click', () => {
  mode = mode == "light" ? "dark" : "light"
  applyMode()
})

applyMode()
show(Math.min(Number(location.hash.slice(1)) || 0, EXAMPLES.length - 1))
