const { Router } = require('express')
const { body, param } = require('express-validator')

const {
  validateFields,
  validateJWT,
  hasRole
} = require('../middlewares')

const { 
  isValidRole, 
  emailExist, 
  userByIdExist 
} = require('../helpers/dbValidators')

const { 
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete
} = require('../controllers/users')

const router = Router()

router.get('/', userGet)

router.post('/', [
  body('name', 'El nombre es obligatorio').not().isEmpty(),
  body('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
  body('email', 'El correo no es válido').isEmail(),
  body('email').custom(emailExist),
  // body('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  body('role').custom(isValidRole),
  validateFields
], userPost)

// Se define el id como segmento de ruta
router.put('/:id', [
  param('id', 'No es un ID válido').isMongoId().bail().custom(userByIdExist),
  body('role').optional().custom(isValidRole),
  validateFields
], userPut)

router.patch('/', userPatch)

router.delete('/:id', [
  validateJWT,
  // isAdminRole,
  hasRole('ADMIN_ROLE', 'USER_ROLE'),
  param('id', 'No es un ID válido').isMongoId().bail().custom(userByIdExist),
  validateFields
],userDelete)

module.exports = router