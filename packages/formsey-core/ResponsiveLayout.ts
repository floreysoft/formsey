export interface ResponsiveLayout {
  style?: string
  breakpoints?: Breakpoints
  sizes?: {
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
  padX?: number
  padY?: number
}

export interface ToolbarLayout extends Layout {
  formatter: "toolbar"
  horizontal?: "left" | "center" | "right",
  vertical?: "top" | "middle" | "bottom"
  grow?: {
    [index: string]: number
  }
}

export interface ColumnsLayout extends Layout {
  formatter: "columns" | "areas"
  columns: number[]
  colGap?: number
  rowGap?: number
}

export interface AreasLayout extends ColumnsLayout {
  formatter: "areas"
  areas: string[][]
}

export interface TableLayout extends Layout {
  formatter: "table"
}