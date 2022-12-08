// files for handling the routes.

const authController = require("./controller/auth.controller")
const { verifyAuth, noAuth } = require("./middleware/auth.middleware")

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index');
    })

    app.get('/login', noAuth, (req, res) => {
        res.render('login');
    })

    app.post('login', (req, res) => {
        
    })

    app.get('/logout', (req, res) => {
        res.render('login');
    })

    app.get('/register', noAuth, (req, res) => {
        res.render('register');
    })

    app.post('register', (req, res) => {
        authController.register(req, res);
    })

    app.get('/dashboard', verifyAuth, (req, res) => {
        res.render('dashboard');
    })

    app.get('/profile', verifyAuth, (req, res) => {
        res.render('profile');
    })

    app.get('/profile/edit', verifyAuth, (req, res) => {
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

    app.get('/create-survey/', verifyAuth, (req, res) => {
        res.render('add_survey');
    })

    app.get('/survey/:id/edit', verifyAuth, (req, res) => {
        res.render('edit_survey');
    })

    app.get('/survey/:id/delete', verifyAuth, (req, res) => {
        res.render('delete_survey');
    })

    app.get('*', function(req, res){
        res.render('404')
    })
}