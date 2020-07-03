import { OptionalSectionField as NativeOptionalSectionField } from '@formsey/fields-native/OptionalSectionField';
import { register } from '@formsey/core';

export class OptionalSectionField extends NativeOptionalSectionField {
}
register("formsey-optional-section-material", OptionalSectionField, "material", "optionalSection", "@formsey/fields-material/OptionalSectionField");