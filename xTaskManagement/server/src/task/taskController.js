import taskService from "./taskService.js"

const postTaskController = async(req,res)=>{
    try {
        const{title,detail} = req.body
        const task = await taskService.TaskPostService(title,detail)

        res.status(200).json({message:'succesfull',task})

    } catch (error) {
        res.status(500).json({message:'failed'})
    }
}

const getTaskController = async(req,res)=>{
    try {
        const task = await taskService.TaskGetService()
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message:'failed'})
    }
}

const delTaskController = async(req,res)=>{
    try {
        const id= req.params.id
        const task = await taskService.TaskDelService(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message:'failed'})
    }
}

const putTaskController = async(req,res)=>{
    try {
        const id = req.params.id
        const task = await taskService.TaskPutservice(id,req.body)

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message:'failed'})
    }
}

export default {
    postTaskController,
    getTaskController,
    delTaskController,
    putTaskController
}