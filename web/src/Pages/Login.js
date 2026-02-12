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
            console.log("LOGIN RESPONSE USER:", res.data.user)

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
  <div className="w-[400px] rounded-3xl bg-gray-50 px-6 py-6 shadow-2xl">

    <h1 className="mb-6 text-center text-2xl font-semibold text-slate-900">
      Login
    </h1>

    <div className="flex flex-col items-center gap-4">
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={login.email}
        onChange={handleChange}
        className="h-9 w-full max-w-[310px] rounded-md border border-gray-300 px-2 focus:border-emerald-500 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={login.password}
        onChange={handleChange}
        className="h-9 w-full max-w-[310px] rounded-md border border-gray-300 px-2 focus:border-emerald-500 focus:outline-none"
      />

      <button
        onClick={handleSubmit}
        className="h-9 w-full max-w-[310px] rounded-md bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
      >
        Login
      </button>
    </div>

    <p className="mt-6 text-center text-sm">
      Don&apos;t have an account?{" "}
      <Link to="/signup" className="text-blue-600 hover:underline">
        Signup
      </Link>
    </p>

  </div>
</div>

  )
}
export default Login