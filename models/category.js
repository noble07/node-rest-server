const {Schema, model} = require('mongoose')

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

categorySchema.methods.toJSON = function() {
  const {__v, state, ...category} = this.toObject()
  return category
}

module.exports = model('Category', categorySchema)