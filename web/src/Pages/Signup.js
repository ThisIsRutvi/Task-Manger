import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

function Signup(){
    const[Signup,setSignup] = useState({
        uname:'',
        email:'',
        password:''
    })

    const navigate = useNavigate()
    const handleChange=(e)=>{
      setSignup({...Signup,[e.target.name]:e.target.value})
    }

    const handleSubmit=async()=>{
        try {
            const res = await axios.post('http://localhost:4000/api/auth/signup',Signup)
            localStorage.setItem('token', res.data.token);
            console.log('token',res.data.token)
            setSignup(
                {
                    uname:'',
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
        <h2 className="m-5 text-2xl font-semibold text-slate-900">Signup</h2>
        <input type="text" placeholder="Name" name="uname" className="m-5 h-7 w-[310px] border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500" value={Signup.uname} onChange={handleChange}></input><br></br>
        <input type="text" placeholder="Email" name="email" className="m-5 h-7 w-[310px] border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500" value={Signup.email} onChange={handleChange}></input><br></br>
        <input type="text" placeholder="Password" name="password" className="m-5 h-7 w-[310px] border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500" value={Signup.password} onChange={handleChange}></input><br></br>
        <button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 m-5 w-[310px] h-7 shadow-lg text-white">Signup</button><br></br>
        <p className="m-5">Already Have an account?<Link to='/login' className="text-blue-600 hover:underline">Login</Link></p>
    </div>
    </div>
  )
}
export default Signup