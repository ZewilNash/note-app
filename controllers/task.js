const Task = require("../models/task")

const addTask = (req, res) => {
    let { task } = req.body
    if (!task || task.length === 0) {
        return res.status(404).json({ success: false, msg: "Please Add A Task" })
    }

    let newTask = {
        task: task
    }

    const taskData = new Task(newTask)
    taskData.save()

    res.status(200).json({ success: true, task: taskData })
}

const getAllTasks = async (req, res) => {
    const tasks = await Task.find({})

    res.status(200).json({ success: true, tasks: tasks })
}

const deleteTask = async (req, res) => {
    let { id } = req.params
    let element = await Task.deleteOne({ _id: id })
    console.log(element)
    res.status(200).json({ success: true, msg: `Task has been deleted Successfully` })

}

const updateTask = async (req, res) => {
    let { id } = req.params
    let { newTask } = req.body
    let data = await Task.findByIdAndUpdate({ _id: id }, { task: newTask }, {
        new: true,
        upsert: true
    })
    console.log(data)

    res.status(200).json({success:true , msg:"Task Updated Successfully"})
}


const addChecked = async (req , res) => {
    let {checked} = req.body
    let {id} = req.params

    let data = await Task.findByIdAndUpdate({ _id: id }, { checked: checked }, {
        new: true,
        upsert: true
    })

    res.status(200).json({success:true , msg:"Task checked Successfully" , task:data})
}

module.exports = { addTask, getAllTasks, deleteTask, updateTask  , addChecked}