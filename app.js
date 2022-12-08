const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/survey_site', {useNewUrlParser: true, useUnifiedTopology: true});

require('./routes')(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})