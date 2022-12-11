const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27011/survey_site', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

require('./routes')(app)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})