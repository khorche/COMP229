const User = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
    var msg = "Register Success. Login!"

    const { name, email, password } = req.body;

    if (!(email && password && name)) {
        return res.render('register', {'msg': 'All Fields are required'})
    }

    const oldUser = await User.findOne({ email });

    if(!oldUser) {
        msg = "User Already registered. Login!"
    } else {
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email: email.toLowerCase(),
            name: name,
            password: encryptedPassword,
        })

        jwt.sign(
            { user_id: user._id, email, name },
                app.locals.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
        )

        app.locals.user = user.name
    }

    return res.render('login', {'msg': msg})
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.render('login', {'msg': 'All Fields are required'})
    }
    
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      jwt.sign(
        { user_id: user._id, email, name: user.name },
        app.locals.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      )
      app.locals.user = user.name
      return res.redirect('/dashboard')
    }
    return res.render('login', {'msg': 'Invalid Credentials'})
}