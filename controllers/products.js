const {Product} = require('../models')

const getProducts = async(req, res) => {
  
  const {limit = 5, offset = 0} = req.query
  const query = {state: true}

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(offset))
      .limit(Number(limit))
  ])

  res.json({
    total,
    products
  })
}

const getProduct = async(req, res) => {
  
  const {id} = req.params

  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name')

  res.json(product)
}

const createProduct = async(req, res) => {
  const { price = 0, category, description = '' } = req.body
  const name = req.body.name.toUpperCase()

  const productDB = await Product.findOne({name})

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.name} ya existe`
    })
  }

  // Data a guardar
  const data = {
    name,
    price,
    category,
    description,
    user: req.user._id
  }

  const product = new Product(data)

  await product.save()

  res.status(201).json(product)
}

const updateProduct = async(req, res) => {
  const {id} = req.params
  const {price = 0, category, description = '', available = true} = req.body
  const name = req.body.name?.toUpperCase()
  const user = req.user._id
  let query = {}

  if (name) {
    const productDB = await Product.findOne({name})
  
    if (productDB) {
      return res.status(400).json({
        msg: `El producto ${productDB.name} ya existe`
      })
    }

    query.name = name
  }

  // Se prepara la data
  const data = {
    ...query,
    price,
    category,
    description,
    available,
    user
  }

  const product = await Product.findByIdAndUpdate(id, data, {new: true})

  res.json(product)
}

const deleteProduct = async(req, res) => {
  
  const {id} = req.params

  const product = await Product.findByIdAndUpdate(id, {state: false}, {new: true})

  res.json(product)
}



module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}