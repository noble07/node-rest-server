const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/generateJWT')

const login = async(req, res) => {

  const {email, password} = req.body

  try {

    // Verificar si el email existe el existe
    const user = await User.findOne({ email })
    if(!user){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos'
      })
    }

    // SI el usuario está activo
    if(!user.state){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos'
      })
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos'
      })
    }

    // Generar el JWT
    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }

}

module.exports = {
  login
}