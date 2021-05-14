import { RequestContext } from '@mikro-orm/core'
import express from 'express'
import { APIRouter, WebServer } from './types'
import { MikroORM } from '../../database'

interface BasicWebServerOptions {
  mikroORM?: MikroORM
}

const setupBasicWebServer = (apiRouter: APIRouter, options: BasicWebServerOptions): WebServer => {
  const server = express()
  server.use(express.json())

  const entityManager = options?.mikroORM?.em
  if (entityManager !== undefined) {
    server.use((_req, _res, next) => RequestContext.create(entityManager, next))
  }

  server.use('/api', apiRouter)
  server.use((_req, res) => res.status(404).json({ message: 'No route found' }))

  return server
}

export { BasicWebServerOptions, setupBasicWebServer }
