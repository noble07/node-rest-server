const {Category} = require('../models')

const getCategorys = async(req, res) => {

  const {limit = 5, offset = 0} = req.query
  const query = {state: true}

  const [total, categorys] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(Number(offset))
      .limit(Number(limit))
  ])


  res.json({
    total,
    categorys
  })
}

const getCategory = async(req, res) => {
  const {id} = req.params

  const category = await Category.findById(id).populate('user', 'name')

  res.json(category)
}

const createCategory = async(req, res) => {
  
  const name = req.body.name.toUpperCase()

  const categoryDB = await Category.findOne({name})

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoría ${categoryDB.name} ya existe`
    })
  }

  // Generar la data a guardar
  const data = {
    name,
    user: req.user._id
  }

  const category = new Category(data)

  // Guardar DB
  await category.save()

  res.status(201).json(category)

}

const updateCategory = async(req, res) => {
  const {id} = req.params
  const name = req.body.name.toUpperCase()
  const user = req.user._id

  const categoryDB = await Category.findOne({name})
  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoría ${categoryDB.name} ya existe`
    })
  }

  const category = await Category.findByIdAndUpdate(id, {name, user}, {new: true})

  res.json(category)

}

const deleteCategory = async(req, res) => {
  const {id} = req.params

  const category = await Category.findByIdAndUpdate(id, {state: false}, {new: true})

  res.json(category)
}

module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory
}