const { Router } = require('express')
const { body, param } = require('express-validator')

const { validateFields, validateJWT, isAdminRole } = require('../middlewares')
const { categoryIdExist } = require('../helpers/dbValidators')

const { 
  createCategory, 
  getCategorys, 
  getCategory, 
  updateCategory,
  deleteCategory
} = require('../controllers/category')


const router = Router()

/**
 * 
 * {{url}}/api/category
 * 
 */

// Obtener todas las categorías - publico
router.get('/', getCategorys)

// Obtener una categoría por id - publico
router.get('/:id', [
  param('id', 'No es un ID válido').isMongoId(),
  param('id').custom(categoryIdExist),
  validateFields
], getCategory)

// Crear categoría - privado - con cualquier rol
router.post('/', [
  validateJWT,
  body('name', 'El nombre es obligatorio').not().isEmpty(),
  validateFields
], createCategory)

// Actualizar categoría por id - privado - con cualquier rol
router.put('/:id', [
  validateJWT,
  param('id', 'No es un ID válido').isMongoId().bail().custom(categoryIdExist),
  body('name', 'El nombre es obligatorio').not().isEmpty(),
  validateFields
], updateCategory)

// Borrar una categoria - Admin
router.delete('/:id', [
  validateJWT,
  isAdminRole,
  param('id', 'No es un ID válido').isMongoId().bail().custom(categoryIdExist),
  validateFields
], deleteCategory)


module.exports = router