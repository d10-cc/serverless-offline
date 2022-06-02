import { exit } from 'process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Server } from '@hapi/hapi'
import { catchAllRoute, connectionsRoutes } from './http-routes/index.js'
import serverlessLog from '../../serverlessLog.js'

export default class HttpServer {
  #options = null
  #server = null
  #webSocketClients = null

  constructor(options, webSocketClients, v3Utils) {
    this.#options = options
    this.#webSocketClients = webSocketClients

    if (v3Utils) {
      this.log = v3Utils.log
      this.progress = v3Utils.progress
      this.writeText = v3Utils.writeText
      this.v3Utils = v3Utils
    }

    const { host, websocketPort, httpsProtocol } = options

    const serverOptions = {
      host,
      port: websocketPort,
      router: {
        // allows for paths with trailing slashes to be the same as without
        // e.g. : /my-path is the same as /my-path/
        stripTrailingSlash: true,
      },
    }

    // HTTPS support
    if (typeof httpsProtocol === 'string' && httpsProtocol.length > 0) {
      serverOptions.tls = {
        cert: readFileSync(resolve(httpsProtocol, 'cert.pem'), 'ascii'),
        key: readFileSync(resolve(httpsProtocol, 'key.pem'), 'ascii'),
      }
    }

    this.#server = new Server(serverOptions)
  }

  async start() {
    // add routes
    const routes = [
      ...connectionsRoutes(this.#webSocketClients, this.v3Utils),
      catchAllRoute(this.v3Utils),
    ]
    this.#server.route(routes)

    const { host, httpsProtocol, websocketPort } = this.#options

    try {
      await this.#server.start()
    } catch (err) {
      if (this.log) {
        this.log.error(
          `Unexpected error while starting serverless-offline websocket server on port ${websocketPort}:`,
          err,
        )
      } else {
        console.error(
          `Unexpected error while starting serverless-offline websocket server on port ${websocketPort}:`,
          err,
        )
      }
      exit(1)
    }

    if (this.log) {
      this.log.notice(
        `Offline [http for websocket] listening on http${
          httpsProtocol ? 's' : ''
        }://${host}:${websocketPort}`,
      )
    } else {
      serverlessLog(
        `Offline [http for websocket] listening on http${
          httpsProtocol ? 's' : ''
        }://${host}:${websocketPort}`,
      )
    }
  }

  // stops the server
  stop(timeout) {
    return this.#server.stop({
      timeout,
    })
  }

  get server() {
    return this.#server.listener
  }
}
