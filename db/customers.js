const db = require('./dbconfig');

const getCustomers = (req, res) => {
    db.query('SELECT * FROM customers', (err, result) => {
        if (err) {
            return console.error("an error occured", err.stack);
        }
        else {
            res.json(result.rows);
        }
    })
}

const getCustomerById = (req, res) => {
    const customerId = req.params.id;
    const query =
    {
        text: 'SELECT * FROM customers WHERE id = $1',
        values: [customerId],
    }
    db.query(query, (err, result) => {
        if (err) {
            return console.error("an error occured", err.stack);
        }
        else {
            if (result.rows.length > 0) {
                res.json(result.rows);
            }
            else {
                res.status(404).end();
            }
        }
    })
}

const addCustomer = (req, res) => {
    const newCustomer = req.body;
    const query =
    {
        text: 'INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3)',
        values: [newCustomer.firstname, newCustomer.lastname, newCustomer.email, newCustomer.phone],
    }
    db.query(query, (err, result) => {
        if (err) {
            return console.log("an error occured", err.stack);
        }
    })
    res.json(newCustomer);
}

const deleteCustomer = (req, res) => {
    const customerId = req.params.id;
    const query =
    {
        text: 'DELETE FROM customers WHERE id = $1',
        values: [customerId],
    }
    db.query(query, (req, result) => {
        if (err) {
            return console.error("an error occured", err.stack);
        }
    })
    res.status(204).end();
}

const updateCustomer = (req, res) => {
    const customerId = req.params.id;
    const newCustomer = req.body;
    const query =
    {
        text: 'UPDATE customers SET firstname = $1 lastname = $2, email = $3, phone = $4 WHERE id = $5',
        values: [newCustomer.firstname, newCustomer.lastname, newCustomer.email, newCustomer.phone, customerId],
    }

    db.query(query, (req, result) => {
        if (err) {
            return console.error("an error occured", err.stack);
        }
    })
    res.json(newCustomer);
}

const deleteAllCustomers = () => {
    db.query('DELETE FROM customers'), (err, result) => {
        if (err) {
            return console.error("an error occured", err.stack);
        }
    }
}

module.exports =
{
    getCustomers: getCustomers,
    getCustomerById: getCustomerById,
    addCustomer: addCustomer,
    deleteCustomer: deleteCustomer,
    updateCustomer: updateCustomer,
    deleteAllCustomers: deleteAllCustomers
}