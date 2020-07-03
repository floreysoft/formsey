import { SelectableSectionField as NativeSelectableSectionField } from '@formsey/fields-native/SelectableSectionField';
import { register } from '@formsey/core';

export class SelectableSectionField extends NativeSelectableSectionField {

}

register("material", "selectableSection", "formsey-selectable-section-material", SelectableSectionField);