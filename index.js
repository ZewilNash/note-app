const express = require("express")
const taskRouter = require("./routes/task")
const mongoose = require("mongoose")
const app = express()

//mongodb+srv://admin:ZDUfJfNo8rXCWWBT@cluster0.zkedy.mongodb.net/tasks?retryWrites=true&w=majority

//for parse static urls 
app.use(express.static("./public"))
//for parsing json data
app.use(express.json())
//for parse body data
app.use(express.urlencoded({extended:false}))

app.use("/api/task" , taskRouter)

//connect to mongoose
mongoose.connect("mongodb+srv://admin:ZDUfJfNo8rXCWWBT@cluster0.zkedy.mongodb.net/tasks?retryWrites=true&w=majority")
.then(() => console.log("connected"))

app.listen(5000 , (req , res) =>  console.log("Server is up and running"))