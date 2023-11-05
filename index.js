const express = require('express');
const query = require('./db/customers');
const bodyParser = require('body-parser');
const users = require('./db/users');
const authenticate = require('./services/authenticate');

const app = express();
app.use(bodyParser.json());

const port = 3000;
process.env.SECRET_KEY = "5b1a3923cc1e1e19523fd5c3f20b409509d3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84d";
app.get("/api/customers", authenticate.authenticate, query.getCustomers);
app.get("/api/customers/:id", authenticate.authenticate, query.getCustomerById);
app.post("/api/customers", authenticate.authenticate, query.addCustomer);
app.delete("/api/customers/:id", authenticate.authenticate, query.deleteCustomer);
app.put("/api/customers/:id", authenticate.authenticate, query.updateCustomer);

app.post('/login', authenticate.login);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;