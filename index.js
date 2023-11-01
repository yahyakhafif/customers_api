const express = require('express');
const query = require('./db/customers');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get("/api/customers", query.getCustomers);
app.get("/api/customers/:id", query.getCustomerById);
app.post("/api/customers", query.addCustomer);
app.delete("/api/customers/:id", query.deleteCustomer);
app.put("/api/customers/:id", query.updateCustomer);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})