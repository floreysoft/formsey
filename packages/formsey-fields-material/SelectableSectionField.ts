import { SelectableSectionField as NativeSelectableSectionField } from '@formsey/fields-native/SelectableSectionField';
import { register } from '@formsey/core';

export class SelectableSectionField extends NativeSelectableSectionField {

}
register("formsey-selectable-section-material", SelectableSectionField, "material", "selectableSection", { importPath: "@formsey/fields-material/SelectableSectionField"});