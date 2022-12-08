let mongoose = require('mongoose')
let validator = require('validator')

let questionSchema = new mongoose.Schema({
  ques: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isAlphanumeric(value)
    }
  },
  options: [
    {
        type: String,
        validate: (value) => {
            return validator.isAlphanumeric(value)
        }
    }
  ],
  correct: {
    type: Number,
    required: true,
    validate: (value) => {
        return validator.isInt(value)
    }
  },
  survey: {
    type: String,
    required: true,
    validate: (value) => {
        return validator.isAlphanumeric(value)
    }
  }
})

module.exports = mongoose.model('Question', questionSchema)