const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const { generateJWT } = require('../helpers/generateJWT')
const { googleVerify } = require('../helpers/googleVerify')

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

const googleSingIn = async(req, res) => {
  
  const {id_token} = req.body

  try {

    const {name, img, email} = await googleVerify(id_token)

    let user = await User.findOne({email})

    if(!user) {
      // Se crea el usuario
      const data = {
        name,
        email,
        password: ':P',
        img,
        role: 'USER_ROLE',
        google: true
      }

      user = new User(data)
      await user.save()
    }

    // Si el usuario en BD
    if (!user.state) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
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
    res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar'
    })
  }

}

module.exports = {
  login,
  googleSingIn
}