const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const userGet = (req, res) => {
  // Para obtener argumentos de Query Params
  const {q, nombre = 'No name', apiKey, page = 1, limit} = req.query

  res.json({
    msg: 'get API - Controlador',
    q,
    nombre,
    apiKey,
    page,
    limit
  })
}

const userPost = async(req, res) => {

  // Obtener el body de la petición
  const {name, email, password, role} = req.body
  const user = new User({
    name,
    email,
    role
  })

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // Guardar en DB
  await user.save()

  res.json({
    user
  })
}

const userPut = async(req, res) => {
  // Se obtiene el segmento de ruta id
  const {id} = req.params
  const {password, google, ...rest} = req.body

  // TODO validar contra BBDD
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.json({
    msg: 'put API - Controlador',
    user
  })
}

const userPatch = (req, res) => {
  res.json({
    msg: 'patch API - Controlador'
  })
} 

const userDelete = (req, res) => {
  res.json({
    msg: 'delete API - Controlador'
  })
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete
}