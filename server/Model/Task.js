import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    taskname:{
        type:String,
    },
    detail:{
        type:String,
    },
    startTime:{
        type:String,
    },
    endTime:{
        type:String,
    },
    status:{
        type:String,
        enum:["pending","in-progress","done"],
        default:"pending"
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
},
{
    timestamps:true
}
)

const Task = mongoose.model('Task',TaskSchema)
export default Task