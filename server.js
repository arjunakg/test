

var mongoose = require('mongoose')

var express = require('express')
var bodyparser = require('body-parser')
var app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

var config = require('./config/config.json')
var person = require('./models/person')

mongoose.connect(config.MONGO, (err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('Database Connected')
    }
})


var abc = new person({
    name : "arjun",
    age:25,
    phone: 9990023837
})
abc.save((err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('New Data created')
        console.log(data)
    }
})

// app.listen(4000, ()=>{
//     console.log("Server started at port 4000")
// })

app.listen(config.PORT,()=>{
    console.log('server started at '+ config.PORT)
})