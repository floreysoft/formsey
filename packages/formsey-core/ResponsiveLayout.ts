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

type Grow = {
  [index: string]: number
}

export interface ToolbarLayout extends Layout {
  formatter: "toolbar"
  alignment: "left" | "center" | "right"
  colGap?: number
  grow?: Grow
}

export interface ColumnsLayout extends Layout {
  formatter: "columns" | "area"
  columns: number[]
  colGap?: number
  rowGap?: number
}

export interface AreasLayout extends ColumnsLayout {
  formatter: "area"
  areas: string[][]
}

export interface TableLayout extends Layout {
  formatter: "table"
}