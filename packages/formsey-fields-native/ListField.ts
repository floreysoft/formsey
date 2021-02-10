import { KEYCODE } from '@floreysoft/utils';
import { createField, Field, LabeledField, ValueChangedEvent } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { FieldDefinition, ListFieldDefinition, StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-list")
export class ListField extends LabeledField<ListFieldDefinition, string | string[]> {
  @property()
  query: string

  @query(".search")
  searchBox: Field<FieldDefinition, string>

  @query(".options")
  firstOption: Field<FieldDefinition, string>

  private firstMatchingOption

  renderField() {
    const search = typeof this.definition.searchThreshold !== "undefined" && (this.definition.options?.length || 0) > this.definition.searchThreshold ? createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "search", name: "search", placeholder: "Search" } as StringFieldDefinition, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.search(event) }) : undefined
    let visible = 0
    this.firstMatchingOption = undefined
    return html`<div class="search" @keydown=${this.searchKeyDown}>${search}</div><div class="options">${this.definition.options.map((option) => {
      let label = option.label || option.value;
      let value = option.value || option.label;
      let checked = false
      if (this.definition.multiselect) {
        this.value = this.value || []
        checked = this.value.includes(value);
      } else {
        checked = this.value == value;
      }
      if ((!this.query || value.toLowerCase().startsWith(this.query))) {
        if (this.query && !this.firstMatchingOption) {
          this.firstMatchingOption = value
        }
        if (this.definition.max && ++visible > this.definition.max) return
        return html`<formsey-option @keydown=${this.keyDown} ?hideCheckmark=${this.definition.hideCheckmark} .query=${this.query} .definition=${{ name: value, icon: option.icon, label, value }} .value=${checked} .parentPath=${this.path()} @inputChange=${this.changed}>${option.label || option.value}</formsey-option>`
      }
    })}</div>`;
  }

  focusField(path: string) {
    if (this.searchBox) {
      return (<any>this.searchBox.firstElementChild)?.focusField(path)
    } else if (this.firstOption) {
      return (<any>this.firstOption.firstElementChild)?.focusField(path)
    }
    return false
  }

  protected changed(e: CustomEvent) {
    const option = e.detail.name.split('.').pop()
    if (this.definition.multiselect) {
      if (!Array.isArray(this.value)) {
        this.value = []
      }
      if (e.detail.value) {
        this.value.push(option)
      } else {
        this.value = this.value.filter(item => item != option)
      }
    } else {
      this.value = option
    }
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
  }

  private search(e: CustomEvent) {
    this.query = e.detail.value
  }

  private keyDown(event: KeyboardEvent) {
    let newTarget: HTMLElement | null = event.currentTarget as HTMLElement
    switch (event.keyCode) {
      case KEYCODE.UP:
        newTarget = newTarget ? newTarget.previousElementSibling as HTMLElement : null
        if (newTarget == null) {
          newTarget = <any>this.searchBox?.firstElementChild
        }
        break;
      case KEYCODE.DOWN:
        newTarget = newTarget ? newTarget.nextElementSibling as HTMLElement : null
        break;
      default:
        return;
    }
    if (newTarget != null) {
      (<any>newTarget).focusField()
    }
    event.preventDefault();
  }

  private searchKeyDown(event: KeyboardEvent) {
    if (event.keyCode == KEYCODE.DOWN && this.firstOption) {
      (<any>this.firstOption.firstElementChild).focusField()
      event.preventDefault();
    } else if (event.keyCode == KEYCODE.RETURN) {
      if (this.firstMatchingOption && !this.definition.multiselect) {
        this.value = this.firstMatchingOption
        this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
      }
      event.preventDefault();
    }
  }
}

getLibrary("native").registerComponent("list", {
  importPath: "@formsey/fields-native/ListField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ListFieldDefinition, string | string[]>) => {
    return html`<formsey-list id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-list>`
  }
})