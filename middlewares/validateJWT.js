const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async(req, res, next) => {
  const token = req.header('x-token')

  if(!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    })
  }

  try {

    const {uid} = jwt.verify(token, process.env.PRIVATEJWT)

    // Leer el usuario que corresponde al uid
    const user = await User.findById(uid)

    // Verificar si el uid no esta marcado o tiene estado en true
    if (!user.state || !user) {
      return res.status(401).json({
        msg: 'Token no valido'
      })
    }

    req.user = user
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token no valido'
    })
  }


}

module.exports = {
  validateJWT
}