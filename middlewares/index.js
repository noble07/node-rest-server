const validateFields = require('./validateFields')
const validateJWT = require('./validateJWT')
const hasRole = require('./validateRoles')
const validateFile = require('./validateFile')

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...hasRole,
  ...validateFile
}