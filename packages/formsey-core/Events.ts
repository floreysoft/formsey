/**
 * Events dispatched by fields.
 *
 * Formsey deliberately reuses the names of the native DOM events ("change",
 * "input", "click", "focus", "blur"). Fields stop the native event and dispatch
 * one of these instead, so listeners always receive a `detail` with the path of
 * the field (`name`) and its current `value`.
 */
import { Closeable } from './Closeable'

/** Generic "action" event, bubbles through shadow roots. `detail` is `{ action, name, value }`. */
export class FieldActionEvent<T> extends CustomEvent<any> {
  constructor(action: string, name: string | undefined, value?: any) {
      super("action", { bubbles: true, composed: true, detail: { action, name, value } });
  }
}

/** A field lost focus. `detail.name` is the path of the field. */
export class FieldBlurEvent extends CustomEvent<any> {
  constructor(name: string | undefined) {
      super("blur", { bubbles : true, composed: true, detail : { name } });
  }
}

/**
 * The value of a field has been committed.
 *
 * `detail.name` is the path of the field that changed. For events re-dispatched
 * by a form, `detail.value` is the value of that form, not of the leaf field.
 * Does not bubble unless `bubbles` is set, each parent field handles and
 * re-dispatches it explicitly.
 */
export class FieldChangeEvent<T> extends CustomEvent<{ name: string, value: T }> {
  constructor(name: string, value: T, bubbles?: boolean) {
      super('change', { bubbles, composed: bubbles, detail: { name, value } });
  }
}

/**
 * A button (or another clickable field) has been activated.
 * `closeable` is set when the click came from inside a popup or dialog.
 */
export class FieldClickEvent extends CustomEvent<{ name?: string, value: any, closeable? : Closeable}> {
  closeable?: Closeable;

  constructor(name: string | undefined, value?: any, bubbles?: boolean, closeable?: Closeable) {
      super("click", { bubbles, composed: bubbles, detail: { name, value } });
      this.closeable = closeable
  }
}

/** A field received focus. `detail.name` is the path of the field. */
export class FieldFocusEvent extends CustomEvent<{ name?: string}> {
  constructor(name: string | undefined) {
      super("focus", { bubbles : true, composed: true, detail : { name } });
  }
}

/** Like {@link FieldChangeEvent}, but fired on every keystroke while the user is editing. */
export class FieldInputEvent<T> extends CustomEvent<{ name: string, value: T }> {
  constructor(name: string, value: T, bubbles?: boolean) {
      super('input', { bubbles, composed: bubbles, detail: { name, value } });
  }
}