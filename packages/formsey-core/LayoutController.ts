import { ReactiveController } from "lit";
import { Field } from "./Field";
import { FormDefinition } from "./FieldDefinitions";
import { DEFAULT_BREAKPOINTS, SUPPORTED_BREAKPOINTS } from "./FormField";
import { Layout } from "./Layouts";

export class LayoutController implements ReactiveController {
  public layout: Layout | undefined
  protected host: Field<FormDefinition, any>
  protected size: string
  private resizeObserver: ResizeObserver

  constructor(host: Field<FormDefinition, any>) {
    this.host = host
    this.resizeObserver = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        this.resize(entry.contentRect.width)
      }
    });
  }

  hostConnected() {
    this.resizeObserver.observe(this.host)
  }

  hostDisconnected() {
    this.resizeObserver.unobserve(this.host)
  }

  hostUpdate() {
    this.layout = this.host.definition?.layout?.[this.size] || this.layout
  }

  protected resize(availableWidth: number) {
    // If available with larger than larges breakpoint, default to the largest
    let detectedSize = SUPPORTED_BREAKPOINTS[SUPPORTED_BREAKPOINTS.length - 1]
    for (let size of SUPPORTED_BREAKPOINTS) {
      let breakpoint = this.host.definition?.layout?.breakpoints?.[size]
      if (typeof breakpoint === "undefined") {
        breakpoint = DEFAULT_BREAKPOINTS[size]
      }
      if (breakpoint > availableWidth) {
        detectedSize = size
        break
      }
    }
    if (this.size != detectedSize) {
      this.size = detectedSize
      this.sizeChanged()
      this.layout = undefined
      let sizeFound = false
      for (let size of SUPPORTED_BREAKPOINTS) {
        sizeFound = (size == this.size || sizeFound)
        this.layout = this.host.definition?.layout?.[size] || this.layout
        if (this.layout && sizeFound) {
          break
        }
      }
      this.host.requestUpdate()
    }
  }

  protected sizeChanged() { }
}