const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')
class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      auth: '/api/auth',
      categorys: '/api/categorys',
      products: '/api/products',
      users: '/api/users',
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
    this.app.use(this.paths.categorys, require('../routes/categorys'))
    this.app.use(this.paths.products, require('../routes/products'))
    this.app.use(this.paths.users, require('../routes/users'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en ' + this.port)
    })
  }
}

module.exports = Server