const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/survey_site', {useNewUrlParser: true, useUnifiedTopology: true});

require('./routes')(app);

app.locals.TOKEN_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MDQ5MDkxMSwiaWF0IjoxNjcwNDkwOTExfQ.g6JbjRophnYlc1xjTz3ju6O0PerxJ6j1JM8a-_KgcOQ'
app.locals.user = null

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})