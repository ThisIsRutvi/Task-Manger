import Task from "../Model/Task.js"

const AddTask = async ({ taskname, detail, startTime,endTime, userId }) => {
  return await Task.create({
    taskname,
    detail,
    startTime,
    endTime,
    user: userId
  })
}

const GetTask = async(userId)=>{
    const task = await Task.find({user:userId})
    return task
}

const GetoneTask = async(id,userId)=>{
    const task = await Task.findById({_id:id,user:userId})
    return task
}

const DeleteTask = async (id, userId) => {
  return await Task.findOneAndDelete({ _id: id, user: userId });
};


const UpdateTask = async (id, data, userId) => {
  return await Task.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { new: true }
  );
};

const TaskStatus = async (id,status,userId) =>{
    return await Task.findOneAndUpdate(
      {_id:id,user:userId},
      {status},
      {new:true}
    )
}

export default{
    AddTask,
    GetTask,
    GetoneTask,
    DeleteTask,
    UpdateTask,
    TaskStatus
}