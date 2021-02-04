import { CollageSettings, Collage } from '../types'
import { S3FilesService } from '../services/S3FilesService'
import CollageImageMaker from '../services/CollageImageMaker'

export default class CollageController {
  private s3FilesService: S3FilesService
  private collageImageMaker: CollageImageMaker

  constructor(s3FilesService: S3FilesService, collageImageMaker: CollageImageMaker) {
    this.s3FilesService = s3FilesService
    this.collageImageMaker = collageImageMaker
  }

  async createCollage(imageUrls: string[], collageSettings: CollageSettings) {
    const bufferCollage = await this.collageImageMaker.generateCollage(imageUrls, collageSettings)

    const collageData: Collage = await this.s3FilesService.uploadCollage(bufferCollage)

    return collageData
  }

  async getCollage(collageId: string) {
    return await this.s3FilesService.getCollage(collageId)
  }
}
