const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async(role = '') => {
  const roleExists = await Role.findOne({ role })
  if(!roleExists) throw new Error(`El rol ${role} no está registrado en la BBDD`)
}

const emailExist = async(email = '') => {
  // Verificar si el correo existe
  const emailExist = await User.findOne({email})
  if(emailExist) throw new Error(`El correo: ${email} ya esta registrado`) 
}


module.exports = {
  isValidRole,
  emailExist
}