
/** Names of the supported breakpoints, from the smallest to the largest. */
export const SIZES = ["xs", "s", "m", "l", "xl"] as Size[]

export type Size = "xs" | "s" | "m" | "l" | "xl"

/** Maximum width in pixels for each size. See `DEFAULT_BREAKPOINTS` in FormField.ts. */
export type Breakpoints = Partial<Record<Size, number>>
/**
 * A layout per size. A size without a layout uses the layout of the next
 * smaller size. Sizes refer to the width of the field, not of the viewport.
 */
export type ResponsiveLayout = {
  breakpoints?: Breakpoints
} & Partial<Record<Size, Layout>>

/** A layout is applied by the {@link Formatter} registered under the name `formatter`. */
export interface Layout {
  formatter: string
}

export interface SizeLayout extends Layout {
  formatter: "size"
  width?: string
}

/** Box properties shared by all container layouts. */
export interface BoxLayout extends Layout {
  margin?: "none" | "narrow" | "wide"
  padding?: "none" | "narrow" | "wide"
  elevation?: number
  border?: "sharp" | "soft"
  backgroundColor?: string
  fontSize?: "small" | "smaller" | "medium" | "larger" | "large"
}

/** Arranges the fields in a row or column using flexbox. */
export interface FlexLayout extends BoxLayout {
  formatter: "flex"
  direction: "horizontal" | "vertical"
  horizontal?: "left" | "center" | "right" | "expand"
  vertical?: "top" | "middle" | "bottom"
  gaps?: "none" | "narrow" | "wide"
  wrap?: "wrap" | "nowrap"
  grow?: {
    [index: string]: number
  }
}

/**
 * Arranges the fields in a grid of columns.
 * `columns` contains the relative width of each column, e.g. `[2, 1]`, or
 * objects of the form `{ width, horizontal }`.
 */
export interface ColumnsLayout extends BoxLayout {
  formatter: "columns"
  gaps?: "none" | "narrow" | "wide"
  columns: any
}

/**
 * Arranges the fields in named grid areas. `areas` contains one string per
 * row with the names of the fields (`.` for an empty cell), as in CSS
 * `grid-template-areas`. Unnamed fields are addressed by type and index, see
 * `area()` in Registry.ts.
 */
export interface AreasLayout extends BoxLayout {
  formatter: "areas"
  columns: number[]
  areas: string[]
  gaps?: "none" | "narrow" | "wide"
  alignments?: {
    area: string,
    horizontal?: string,
    vertical?: string
  }[]
}

/** Configuration of a table column. */
export type Column = {
  field: string
  visible?: boolean
  searchable?: boolean
  sortable?: boolean
  horizontal?: "left" | "center" | "right",
  width?: {
    selection: "auto" | "minmax"
    value?: {
      minWidth?: number
      minWidthUnit?: "em" | "px"
      maxWidth?: number
      maxWidthUnit?: "em" | "px"
    }
  }
}

/** Layout of a table field. */
export interface TableLayout extends BoxLayout {
  formatter: "table"
  vertical?: "top" | "middle" | "bottom"
  rowHeight?: "s" | "m" | "l" | "xl"
  fill?: "grow" | "shrink"
  fixedColumns?: number
  columns: Column[]
}