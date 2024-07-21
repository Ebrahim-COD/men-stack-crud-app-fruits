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

  app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  });

  app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
  });

  app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    });
  });

  // server.js

app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});