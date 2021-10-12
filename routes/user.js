const { Router } = require('express')
const { body } = require('express-validator')

const { validateFields } = require('../middlewares/validateFields')
const { isValidRole, emailExist } = require('../helpers/db-validators')

const { 
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete
} = require('../controllers/user')

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
router.put('/:id', userPut)

router.patch('/', userPatch)

router.delete('/', userDelete)

module.exports = router