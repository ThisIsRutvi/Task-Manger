import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type:String
    },
    detail:{
        type:String
    }
})

const Task = mongoose.model('Task',TaskSchema)

export default Task