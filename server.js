//Imported modules
const dotenv = require("dotenv").config(); 
const express = require("express");
const methodOverride = require("method-override"); // new
const morgan = require('morgan');
// const mongoose = require('mongoose'); This is not needed anymore bec i have config folder

// dotenv.config(); This not needed
const app = express();

//Database call
require('./config/database.js');

// We're importing it here because this file has the route handlers
const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

//controllers
const fruitsCtrl = require("./controllers/fruits");

app.get('/', fruitsCtrl.home)
app.get('/fruits/new', fruitsCtrl.New);
app.post('/fruits', fruitsCtrl.create)
app.get('/fruits', fruitsCtrl.index);
app.get('/fruits/:fruitId', fruitsCtrl.show)
app.delete('/fruits/:fruitId', fruitsCtrl.Delete)
app.get('/fruits/:fruitId/edit', fruitsCtrl.edit)
app.put('/fruits/:fruitId', fruitsCtrl.update);


//Route

app.listen(3000, () => {
  console.log("Listening on port 3000");
});