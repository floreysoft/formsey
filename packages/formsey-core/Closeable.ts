/**
 * Implemented by fields that open an overlay (popup or dialog section).
 * A reference travels with {@link FieldClickEvent} so that the receiver of a
 * click can close the overlay the click originated from.
 */
export interface Closeable {
  close(e: CustomEvent) : void
}