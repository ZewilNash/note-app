const express = require("express")
const {addTask , getAllTasks , deleteTask , updateTask , addChecked} = require("../controllers/task")
const router = express.Router()

router.post("/add", addTask)
router.get("/" , getAllTasks)
router.delete("/:id" , deleteTask)
router.put("/:id" , updateTask)
router.put("/checked/:id" , addChecked)

module.exports = router