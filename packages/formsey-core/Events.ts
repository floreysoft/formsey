export class FieldActionEvent<T> extends CustomEvent<any> {
  constructor(action: string, name: string | undefined, value?: any) {
      super("action", { bubbles: true, composed: true, detail: { action, name, value } });
  }
}

export class FieldBlurEvent extends CustomEvent<any> {
  constructor(name: string | undefined) {
      super("blur", { bubbles : true, composed: true, detail : { name } });
  }
}

export class FieldChangeEvent<T> extends CustomEvent<{ name: string, value: T }> {
  constructor(name: string, value: T, bubbles?: boolean) {
      super('change', { bubbles, composed: bubbles, detail: { name, value } });
  }
}

export class FieldClickEvent extends CustomEvent<any> {
  constructor(name: string | undefined, value?: any, bubbles?: boolean) {
      super("click", { bubbles, composed: bubbles, detail: { name, value } });
  }
}

export class FieldFocusEvent extends CustomEvent<any> {
  constructor(name: string | undefined) {
      super("focus", { bubbles : true, composed: true, detail : { name } });
  }
}

export class FieldInputEvent<T> extends CustomEvent<{ name: string, value: T }> {
  constructor(name: string, value: T, bubbles?: boolean) {
      super('input', { bubbles, composed: bubbles, detail: { name, value } });
  }
}