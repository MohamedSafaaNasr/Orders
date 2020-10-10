let express = require("express");
let users = require("./users");
let orders = require("./orders");

const app = express();

app.use("/users", users);
app.use("/orders", orders);

module.exports = app;
