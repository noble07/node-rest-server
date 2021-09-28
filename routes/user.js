const { Router } = require('express')

const { 
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete
} = require('../controllers/user')

const router = Router()

router.get('/', userGet)

router.post('/', userPost)

// Se define el id como segmento de ruta
router.put('/:id', userPut)

router.patch('/', userPatch)

router.delete('/', userDelete)

module.exports = router