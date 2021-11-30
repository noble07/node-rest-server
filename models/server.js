const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')
class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      auth: '/api/auth',
      category: '/api/categorys',
      product: '/api/products',
      user: '/api/users',
    }

    // Conectar a BD
    this.connectDB()

    // Middlewares
    this.middlewares()

    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio público
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'))
    this.app.use(this.paths.category, require('../routes/categorys'))
    this.app.use(this.paths.user, require('../routes/users'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en ' + this.port)
    })
  }
}

module.exports = Server