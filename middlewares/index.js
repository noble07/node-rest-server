const validateFields = require('./validateFields')
const validateJWT = require('./validateJWT')
const hasRole = require('./validateRoles')

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...hasRole
}