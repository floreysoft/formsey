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
  type: string
  left?: number
  right?: number
  top?: number
  bottom?: number
}

export interface AlignmentLayout extends Layout {
  type: "alignment"
  alignment: "left" | "center" | "right"
  columnGap?: number
  grow?: [ { name: string, factor: number } ]
}

export interface GridColumnsLayout extends Layout {
  type: "gridColumns" | "gridAreas"
  columnTemplates: string[]
  columnGap?: number
  rowGap?: number
}

export interface GridAreasLayout extends GridColumnsLayout {
  type: "gridAreas"
  gridTemplateAreas: string[][]
}

export interface TableLayout extends Layout {
}