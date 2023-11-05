const jwt = require('jsonwebtoken');
const users = require('../db/users');
const bcrypt = require('bcrypt');

const login = (req, res) => {
    const email = req.body.email;
    const pwd = req.body.password;

    const loginUser = users.getUserByEmail(email, (user) => {
        if (user.length > 0) {
            const hashpwd = user[0].password;
            const token = jwt.sign({ userId: email }, process.env.SECRET_KEY);

            if (bcrypt.compareSync(hashpwd, pwd)) {
                res.send({ token });
            }
            else {
                res.sendStatus(400).end();
            }
        }
        else {
            res.sendStatus(400).end();
        }
    })
}

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        res.sendStatus(400).end();
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (err) {
            res.sendStatus(400).end();
        }
        else {
            next();
        }
    })
}

module.exports =
{
    login: login,
    authenticate: authenticate
}