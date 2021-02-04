export interface Slot {
  x: number
  y: number
  w: number
  h: number
}

export interface RelativeSize {
  w: number
  h: number
}

export interface CollageSize {
  width: number
  height: number
}

export interface Collage {
  id: string
  imageUrl: string
}

export interface CollageSettings {
  collageSize: CollageSize
  relativeSize: RelativeSize
  backgroundColor?: string
  slots: Slot[]
}
