const { Router } = require('express')
const { body, param } = require('express-validator')

const { validateJWT, validateFields, isAdminRole } = require('../middlewares')
const { categoryIdExist, producIdExist } = require('../helpers/dbValidators')

const {
  createProduct, 
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products')

const router = Router()

/**
 * 
 * {{url}}/api/products
 * 
 */

// Obtener todos los productos
router.get('/', getProducts)

// Obtener todos los productos
router.get('/:id', [
  param('id', 'No es un ID válido').isMongoId().bail().custom(producIdExist),
  validateFields
], getProduct)

// Crear producto
router.post('/', [
  validateJWT,
  body('name', 'El nombre es obligatorio').not().isEmpty(),
  body('price', 'El precio debe ser tipo numerico').optional().isNumeric(),
  body('category', 'No es un ID de categoría valido').isMongoId().bail().custom(categoryIdExist),
  body('description', 'La descripción no es valida').optional().isString(),
  body('available', 'La disponibilidad no es valida').optional().isBoolean(),
  validateFields
], createProduct)

// Actualizar producto
router.put('/:id', [
  validateJWT,
  param('id', 'No es un ID válido').isMongoId().bail().custom(producIdExist),
  body('name', 'El nombre es obligatorio').optional().not().isEmpty(),
  body('price', 'El precio debe ser tipo numerico').optional().isNumeric(),
  body('category', 'No es un ID de categoría valido').optional().isMongoId().bail().custom(categoryIdExist),
  body('description', 'La descripción no es valida').optional().isString(),
  body('available', 'La disponibilidad no es valida').optional().isBoolean(),
  validateFields
], updateProduct)

// Borrar producto
router.delete('/:id', [
  validateJWT,
  isAdminRole,
  param('id', 'No es un ID válido').isMongoId().bail().custom(producIdExist),
  validateFields
], deleteProduct)

module.exports = router