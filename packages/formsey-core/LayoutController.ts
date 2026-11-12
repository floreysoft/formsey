import { ReactiveController } from "lit";
import { Field } from "./Field";
import { LayoutFieldDefinition } from "./FieldDefinitions";
import { DEFAULT_BREAKPOINTS, SUPPORTED_BREAKPOINTS } from "./FormField";
import { Layout, ResponsiveLayout } from "./Layouts";

/**
 * Reactive controller that makes a field responsive.
 *
 * It observes the width of the host element, maps it to a size ("xs" to "xl")
 * using the breakpoints of the definition and exposes the matching layout as
 * {@link LayoutController.layout}. The host is re-rendered whenever the size
 * changes.
 */
export class LayoutController implements ReactiveController {
  /** The layout to use for the current width of the host. */
  public layout: Layout | undefined

  private host: Field<LayoutFieldDefinition, any>
  private size: string | undefined
  private resizeObserver: ResizeObserver
  private element: HTMLElement

  constructor(host: Field<LayoutFieldDefinition, any>, element?: HTMLElement) {
    this.host = host
    this.element = element || host
    this.resizeObserver = new ResizeObserver((entries: any, observer: any) => {
      for (const entry of entries) {
        this.resize(entry.contentRect.width)
      }
    });
    this.updateLayout(host.definition?.layout)
  }

  hostConnected() {
    this.resizeObserver.observe(this.element)
  }

  hostDisconnected() {
    this.resizeObserver.unobserve(this.element)
  }

  hostUpdate() {
    this.layout = this.size && (<any>this.host.definition?.layout)?.[this.size] || this.layout
  }

  /**
   * Selects the layout for the current size: the layout defined for that size
   * or, if there is none, the layout of the closest smaller size.
   */
  updateLayout(layout?: ResponsiveLayout) {
    this.layout = undefined
    let sizeFound = false
    for (let size of SUPPORTED_BREAKPOINTS) {
      sizeFound = (size == this.size || sizeFound)
      this.layout = size && (<any>layout)?.[size] || this.layout
      if (this.layout && sizeFound) {
        break
      }
    }
  }

  /** Determines the size for the available width and updates the host if it changed. */
  protected resize(availableWidth: number) {
    // If available with larger than larges breakpoint, default to the largest
    let detectedSize = SUPPORTED_BREAKPOINTS[SUPPORTED_BREAKPOINTS.length - 1]
    for (let size of SUPPORTED_BREAKPOINTS) {
      let breakpoint = (<any>this.host.definition?.layout?.breakpoints)?.[size]
      if (typeof breakpoint === "undefined") {
        breakpoint = (<any>DEFAULT_BREAKPOINTS)[size]
      }
      if (breakpoint > availableWidth) {
        detectedSize = size
        break
      }
    }
    if (this.size != detectedSize) {
      this.size = detectedSize
      this.sizeChanged(this.host, this.size)
      this.updateLayout(this.host.definition?.layout)
      this.host.requestUpdate()
    }
  }

  /** Hook for subclasses, called when the host crosses a breakpoint. */
  protected sizeChanged(host: Field<LayoutFieldDefinition, any>, size: string) { }
}