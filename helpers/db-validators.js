const Role = require('../models/role')

const isValidRole = async(role = '') => {
  const roleExists = await Role.findOne({ role })
  if(!roleExists) throw new Error(`El rol ${role} no está registrado en la BBDD`)
}

module.exports = {
  isValidRole
}