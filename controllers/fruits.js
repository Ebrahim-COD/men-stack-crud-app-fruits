const Fruit = require('../models/fruit')

//for home page
const home = async (req, res, next) => {
    res.render("index.ejs");
  };

//for new page
const New = (req, res) => {
    res.render('fruits/new.ejs');
  };

//post new fruits
const create = async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }
      await Fruit.create(req.body);
      res.redirect("/fruits/new");
    };

// GET /fruits
const index = async (req, res) => {
    const foundFruits = await Fruit.find()
    res.render('fruits/index.ejs', {
        fruits: foundFruits
    })
}
//show each fruit
const show = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  };
// delete
const Delete = async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
  };
//Edit
const edit = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    });
}
//update
const update = async (req, res) => {
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
  }


module.exports = {
    home,
    New,
    create,
    index,
    show,
    Delete,
    edit,
    update
  };