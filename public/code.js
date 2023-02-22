let taskInput = document.querySelector("#task")
let addTaskBtn = document.querySelector("#add-task")
let taskDetailsDiv = document.querySelector(".task-details")
let toast = document.querySelector(".toast")
let editInput = document.querySelector("#edit-task")
let editBtn = document.querySelector("#edit-task-btn")
let form = document.querySelector(".form")
let editForm = document.querySelector(".edit")

let taskToEdit

async function addChecked(task){
    // /api/task/checked/id
    let taskId = task.id
    let updatedTask = await axios.put(`/api/task/checked/${taskId}` , {checked:true})
    console.log(updatedTask)
    // let checked = updatedTask.data.task.checked

    window.location.href = "/"
}


async function removeChecked(task){
    let taskId = task.id
    let updatedTask = await axios.put(`/api/task/checked/${taskId}` , {checked:false})
    console.log(updatedTask)
    // let checked = updatedTask.data.task.checked
    window.location.href = "/"
}

function updateTask(task){
    form.classList.add("hide")
    editForm.classList.remove("hide")
    taskToEdit = task
}

editBtn.addEventListener("click" ,async () => {
    if(!editInput.value) return
    console.log(taskToEdit)
    let taskId = taskToEdit.id

    let messageObj = await axios.put(`/api/task/${taskId}` , {newTask:editInput.value})

    form.classList.remove("hide")
    editForm.classList.add("hide")
    
    let message = messageObj.data.msg

    toast.innerText = message

    toast.style.animation = "show 2s ease-in-out"

    setTimeout(() => {
        toast.style.animation = "hide 2s ease-in-out"
        window.location.href = "/"
    } , 2000)

})

async function deleteTask(task){
    
    let messageObj = await axios.delete(`/api/task/${task.id}`)
    let message = messageObj.data.msg
    toast.innerText = message

    toast.style.animation = "show 2s ease-in-out"

    setTimeout(() => {
        toast.style.animation = "hide 2s ease-in-out"
        window.location.href = "/"
    } , 2000)

   
}

const getAllTasks = async () => {
    let tasks = await axios.get("/api/task")
    console.log(tasks)

    tasks.data.tasks.forEach(task => {
        let taskAddedDiv = document.createElement("div")
        taskAddedDiv.classList.add("task-added")
        taskAddedDiv.innerHTML = `
        <span id="${task._id}" style="text-decoration:${task.checked ? "line-through" : "none"}" onclick="addChecked(this)" ondblclick="removeChecked(this)">${task.task}</span>
        <div class="task-tools">
        <i id="${task._id}" onclick="updateTask(this)" class="fa-solid fa-pen-to-square edit"></i>
        <i id="${task._id}" onclick="deleteTask(this)" class="fa-solid fa-trash"></i>
        </div>
        `

        taskDetailsDiv.appendChild(taskAddedDiv)
    })
   
}



window.onload = getAllTasks

const addTask = async () => {
    if(!taskInput.value) return
    let taskObj = await axios.post("/api/task/add" , {task:taskInput.value})
    console.log(taskObj)
    window.location.href = "/"
}

addTaskBtn.addEventListener("click" , () => {
    addTask()
})