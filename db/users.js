const db = require('./dbconfig');

const getUserByEmail = (email, next) => {
    const query =
    {
        text: 'SELECT * FROM users WHERE email = $1',
        value: [email]
    }

    db.query(query, (err, result) => {
        if (err) {
            return console.error("an error occured", err.stack);
        }
        else {
            next(result.rows);
        }
    })
}

module.exports = {
    getUserByEmail: getUserByEmail
}
