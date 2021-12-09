const path = require('path')
const { v4: uuidv4 } = require('uuid')

const saveFile = (files, allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

  return new Promise((resolve, reject) => {

    const {file} = files
    const shortFilename = file.name.split('.')
    const extension = shortFilename.at(-1)

    // Validar la extensión
    if (!allowedExtensions.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${allowedExtensions}`)
    }

    const tempName = uuidv4() + '.' + extension
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempName)

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err)
      }

      resolve(tempName)
    })
  })
  
  
}

module.exports = {
  saveFile
}