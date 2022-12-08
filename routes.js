// files for handling the routes.

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index');
    })

    app.get('/login', (req, res) => {
        res.render('login');
    })

    app.get('/register', (req, res) => {
        res.render('register');
    })

    app.get('/dashboard', (req, res) => {
        res.render('dashboard');
    })

    app.get('/profile', (req, res) => {
        res.render('profile');
    })

    app.get('/profile/edit', (req, res) => {
        res.render('edit_profile');
    })

    app.get('/user/:id', (req, res) => {
        res.render('user');
    })    

    app.get('/survey/all', (req, res) => {
        res.render('surveys');
    })

    app.get('/survey/:id', (req, res) => {
        res.render('single_survey');
    })

    app.get('/create-survey/', (req, res) => {
        res.render('add_survey');
    })

    app.get('/survey/:id/edit', (req, res) => {
        res.render('edit_survey');
    })

    app.get('/survey/:id/delete', (req, res) => {
        res.render('delete_survey');
    })
}