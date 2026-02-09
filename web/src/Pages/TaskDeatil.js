import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function TaskDetail(){
  
  const [task,setTask] = useState({
    taskname:'',
    detail:'',
    startTime:'',
    endTime:''
  })   
 const [editId,setEditId] = useState(false)
 const{id}=useParams()
 
 const handlechange =(e)=>{
    setTask({...task,[e.target.name]:e.target.value})
 }

 const token = localStorage.getItem('token')

 useEffect(()=>{
 const fetchtask = async()=>{
    const res = await axios.get(`http://localhost:4000/api/task/gettask/${id}`,{
      headers:{
         Authorization:`Bearer ${token}`
      }
    })
    setTask(res.data)
 }
fetchtask()
 },[id])

 const handleUpdate=async(id)=>{
    await axios.put(`http://localhost:4000/api/task/updatetask/${id}`,task,{
      headers:{
         Authorization:`Breare ${token}`
      }
    })
    setEditId(false)
}
   
   return(
   <div className="flex" >
      <h2>your task</h2>
      
       {editId? (<><input type='text' name="taskname" value={task.taskname} onChange={handlechange}></input>
       
      <input type='text' name="detail" value={task.detail} onChange={handlechange}></input>
       <input type='text' name="startTime" value={task.startTime} onChange={handlechange}></input>
      <input type='text' name="endTime" value={task.endTime} onChange={handlechange}></input>
      <button onClick={()=>handleUpdate(id)}> update</button>
      </>
    )
      :(<>
       <p>{task.taskname}</p>
       <p>{task.detail}</p>
       <p>{task.startTime}</p>
       <p>{task.endTime}</p>
       <button onClick={()=>setEditId(true)}>Edit</button></>)
       }

   </div>)
}
export default TaskDetail