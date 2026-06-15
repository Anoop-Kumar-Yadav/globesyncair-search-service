const express = require("express");
// const bodyParser = require("body-parser");

const app = express();

app.use(express.json()); // Parse Content-Type: application/json

// extended: true -> allows you to parse rich, nested objects and arrays sent from forms
app.use(express.urlencoded({ extended: true })); // Parse Content-Type: application/x-www-form-urlencoded

module.exports = app;
