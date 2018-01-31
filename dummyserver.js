var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express();
var config = require('./config/config.json')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
var person = require('./models/person')
mongoose.connect(config.MONGO, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Database connected')
    }
})



// var abc = new person({
//     name: "Arjun",
//     age: 24,
//     phone: 7894561230
// })
// abc.save((err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('New Data Created');
//         console.log(data)
//     }
// })
// person.find({}, (err, data) => {
//     if (err) throw err
//     console.log(data)
// })

app.post('/add', (req, res) => {
    if (!req.body.name || !req.body.age || !req.body.phone) {
        res.json({
            success: false,
            msg: "All data no entered"
        })
    } else {
        person.findOne({ phone: req.body.phone }, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Database error"
                })
            } else if (data != null || data) {
                res.json({
                    success: false,
                    msg: "User already present. Please use a different phone no"
                })
            } else {
                var newPerson = new person({
                    name: req.body.name,
                    age: req.body.age
                })
                newPerson.phone = req.body.phone
                newPerson.save((err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Database error"
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "New data created"
                        })
                    }
                })
            }
        })


    }
})
app.get('/getdata',(req,res)=>{
    person.find({},(err,data)=>{
        if(err){
            res.json({
               success:false,
               msg:'somthing went wrong'

            })
        
        }
        else{
            res.json({
                success:true,
                data: data
                
            })
        }
    })

})
app.put('/update',(req,res)=>{
    if(!req.body.name || !req.body.phone || !req.body.age || !req.body.id){
        res.json({
            success:false,
            msg:'all data not entered '
        })

    }
    else{
        person.findOneAndUpdate({_id:req.body.id},{$set:{name:req.body.name, phone:req.body.phone, age : req.body.age}},(err,data)=>{
            if(err){
                res.json({
                    success:false,
                    msg:'unable to update'
                })
            }
            else{
                res.json({
                    success:true,
                    msg:'data updated'
                })
            }
        })

    }

})
//app.delete()
app.listen(config.PORT, () => {
    console.log("Server started at PORT " + config.PORT)
})