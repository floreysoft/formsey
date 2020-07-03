import { register, registerTheme } from '@formsey/core';
import { NestedFormField as CoreNestedFormField } from '@formsey/core/NestedFormField';
import { css } from 'lit-element';
import { NESTED_FORM_STYLE } from './styles';

export class NestedFormField extends CoreNestedFormField {
  static get styles() {
    return [...super.styles, NESTED_FORM_STYLE]
  }
}
register(["material", "native", "vaadin"], "nestedLayout", "formsey-nested-form", NestedFormField);

//AAA
registerTheme('material', {
  components: {
    'nestedForm': 'formsey-nested-form',
  }
});
registerTheme('native', {
  components: {
    'nestedForm': 'formsey-nested-form',
  }
});
registerTheme('vaadin', {
  components: {
    'nestedForm': 'formsey-nested-form',
  }
});
