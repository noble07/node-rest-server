const { Router } = require('express')
const { param } = require('express-validator')

const { validateFields, validateFile } = require('../middlewares')
const { uploadFile, showImage, updateUserImgCloudinary } = require('../controllers/uploads')
const { allowedCollections } = require('../helpers')

const router = Router()

router.post('/', validateFile, uploadFile)


router.put('/:collection/:id', [
  validateFile,
  param('id', 'El id debe ser valido').isMongoId(),
  param('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateFields
], updateUserImgCloudinary)
// ], updateUserImg)

router.get('/:collection/:id', [
  param('id', 'El id debe ser valido').isMongoId(),
  param('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateFields
], showImage)

module.exports = router