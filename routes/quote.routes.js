//for routes
const express = require('express');
//for mongodb native driver
const mongoose = require('mongoose');
//for connection string
const config = require('../config/db');
//configuring router
const router = express.Router();
//Import from quote.model.js Module
let Quote = require('../models/quote.model');

//STEP:3 CONNECT MONGODB DATABASE
//Connecting Mongoose server
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
//When Connection Open
db.once('open', function () {
    console.log('Connection open with MongoDB Server')
});
//Check for db error
db.on('error', function (err) {
    console.log('Error: ' + err.stack);
});


//route: GET/
router.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html' )
    // res.render('index');
    //res.render('welcome',{title:"Welcome"});
    res.render('index', { title: "Home" });
})

//route:POST/
router.post('/quotes', (req, res) => {
    console.log(req.body);

    let quote = new Quote();
    quote.authorName = req.body.authorName;
    quote.quoteName = req.body.quoteName;

    quote.save(function (err) {
        if (err) {
            return console.log(err.stack)
        }
        console.log('saved to database')
        res.redirect('/list-quotes');
    });
});

//GET
router.get('/list-quotes', (req, res) => {
    Quote.find(function (err, results) {
        console.log(results)
        //send HTML file populated with quotes here
        if (err) {
            console.log(err.stack);
            return
        }
        let status = true;
        if (results.length == 0)
            status = false;

        res.render('list-quotes',
            { quotes: results, title: "List Quotes", status: status })
    });
});

//DELETE
router.post('/delete-quote/:id', function (req, res) {
    let queryDelete = { _id: req.params.id };
    Quote.deleteOne(queryDelete, function (err) {
        if (err) {
            return console.log(err.stack);;
        }
        console.log('Document is Deleted');
        res.redirect('/list-quotes');
    });
});

//search and then send for update
router.get('/search-quote/:id', function (req, res) {
    let query = { _id: req.params.id };

    Quote.findById(query, function (err, quote) {
        if (err) {
            console.log(err.stack);
        }
        else {
            res.render('update-quote', {
                _id: quote._id,
                authorName: quote.authorName,
                quoteName: quote.quoteName,
                title: "Update Quote"
            });
        }
    });
});

//update
router.post('/update-quote/:id', function (req, res) {
    let queryUpdate = { _id: req.params.id };
    let quote = {};
    quote._id = req.params.id;
    // quote.authorName = req.body.authorName;
    quote.quoteName = req.body.quoteName;

    Quote.updateOne(queryUpdate,quote,function(err) {
        if (err) {
                console.log(err);
                return;
        } 
        else{
            res.redirect('/list-quotes');
        }
    });
});

//exporting all routes
module.exports = router;
