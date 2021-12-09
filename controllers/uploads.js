const path = require('path')
const fs = require('fs')

const {saveFile} = require('../helpers')
const {User, Product} = require('../models')

const uploadFile = async(req, res) => {

  try {
    const name = await saveFile(req.files, undefined, 'imgs')
    res.json({
      name
    })
  } catch (msg) {
    res.status(400).json({
      msg
    })
  }


}

const updateUserImg = async(req, res) => {

  const {id, collection} = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if(!model) return res.status(400).json({
        msg: `No existe un usuario con el id ${id}`
      })
      break;
    
    case 'products':
    model = await Product.findById(id)
    if(!model) return res.status(400).json({
      msg: `No existe un producto con el id ${id}`
    })
      break;
  
    default:
      return res.status(500).json({
        msg: 'Se me olvidó validar esto'
      })
  }
  
  try {
    
    // Limpiar imagenes previas
    if (model.img) {
      // Hay que borrar la imagen del servidor
      const imgPath = path.join(__dirname, '../uploads', collection, model.img)
  
      console.log(imgPath)
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath)
      }
    }
    
    const name = await saveFile(req.files, undefined, collection)
    model.img = name

    await model.save()

    res.json(model)

  } catch (msg) {
    res.status(400).json({
      msg
    })
  }
}

const showImage = async(req, res) => {
  
  const {id, collection} = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if(!model) return res.status(400).json({
        msg: `No existe un usuario con el id ${id}`
      })
      break;
    
    case 'products':
      model = await Product.findById(id)
      if(!model) return res.status(400).json({
        msg: `No existe un producto con el id ${id}`
      })
      break;
  
    default:
      return res.status(500).json({
        msg: 'Se me olvidó validar esto'
      })
  }
  
  try {
    
    // Limpiar imagenes previas
    if (model.img) {
      // Hay que borrar la imagen del servidor
      const imgPath = path.join(__dirname, '../uploads', collection, model.img)
  
      console.log(imgPath)
      if (fs.existsSync(imgPath)) {
        return res.sendFile(imgPath)
      }
    }

    const noImgFound = path.join(__dirname, '../assets/no-image.jpg')
  
    res.sendFile(noImgFound)

  } catch (msg) {
    res.status(400).json({
      msg
    })
  }

}


module.exports = {
  uploadFile,
  updateUserImg,
  showImage
}