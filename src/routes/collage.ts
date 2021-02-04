import bodyParser from 'body-parser'
import { NextFunction, Request, Response, Application } from 'express'

import CollageController from '../controllers/CollageController'
import { generateScaleCollageSettings } from '../services/generateCollageSettings'
import { CollageSettings } from '../types'

export default function collageRouter(app: Application, collageController: CollageController) {
  // Routes
  async function createCollage(req: Request, res: Response, next: NextFunction) {
    const { imageUrls, layout, backgroundColor, size } = req.body

    if (imageUrls.length === 0) {
      throw new Error('No images to create a collage.')
    }

    const collageSettings: CollageSettings =
      size && layout
        ? { collageSize: size, relativeSize: layout.relativeSize, slots: layout.slots }
        : generateScaleCollageSettings(imageUrls.length)

    collageSettings.backgroundColor = backgroundColor || '#FFFFFF'

    try {
      const collage = await collageController.createCollage(imageUrls, collageSettings)
      res.send(collage)
    } catch (error) {
      return next(error)
    }
  }

  async function getCollage(req: Request, res: Response, next: NextFunction) {
    try {
      const collage = await collageController.getCollage(req.params.collageId)
      res.send(collage)
    } catch (error) {
      return next(error)
    }
  }

  // Router
  app.use(bodyParser.json())

  app.post('/api/collages', createCollage)
  app.get('/api/collages/:collageId', getCollage)

  return {}
}
