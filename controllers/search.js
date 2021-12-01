const {ObjectId} = require('mongoose').Types
const {User, Category, Product} = require('../models')

const allowedCollections = [
  'users',
  'categorys',
  'products',
  'roles'
]

const searchUsers = async(param = '', res) => {
  
  const isMongoId = ObjectId.isValid(param)

  if (isMongoId) {
    const user = await User.findById(param)
    return res.json({
      results: user ? [user] : []
    })
  }

  const regex = new RegExp(param, 'i')
  const users = await User.find({
    $or: [{name: regex}, {email: regex}],
    $and: [{state:true}]
  })

  res.json({
    results: users
  })

}

const searchCategorys = async(param = '', res) => {
  
  const isMongoId = ObjectId.isValid(param)

  if (isMongoId) {
    const category = await Category.findById(param)
    return res.json({
      results: category ? [category] : []
    })
  }

  const regex = new RegExp(param, 'i')
  const categorys = await Category.find({name: regex, state: true})

  res.json({
    results: categorys
  })
}

const searchProducts = async(param = '', res) => {
  const isMongoId = ObjectId.isValid(param)

  if (isMongoId) {
    const product = await Product.findById(param).populate('category', 'name')
    return res.json({
      results: product ? [product] : []
    })
  }

  const regex = new RegExp(param, 'i')
  const products = await Product.find({name: regex, state: true}).populate('category', 'name')

  res.json({
    results: products
  })
}



const search = (req, res) => {

  const {collection, param} = req.params

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${allowedCollections}`
    })
  }

  switch (collection) {
    case 'users':
      searchUsers(param, res)
      break
    case 'categorys':
      searchCategorys(param, res)
      break
    case 'products':
      searchProducts(param, res)
      break
  
    default:
      res.status(500).json({
        msg: 'Se me olvido hacer está busqueda'
      })
      break;
  }
}

module.exports = {
  search
}