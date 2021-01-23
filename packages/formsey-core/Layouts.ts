export interface ResponsiveLayout {
  static?: Layout
  breakpoints?: Breakpoints
  responsive?: {
    xxs?: Layout
    xs?: Layout
    s?: Layout
    m?: Layout
    l?: Layout
    xl?: Layout
    xxl?: Layout
  }
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

export interface BoxLayout extends Layout {
  formatter: "box"
  spacing: "none" | "narrow" | "wide"
  background: string,
  elevation: number
  border: "sharp" | "soft"
}

export interface ToolbarLayout extends Layout {
  formatter: "toolbar"
  horizontal?: "left" | "center" | "right",
  vertical?: "top" | "middle" | "bottom"
  wrap?: "wrap" | "nowrap"
  grow?: {
    [index: string]: number
  }
}

export interface ColumnsLayout extends Layout {
  formatter: "columns"
  columns: {
    width: number
    horizontal?: string
  }[]
}

export interface AreasLayout extends Layout {
  formatter: "areas"
  columns: number[]
  areas: string[]
  alignments: {
    area: string,
    horizontal: string,
    vertical: string
  }[]
}

export interface TableLayout extends Layout {
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