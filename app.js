//STEP:1 REQUIRE DEPENDENCIES
//server creation
const express=require('express');
//form data parsing
const bodyParser=require('body-parser');
//local file system url parsing
const path=require('path');
//Router files
let routeQuotes=require('./routes/quote.routes');

//creating the object of express
const app=express();


//STEP:2 CONFIGURE SETTINGS
//view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');


//STEP:3 CONNECT TO DATABASE
//this step is moved to quote.routes.js file


//STEP:4 DEFINE MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static('./public'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('./files'));
app.use(express.static('./downloads'));

//STEP:5 DEFINE ROUTES
//default route
app.use('/',routeQuotes);

//STEP:6 START THE SERVER
app.listen(3002, function(){
    console.log("Server started on port 3002")
});