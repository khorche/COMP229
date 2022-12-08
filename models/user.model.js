let mongoose = require('mongoose')
let validator = require('validator')

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  name: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isAlphanumeric(value)
    }
  },
  password: {
    type: String,
    required: true,
    validate: (value) => {
        return validator.isAlphanumeric(value)
    }
  }
})

module.exports = mongoose.model('User', userSchema)