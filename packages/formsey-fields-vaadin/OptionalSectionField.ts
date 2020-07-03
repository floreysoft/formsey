import { OptionalSectionField as NativeOptionalSectionField } from '@formsey/fields-native/OptionalSectionField';
import { register } from '@formsey/core';

export class OptionalSectionField extends NativeOptionalSectionField {
}
register("formsey-optional-section-vaadin", OptionalSectionField, "vaadin", "optional-section", "@formsey/fields-vaadin/OptionalSectionField")
