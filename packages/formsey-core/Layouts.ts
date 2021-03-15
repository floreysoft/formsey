export interface ResponsiveLayout {
  breakpoints?: Breakpoints
  static?: Layout
  xxs?: Layout
  xs?: Layout
  s?: Layout
  m?: Layout
  l?: Layout
  xl?: Layout
  xxl?: Layout
}

export interface Breakpoints {
  xxs?: number
  xs?: number
  s?: number
  m?: number
  l?: number
  xl?: number
  xxl?: number
}

export interface Layout {
  formatter: string
}

export interface SizeLayout extends Layout {
  formatter: "size"
  width?: string
}

export interface BoxLayout extends Layout {
  margin?: "none" | "narrow" | "wide"
  padding?: "none" | "narrow" | "wide"
  elevation?: number
  border?: "sharp" | "soft"
  backgroundColor?: string
  fontSize?: "small" | "smaller" | "medium" | "larger" | "large"
}

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

export interface ColumnsLayout extends BoxLayout {
  formatter: "columns"
  gaps?: "none" | "narrow" | "wide"
  columns: {
    width: number
    horizontal?: string
  }[]
}

export interface AreasLayout extends BoxLayout {
  formatter: "areas"
  gaps?: "none" | "narrow" | "wide"
  columns: number[]
  areas: string[]
  alignments: {
    area: string,
    horizontal: string,
    vertical: string
  }[]
}

export interface TableLayout extends BoxLayout {
  formatter: "table"
  vertical?: "top" | "middle" | "bottom"
  rowHeight?: "s" | "m" | "l" | "xl"
  fill?: "grow" | "shrink"
  fixedColumns?: number
  columns: {
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
  }[]
}