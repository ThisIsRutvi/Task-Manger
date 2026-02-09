import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import '../css/Task.css'
function Task(){

    const[getTask,setGettask] = useState([])
    const navigate = useNavigate()
    const[task,settask] = useState({
        taskname:'',
        detail:'',
        startTime:'',
        endTime:''
   })
   const{id} = useParams()
    const token = localStorage.getItem('token')
    console.log(token)
       const handlechange =(e)=>{
        settask({...task,[e.target.name]:e.target.value})
       }
    
       const handleSubmit=async()=>{
        try {
            await axios.post('http://localhost:4000/api/task/addtask',task, {
            headers: { Authorization: `Bearer ${token}` }
        })
            settask({
                 taskname:'',
                 detail:'',
                 duration:''
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
    return(
    <div className="min-h-screen grid grid-cols-2">
        <div className="flex justify-center items-start pt-20">
      <div className="bg-gray-50 py-2 px-4 rounded-3xl w-[400px] shadow-2xl">
          <h2 className="text-2xl font-semibold text-slate-900 pt-7 m-5">Add new Task</h2>
      <input type='text' name="taskname" placeholder="taskname" className="border-2 border-gray-500 focus:outline-none focus:border-gray-600 m-5 w-[310px] h-7 rounded-md" value={task.taskname} onChange={handlechange}></input><br></br>
      <input type='text' name="detail" placeholder="detail" className="border-2 border-gray-500 focus:outline-none focus:border-gray-600 m-5 w-[310px] h-7 rounded-md" value={task.detail} onChange={handlechange}></input><br></br>
      <input type='time' name="startTime" placeholder="startTime" className="border-2 border-gray-500 focus:outline-none focus:border-gray-600 m-5 w-[310px] h-7  rounded-md" value={task.duration} onChange={handlechange}></input><br></br>
      <input type='time' name="endTime" placeholder="endTime" className="border-2 border-gray-500 focus:outline-none focus:border-gray-600 m-5 w-[310px] h-7  rounded-md" value={task.duration} onChange={handlechange}></input><br></br>
      <button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 m-5 w-[310px] h-7 shadow-lg text-white"> Add Task</button>
     </div>
     </div>
   <div className="gap-8 bg-green-200 p-6">
      <h2 className="text-3xl font-semibold text-center pb-5">your task</h2>
        <ul className="flex flex-col items-center space-y-4 ">
        {
            getTask.map((item)=>(
             <li key={item._id} className="bg-white p-7 rounded-xl w-full flex items-center justify-between" >
                <div className="flex items-center space-x-2"><span>{item.taskname}</span><p className="text-sm text-gray-500">Task</p></div>
                <div>
                <button onClick={()=>navigate(`/detail/${item._id}`)} className="bg-emerald-600 text-white p-1 rounded-lg mx-2">View</button>
                <button onClick={()=>handledelte(item._id)} className="bg-emerald-600 text-white p-1 rounded-lg">delete</button>
                </div>
                </li>
            ))
        }
        </ul>
        </div>
        </div>
    )
}

export default Task