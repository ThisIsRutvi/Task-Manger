import TaskService from "./TaskService.js"

const AddTaskController = async (req, res) => {
  try {
    const task = await TaskService.AddTask({
      taskname: req.body.taskname,
      detail: req.body.detail,
      startTime: req.body.startTime,
      endTime:req.body.endTime,
      userId: req.user.id
    })

    res.status(201).json({
      message: 'Task created',
      task
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const GetTaskController = async(req,res)=>{
    try {
        const task = await TaskService.GetTask(req.user.id)

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const GetoneTaskController = async(req,res)=>{
    try {
        const task = await TaskService.GetoneTask(req.params.id,req.user.id)

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const UpdateTaskController = async (req, res) => {
  try {
    const task = await TaskService.UpdateTask(req.params.id, req.body,req.user.id)
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deletetaskController = async(req,res)=>{
    try {
        const task = await TaskService.DeleteTask(req.params.id,req.user.id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const TaskStatusController=async(req,res)=>{
  try {
    const {status} = req.body
    const {id } = req.params

    if(!["pendding","in-progress","done"].includes(status)){
      return res.status(400).json({message:"invalid status"})
    }
    const task = await TaskService.TaskStatus(id,status,req.user.id)
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

export default {
    AddTaskController,
    GetTaskController,
    GetoneTaskController,
    UpdateTaskController,
    deletetaskController,
    TaskStatusController
}