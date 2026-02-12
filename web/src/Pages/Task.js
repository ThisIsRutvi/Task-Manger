import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import '../css/Task.css'
import Navbar from "./Navbar"

function Task(){

    const[getTask,setGettask] = useState([])
    const navigate = useNavigate()
    const[task,settask] = useState({
        taskname:'',
        detail:'',
        startTime:'',
        endTime:''
   })
   const[isOpen,setIsOpen] = useState(null)
   const [isEdit,setIsEdit] = useState(null)
   const [editTask, setEditTask] = useState({
  taskname: '',
  detail: '',
  startTime: '',
  endTime: ''
  })

   const{id} = useParams()
    const token = localStorage.getItem('token')

    const getDuration =(start,end)=>{
        const startTime = new Date(`1970-01-01T${start}`)
        const endTime = new Date(`1970-01-01T${end}`)
        const diff = endTime - startTime
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m (${start} - ${end})`;
    }

      const handlechange =(e)=>{
        settask({...task,[e.target.name]:e.target.value})
       }
    
       const handleSubmit=async()=>{
        try {
            if(task.endTime && task.startTime && task.endTime < task.startTime) {
    alert("End time cannot be earlier than start time");
    return;}
            await axios.post('http://localhost:4000/api/task/addtask',task, {
            headers: { Authorization: `Bearer ${token}` }
        })
            settask({
                 taskname:'',
                 detail:'',
                 startTime:'',
                 endTime:'',
            })

            fetchTask()
    
        } catch (error) {
            console.log(error)
        }
       }

   const fetchTask=async()=>{
        const res = await axios.get('http://localhost:4000/api/task/gettask',{
            headers: { Authorization: `Bearer ${token}` }
        })
        setGettask(res.data)
   }

     useEffect(()=>{
        fetchTask()
   },[])


   const handledelte=async(id)=>{
    await axios.delete(`http://localhost:4000/api/task/deleteTask/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    fetchTask()
   }

   const handleStart = async (item) => {
  try {
    await axios.patch(`http://localhost:4000/api/task/${item._id}/status`, 
      { status: "in-progress" }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('started')
    fetchTask(); 
  } catch (error) {
    console.log(error);
  }
  };

    const handleDone = async (item) => {
  try {
    await axios.patch(`http://localhost:4000/api/task/${item._id}/status`, 
      { status: "done" }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('done')
    fetchTask(); 
  } catch (error) {
    console.log(error);
  }
  };

   const handleUpdate=async(id)=>{
      await axios.put(`http://localhost:4000/api/task/updatetask/${id}`,editTask,{
        headers:{
           Authorization:`Breare ${token}`
        }
      })
      setIsEdit(false)

      fetchTask()
  }

    return(
    <div className="min-h-screen grid grid-cols-2">
        <div className="flex justify-center items-start pt-20">
      <div className="bg-gray-50 py-2 px-4 rounded-3xl w-[400px] shadow-2xl">
          <h2 className="text-2xl font-semibold text-slate-900 pt-7 m-5">Add Task</h2>
      <input type='text' name="taskname" placeholder="taskname" className="border-2 border-gray-500 focus:outline-none focus:border-gray-600 m-5 w-[310px] h-7 rounded-md" value={task.taskname} onChange={handlechange}></input><br></br>
      <input type='text' name="detail" placeholder="detail" className="border-2 border-gray-500 focus:outline-none focus:border-gray-600 m-5 w-[310px] h-7 rounded-md" value={task.detail} onChange={handlechange}></input><br></br>
      <label className="m-5 text-gray-600 text-sm">Start Time</label>
      <input type='time' name="startTime" placeholder="startTime" className="border-2 border-gray-500 focus:outline-none focus:border-gray-600 mb-5 ml-5 w-[310px] h-7  rounded-md" value={task.startTime} onChange={handlechange}></input><br></br>
            <label className="m-5 text-gray-600 text-sm">End Time</label>
      <input type='time' name="endTime" placeholder="endTime" className="border-2 border-gray-500 focus:outline-none focus:border-gray-600 mb-5 ml-5 w-[310px] h-7  rounded-md" value={task.endTime} onChange={handlechange}></input><br></br>      
      <button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 m-5 w-[310px] h-7 shadow-lg text-white"> Add Task</button>
     </div>
     </div>
   <div className="gap-8 bg-green-200 p-6">
      <h2 className="text-3xl font-semibold text-center pb-5">Task</h2>
        <ul className="flex flex-col items-center justify-between">
        {
            getTask.map((item)=>(
             <li key={item._id} className="bg-white p-7 rounded-xl w-full max-w-md shadow-2xl m-4" >
                <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2"><span>{item.taskname}</span><p className="text-sm text-gray-500">Task</p></div>
                <div className="flex">
                <button onClick={()=>setIsOpen(isOpen===item._id?null:item._id)} className="bg-emerald-600 text-white p-1 rounded-lg mx-2">View</button> 
                <button onClick={()=>handledelte(item._id)} className="bg-emerald-600 text-white p-1 rounded-lg">delete</button>
                </div>
</div>
                 {isOpen === item._id && (
  <div className="mt-4 text-sm text-gray-700 space-y-2">
    {isEdit === item._id ? (
      <>
        <input
          type="text"
          value={editTask.taskname}
          onChange={(e) =>
            setEditTask({ ...editTask, taskname: e.target.value })
          }
          className="border w-full p-1 rounded"
        />

        <input
          type="text"
          value={editTask.detail}
          onChange={(e) =>
            setEditTask({ ...editTask, detail: e.target.value })
          }
          className="border w-full p-1 rounded"
        />

        <input
          type="time"
          value={editTask.startTime}
          onChange={(e) =>
            setEditTask({ ...editTask, startTime: e.target.value })
          }
          className="border w-full p-1 rounded"
        />

        <input
          type="time"
          value={editTask.endTime}
          onChange={(e) =>
            setEditTask({ ...editTask, endTime: e.target.value })
          }
          className="border w-full p-1 rounded"
        />

        <div className="flex gap-2">
          <button
            onClick={() => handleUpdate(item._id)}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEdit(null)}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </>
    ) : (
      <>
        <p><strong>Detail:</strong> {item.detail}</p>
        <p><strong>Start:</strong> {item.startTime}</p>
        <p><strong>End:</strong> {item.endTime}</p>
        <p><strong>Status:</strong> {item.status}</p>
        <p><strong>Duration:</strong> {getDuration(item.startTime, item.endTime)}</p>

        <div className="flex gap-2 mt-3">
          {item.status === "pending" && (
            <button
              onClick={() => handleStart(item)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Start
            </button>
          )}
          {item.status === "in-progress" && (
            <button
              onClick={() => handleDone(item)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Done
            </button>
          )}
          {item.status !== "done" &&(
          <button 
  onClick={() => {
    setIsEdit(item._id)
    setEditTask({
      taskname: item.taskname,
      detail: item.detail,
      startTime: item.startTime,
      endTime: item.endTime
    })
  }}

  className="bg-yellow-500 text-white px-3 py-1 rounded"
>
  Edit
</button>
          )}

        </div>
      </>
    )}
  </div>
)}

{item.status ==="done"&&
<span className="text-green-700 font-semibold">Completed</span>
}
      </li>
            ))
        }
        </ul>

        </div>
        </div>
    )
}

export default Task