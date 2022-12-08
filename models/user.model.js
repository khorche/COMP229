let mongoose = require('mongoose')
let validator = require('validator')

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      return validator.isAlphanumeric(value)
    }
  },
  name: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isAlphanumeric(value)
    }
  },
  role: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isAlpha(value)
    }
  },
  correct: {
    type: Number,
    required: true,
    validate: (value) => {
        return validator.isInt(value)
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