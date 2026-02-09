import { useState } from "react"
import axios from 'axios'
import { Link,useNavigate } from "react-router-dom"

function Login(){
    const[login,setlogin] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()

    const handleChange=(e)=>{
      setlogin({...login,[e.target.name]:e.target.value})
    }

    const handleSubmit=async()=>{
        try {
            const res = await axios.post('http://localhost:4000/api/auth/login',login)

            localStorage.setItem('token', res.data.user.token);
            console.log('Token:', res.data.user.token); 

            setlogin(
                {
                    email:'',
                    password:''
                }
            )
                        navigate('/task')

        } catch (error) {
            console.log(error)
        }
    }

  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
        <div className="bg-gray-50 py-2 px-4 rounded-3xl w-[400px] shadow-2xl">
         <h1 className="m-5 text-2xl font-semibold text-slate-900">Login</h1>
        <input type="text" className="m-5 h-7 w-[310px] border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500" placeholder="Email" name="email" value={login.email} onChange={handleChange}></input><br></br>
        <input type="text" className="m-5 h-7 w-[310px] border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500" placeholder="Password" name="password" value={login.password} onChange={handleChange}></input><br></br>
        <button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 m-5 w-[310px] h-7 shadow-lg text-white">Login</button><br></br>
        <p className="m-5">Don't Have an account?<Link to='/signup' className="text-blue-600 hover:underline">Signup</Link></p>
        </div>
    </div>
  )
}
export default Login