// files for handling the routes.

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('pages/index');
    })
}