//In Case of Mongoose library we have to create Schema or Structure

//STEP1: IMPORT MONGOOSE MODULE
var mongoose = require('mongoose');

//STEP2: CREATE SCHEMA OBJECT
const Schema = mongoose.Schema;

//STEP3: CREATE OUR SCHEMA WITH OPTIONALLY ADDING VALIDATIONS like min, enum, validate , required, default for default value
let Quote = new Schema({
    authorName:{
        type: String,
        //required:true
    },
    quoteName:{
        type:String,
        // required:true
    },
},{collection: 'quotes'});

//STEP4: EXPORT SCHEMA
module.exports=mongoose.model('Quotes', Quote);