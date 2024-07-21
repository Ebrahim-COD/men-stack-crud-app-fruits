//Imported modules
const dotenv = require("dotenv").config(); 
const express = require("express");
const morgan = require('morgan');
// const mongoose = require('mongoose'); This is not needed anymore bec i have config folder

// dotenv.config(); This not needed
const app = express();

//Database call
require('./config/database.js');

// We're importing it here because this file has the route handlers
const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));


//Middleware
app.use(morgan('dev'));



//Routes

//Landing Page
app.get("/", (req, res, next) => {
    res.render("index.ejs");
  });


  app.get("/fruits/new", (req, res) => {
    res.render('fruits/new.ejs');
  });

  // server.js

// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
  });

  // GET /fruits
  app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});