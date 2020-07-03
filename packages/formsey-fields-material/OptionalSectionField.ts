import { OptionalSectionField as NativeOptionalSectionField } from '@formsey/fields-native/OptionalSectionField';
import { register } from '@formsey/core';

export class OptionalSectionField extends NativeOptionalSectionField {
}

register("material", "optionalSection", "formsey-optional-section-material", OptionalSectionField);
