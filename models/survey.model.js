let mongoose = require('mongoose')
let validator = require('validator')

let surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isAlphanumeric(value)
    }
  },
  author: {
    type: String,
    required: true,
    validate: (value) => {
        return validator.isAlphanumeric(value)
    }
  },
  startDate: {
    type: Date,
    default: () => Date.now()
  },
  active: {
    type: Boolean,
    default: false
  },
  surveyType: {
    type: Number,
    default: 0
  },
  endDate: {
    type: Date,
    default: new Date(+new Date() + 30*24*60*60*1000)   // default age 30 days
  }
})

module.exports = mongoose.model('Survey', surveySchema)