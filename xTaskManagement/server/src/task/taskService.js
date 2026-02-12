import Task from "../Model/task.js"

const TaskPostService = async(title,detail)=>{
    const task = await Task.create({
        title,
        detail
    })
    return task
} 

const TaskGetService = async()=>{
    const task = await Task.find({})
    return task
}

const TaskDelService = async(id)=>{
    const task = await Task.findByIdAndDelete(id)
    return task
}

const TaskPutservice = async(id,data)=>{
    const task = await Task.findByIdAndUpdate(id,data,{new:true})
    return task
}

export default{
    TaskPostService,
    TaskGetService,
    TaskDelService,
    TaskPutservice
}