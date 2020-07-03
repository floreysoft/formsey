import { OptionalSectionField as NativeOptionalSectionField } from '@formsey/fields-native/OptionalSectionField';
import { register } from '@formsey/core';

export class OptionalSectionField extends NativeOptionalSectionField {
}

register(["vaadin"], "optionalSection", "formsey-optional-section-vaadin", OptionalSectionField);
