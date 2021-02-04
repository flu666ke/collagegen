import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

import * as swaggerDocument from './swagger.json'
import collageRouteModule from './routes/collage'
import CollageController from './controllers/CollageController'
import s3FilesService from './services/S3FilesService'
import { config } from './config'
import CollageImageMaker from './services/CollageImageMaker'

// Core
const core = (() => {
  const app: Application = express()
  app.listen(config.port, () => console.log(`Server running on port ${config.port}`))
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  const s3filesService = s3FilesService(config)

  const collageImageMaker = new CollageImageMaker()

  return {
    app,
    s3filesService,
    collageImageMaker
  }
})()

// Controllers
const controllers = (() => {
  const collage = new CollageController(core.s3filesService, core.collageImageMaker)

  return {
    collage
  }
})()

// Routes
const routes = (() => {
  const collage = collageRouteModule(core.app, controllers.collage)

  return {
    collage
  }
})()
