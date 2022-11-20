const express = require("express"); //import express framework which is npm package to make http routes on server
const path = require("path"); //importing package

const app = express(); //initialising router
const hbs = require("hbs"); //import hbs
require("./db/conn");  //connecting to mongodb database
const Register = require("./models/registers"); // import register

const port = process.env.PORT || 3000; //creating variable to store port number if port is given in .env then that will be used otherwise 3000

const static_path = path.join(__dirname, "../public"); //setting public directory path as static
const template_path = path.join(__dirname, "../templates/views"); // setting path of views directory in the variable
const partials_path = path.join(__dirname, "../templates/partials"); // setting psth of partials

app.use(express.json()); //modifying to json format
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path)); // setting static path to serve files
app.set("view engine", "hbs"); //declaring hbs, setting view engine for server side rendering
app.set("views", template_path); //declaring templates views
hbs.registerPartials(partials_path); //declare partials diff method for reusable components

app.get("/", (req, res) => {  //define a route handler for GET requests to a given '/' URL
  res.render("index");
});

app.get("/register", (req, res) => {  //define a route handler for GET requests to a given '/register' URL
  res.render("register");
});

app.get("/login", (req, res) => {  //define a route handler for GET requests to a given '/login' URL
  res.render("login");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password; //req-object,body-parameter, password-field
    const cpassword = req.body.confirmpassword;

    // console.log(password+" "+cpassword);
    if (password === cpassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: password,
        confirmpassword: cpassword,
      });
      const registered = await registerEmployee.save();
      res.status(201).render("thankyou");
    } else {
      res.send("passwords are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


app.post("/login", async (req,res) => {
  try{
    const email = req.body.email;
    const password = req.body.password;

    console.log(`${email} ans password is ${password}`);
    const usermail = await Register.findOne({email:email});

    if(usermail.password===password){
      res.status(201).send("Successful login");
    }else{
      res.send("Invalid password");
    }

  } catch(error){
    res.status(400).send("Invalid email");
  }
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});

