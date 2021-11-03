const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const userGet = async(req, res) => {

  const { limit = 5, offset = 0 } = req.query

  const users = await User.find()
    .skip(Number(offset))
    .limit(Number(limit))

  res.json({
    users
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
  const {_id, password, google, ...rest} = req.body

  // TODO validar contra BBDD
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest, {new: true})

  res.json(user)
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