import { Slot } from '../types'

const collageSize = {
  width: 1240,
  height: 1240
}
const relativeSize = {
  w: 124,
  h: 124
}
const imageSizeRatio = 0.9
const imageSlotWidthRatio = 0.05

export function generateScaleCollageSettings(collageLength: number) {
  const numberOfImagesPerLine = Math.ceil(Math.sqrt(collageLength))

  const numberOfRows = Math.ceil(collageLength / numberOfImagesPerLine)

  const slotSideLength = collageSize.width / numberOfImagesPerLine / 10

  const distanceFromTop =
    (collageSize.height - numberOfRows * (collageSize.width / numberOfImagesPerLine)) / 2 / 10

  let slots: Slot[] = []

  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfImagesPerLine; j++) {
      const slot: Slot = {
        x: slotSideLength * j + slotSideLength * imageSlotWidthRatio,
        y: slotSideLength * i + slotSideLength * imageSlotWidthRatio + distanceFromTop,
        w: slotSideLength * imageSizeRatio,
        h: slotSideLength * imageSizeRatio
      }

      slots.push(slot)
    }
  }

  return {
    slots,
    relativeSize,
    collageSize
  }
}
