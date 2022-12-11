// files for handling the routes.
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: require('find-config')('config.env') })

module.exports = function(app) {

    
    const verifyAuth = (req, res, next) => {
        if (res.locals.user === null) {
          let msg = "You must sign in to continue"
          return res.redirect('/login/'+msg)
        }
      
        try {
          const decoded = jwt.verify(res.locals.user.token, process.env.TOKEN)
            res.locals.user = decoded
        } catch (err) {
            console.log(err)
            res.locals.user = null
          return res.redirect('/login/'+err)
        }
        return next()
      }
      
      const noAuth = (req, res, next) => {

        if (res.locals.user === null) {
            res.locals.user = null
            return next()
        }
        
        return res.redirect('/dashboard')
      }

    app.get('/', (req, res) => {
        res.render('index');
    })

    app.get('/login/:msg', noAuth, (req, res) => {
        res.render('login', {msg: req.params.msg});
    })

    app.post('/login', (req, res) => {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.redirect('/login/' + "Missing Fields")
        }
        
        User.findOne({email: email}, (err, user) => {
            if(err) {
                res.redirect('/login/' + "Error: " + err)
            } else {
                console.log("Found")
                bcrypt.compare(password, user.password, (error, result) => {
                    if(error) {
                        res.redirect('/login/' + "Error: " + error)
                    } else {
                        if (result) {
                            jwt.sign(
                                { user_id: user._id, email, name: user.name },
                                process.env.TOKEN,
                                {
                                expiresIn: "2h",
                                }, (err, token) => {
                                    if (token) {
                                        user.token = token
                                        res.locals.user = user
                                        res.redirect('/dashboard')
                                    } 
                                })
                        } else {
                            res.redirect('/login/' + "Password Do Not Match")
                        }
                    }
                })
            }
        })
    })

    app.get('/register', noAuth, (req, res) => {
        res.render('register');
    })

    app.post('/register', (req, res) => {
        var msg = "Register Success. Login!"
        const { name, email, password } = req.body;

        if (!(email && password && name)) {
            console.log("fields missing")
            res.render('register', {'msg': 'All Fields are required'})
        }

        User.findOne({ email }, (err, user) => {
            if (user) {
                msg = "User Already registered. Login!"
            } else if (err) {
                msg = "Error! " + err
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.render('register', {'msg': 'Error: ' + err})
                    } else if (hash) {
                        User.create({
                            email: email.toLowerCase(),
                            name: name,
                            password: hash,
                        }, (err, user) => {
                            if (err) {
                                res.render('register', {'msg': 'Error: ' + err})
                            } else if (user) {
                                msg = "Successfully Registered. Login to Continue"
                            } else {
                                res.render('register', {'msg': 'Something went wrong. Try Again Later'})
                            }
                        })
                    } else {
                        res.render('register', {'msg': 'Something went wrong. Try Again Later'})
                    }
                })
            }
        });

        res.redirect('/login/' + msg)
    })

    app.get('/logout', (req, res) => {
        res.locals.user = null
        res.redirect('/login/' + "You have been logged out")
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

    app.get('/create-survey', verifyAuth, (req, res) => {
        res.render('add_survey');
    })

    app.post('/create-survey', verifyAuth, (req, res) => {
        res.redirect('dashboard')
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