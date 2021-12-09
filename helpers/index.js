const dbValidators = require('./dbValidators')
const generateJWT = require('./generateJWT')
const googleVerify = require('./googleVerify')
const saveFile = require('./saveFile')

module.exports = {
  ...dbValidators,
  ...generateJWT,
  ...googleVerify,
  ...saveFile
}