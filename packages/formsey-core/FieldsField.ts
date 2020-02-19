import { property, queryAll } from 'lit-element';
import { FormDefinition, Field, ValueChangedEvent } from '@formsey/core';
import { InvalidEvent, InvalidError } from './InvalidEvent';

export abstract class FieldsField extends Field<FormDefinition, Object> {
  @property({ converter: Object })
  set value(value: Object) {
    this._value = value;
    this.applyHiddenFields();
    this.requestUpdate();
  }

  get value() {
    return this._value;
  }

  @property({ converter: Object })
  set definition(definition: FormDefinition) {
    this._definition = definition;
    this.applyHiddenFields();
    this.requestUpdate();
  }

  get definition() {
    return this._definition
  }

  protected _value: Object = {}
  protected _definition: FormDefinition

  @queryAll(".fs-form-field")
  protected _fields: HTMLElement[]
  protected errors : InvalidError[]

  public checkValidity() {
    this.errors = []
    let validity = true;
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any,any>
      let valid = child.checkValidity();
      if (!valid) {
        validity = false;
      }
    }
    if ( !validity ) {
      this.dispatchEvent(new InvalidEvent(this.definition.name, "fieldIncorrect", this.errors))
    }
    return validity;
  }

  protected valueChanged(e: any) {
    if (e.name) {
      this.value[e.name] = e.value;
      if (this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
  }

  protected applyHiddenFields() {
    if (this._definition && this._value) {
      for (let field of this._definition.fields) {
        if (field.type == "hidden") {
          if (field.name && field.default) {
            this._value[field.name] = field.default;
          }
        }
      }
    }
  }

  protected invalid(e : InvalidEvent) {
    for ( let error of e.errors ) {
      if ( this.definition.name ) {
        error.path = this.definition.name + "." + error.path
      }
      this.errors.push(error)
    }
  }
}