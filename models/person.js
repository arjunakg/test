var mongoose = require('mongoose')
var Schema = mongoose.Schema


var person = new Schema({
    name :{
        type: String,
        required:true
    },
    age:Number,
    phone:{
        type:Number,
        required: true,
        unique: true
    }

})

module.exports = mongoose.model('people',person ) // always export the js file 