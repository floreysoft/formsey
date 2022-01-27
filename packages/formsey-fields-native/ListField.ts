import { KEYCODE } from '@floreysoft/utils';
import { createField, Field, LabeledField } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/Events';
import { FieldDefinition, ListFieldDefinition, StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FieldInputEvent } from '@formsey/core/Events';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { createComparator } from '@formsey/fields-native';

@customElement("formsey-list")
export class ListField extends LabeledField<ListFieldDefinition, string | string[]> {
  @query(".search")
  searchBox: Field<FieldDefinition, string> | undefined

  @query(".options")
  firstOption: Field<FieldDefinition, string> | undefined

  private firstMatchingOption: string | undefined
  private query: string | undefined

  renderField() {
    if (this.definition) {
      this.query = this.query || this.definition.query
      const search = typeof this.definition.searchThreshold !== "undefined" && (this.definition.options?.length || 0) > this.definition.searchThreshold ? html`<div class="search" @keydown=${this.searchKeyDown}>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "search", name: "search", placeholder: "Search" } as StringFieldDefinition, parentPath: this.path(), errors: this.errors, inputHandler: this.search })}</div>` : undefined
      let visible = 0
      this.firstMatchingOption = undefined
      return html`${search}<div class="options">${this.definition.options?.map((option) => {
        if (this.definition) {
          let label = option.label || option.value;
          let value = option.value || option.label;
          let checked = false
          if (this.definition.multiselect) {
            this.value = this.value || []
            checked = this.value.includes(value);
          } else {
            checked = this.value == value;
          }
          if (label.toLowerCase().startsWith(this.query?.toLowerCase() || "")) {
            if (this.definition.query && !this.firstMatchingOption) {
              this.firstMatchingOption = value
            }
            if (this.definition.max && ++visible > this.definition.max) return
            return html`<formsey-option passive @keydown=${this.keyDown} ?hideCheckmark=${this.definition.hideCheckmark} .query=${this.definition.query || ""} .definition=${{ name: value, icon: option.icon, label, value } as any} .value=${checked as any} .parentPath=${this.path()} @change=${this.changed}></formsey-option>`
          }
        }
      })}</div>`;
    }
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
    const isSame = createComparator(this.value)
    const option = e.detail.name.split('.').pop()
    if (this.definition?.multiselect) {
      if (!Array.isArray(this.value)) {
        this.value = []
      }
      if (this.value.includes(option)) {
        this.value = this.value.filter(item => item != option)
      } else {
        this.value.push(option)
      }
    } else {
      this.value = option
    }
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value, !isSame(this.value)));
  }

  private search(e: CustomEvent) {
    if (this.definition) {
      this.query = e.detail.value
      this.requestUpdate()
    }
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
      if (this.firstMatchingOption && !this.definition?.multiselect) {
        const isSame = createComparator(this.value)
        this.value = this.firstMatchingOption
        this.dispatchEvent(new FieldInputEvent(this.path(), this.value, !isSame(this.value)));
      }
      event.preventDefault();
    }
  }
}

getLibrary("native").registerComponent("list", {
  importPath: "@formsey/fields-native/ListField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<ListFieldDefinition, string | string[]>) => {
    return html`<formsey-list id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change=${changeHandler} @input=${inputHandler} @invalid=${invalidHandler}></formsey-list>`
  }
})