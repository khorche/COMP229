// files for handling the routes.

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.send('Survey Site!')
      })
}