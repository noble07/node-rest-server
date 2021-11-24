const isAdminRole = (req, res, next) => {
  
  const {user} = req
  if (!user) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero'
    })
  }

  const {role, name} = user

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} no es administrador - No puede hacer esto`
    })
  }

  next();
}

const hasRole = (...roles) => {
  return (req, res, next) => {
    
    const {user} = req
    if (!user) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token primero'
      })
    }

    const {role} = user
    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `El servicio require uno de estos roles ${roles}`
      })
    }

    next()
  }
}


module.exports = {
  isAdminRole,
  hasRole
}