const {Role, User, Category, Product} = require('../models')

const isValidRole = async(role = '') => {
  const roleExists = await Role.findOne({ role })
  if(!roleExists) throw new Error(`El rol ${role} no está registrado en la BBDD`)
}

const emailExist = async(email = '') => {
  // Verificar si el correo existe
  const emailExist = await User.findOne({email})
  if(emailExist) throw new Error(`El correo: ${email} ya esta registrado`) 
}

const userByIdExist = async(id) => {
  const userExist = await User.findById(id)
  if(!userExist) throw new Error(`El id: ${id} no existe`)
}

const categoryIdExist = async(id) => {
  const categoryExist = await Category.findById(id)
  if(!categoryExist) throw new Error(`El id: ${id} no existe`)
}

const producIdExist = async(id) => {
  const productExist = await Product.findById(id)
  if(!productExist) throw new Error(`El id: ${id} no existe`)
}

/**
 * Validate Allowed Collections
 */
const allowedCollections = (collection = '', collections = []) => {
  const included = collections.includes(collection)
  if (!included) {
    throw new Error(`La colleción ${collection} no es permitida, ${collections}`)
  }

  return true
}


module.exports = {
  isValidRole,
  emailExist,
  userByIdExist,
  categoryIdExist,
  producIdExist,
  allowedCollections
}