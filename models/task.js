const mongoose = require("mongoose")


const taskSchema =  new mongoose.Schema({
    task:{
        type:String,
        unique: true
    },
    checked:{
        type:Boolean
    }
})



module.exports = mongoose.model("Task" , taskSchema)