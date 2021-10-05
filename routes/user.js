const { Router } = require('express')
const { body } = require('express-validator')
const Role = require('../models/role')

const { validateFields } = require('../middlewares/validateFields')

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
  // body('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  body('role').custom(async(role = '') => {
    const roleExists = await Role.findOne({ role })
    if(!roleExists) throw new Error(`El rol ${role} no está registrado en la BBDD`)
  }),
  validateFields
], userPost)

// Se define el id como segmento de ruta
router.put('/:id', userPut)

router.patch('/', userPatch)

router.delete('/', userDelete)

module.exports = router