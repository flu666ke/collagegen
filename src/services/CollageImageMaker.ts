import jimp from 'jimp'
import { CollageSettings, CollageSize } from '../types'

export default class CollageImageMaker {
  public async generateCollage(imageUrls: string[], collageSettings: CollageSettings) {
    const { collageSize, relativeSize, backgroundColor, slots } = collageSettings

    const slotXToContainerX = (x: number) => {
      return (x / relativeSize.w) * collageSize.width
    }

    const slotYToContainerY = (y: number) => {
      return (y / relativeSize.h) * collageSize.height
    }

    const jimps = this.generateJimps(imageUrls)

    const collageBackground = await this.generateBackgroundImage(collageSize, backgroundColor!)

    const collage = await Promise.all(jimps).then(images => {
      for (let i = 0; i < images.length; i++) {
        collageBackground.composite(
          images[i].contain(slotXToContainerX(slots[i].w), slotYToContainerY(slots[i].h)),
          slotXToContainerX(slots[i].x),
          slotYToContainerY(slots[i].y)
        )
      }

      return collageBackground
    })

    return this.generateBufferCollage(collage)
  }

  //Private methods
  private generateJimps(imageUrls: string[]): Promise<jimp>[] {
    const jimps = []

    for (let image of imageUrls) {
      jimps.push(jimp.read(image))
    }

    return jimps
  }

  private async generateBackgroundImage(
    collageSize: CollageSize,
    collageBackgroundColor: string
  ): Promise<jimp> {
    const backgroundImage = new jimp(
      collageSize.width,
      collageSize.height,
      collageBackgroundColor,
      err => {
        if (err) throw err
      }
    )

    return backgroundImage
  }

  private generateBufferCollage(collage: jimp) {
    let bufferCollage

    collage.getBuffer(jimp.MIME_JPEG, (err, buffer) => {
      if (err) return err
      bufferCollage = buffer
    })

    return bufferCollage
  }
}
