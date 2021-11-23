const { Router } = require('express')
const { body } = require('express-validator')

const { validateFields } = require('../middlewares/validateFields')

const { login } = require('../controllers/auth')

const router = Router()

router.post('/login', [
  body('email', 'El correo es obligatorio').isEmail(),
  body('password', 'La contraseña es obligatoria').not().isEmpty(),
  validateFields
], login)

module.exports = router