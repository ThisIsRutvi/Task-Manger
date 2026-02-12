import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import UploadArea from '../Assests/profileee.jpg'

function Signup(){
    const[Signup,setSignup] = useState({
        uname:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const[File,setFile] = useState(null)
 

    const navigate = useNavigate()
    const handleChange=(e)=>{
      setSignup({...Signup,[e.target.name]:e.target.value})
    }

    const handleSubmit=async()=>{
        try {
           if (Signup.password !== Signup.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
               const Formdata = new FormData()
Formdata.append('ProfilePic', File)
Formdata.append('uname', Signup.uname)
Formdata.append('email', Signup.email)
Formdata.append('password', Signup.password)
            const res = await axios.post('http://localhost:4000/api/auth/signup',Formdata,{
              
            })
            localStorage.setItem('token', res.data.token);
localStorage.setItem('user', JSON.stringify(res.data.user));

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

    const handlefile = (e) =>{
        const file = e.target.files[0]
        if(file){
            setFile(file)
        }
    }

  return(
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
  <div className="w-[400px] rounded-3xl bg-gray-50 px-6 py-6 shadow-2xl">
    
    <h2 className="mb-6 text-2xl font-semibold text-slate-900 text-center">
      Signup
    </h2>

    <div className="mb-6 flex justify-center">
      <label htmlFor="imgg" className="cursor-pointer">
        
        <img
          src={File?URL.createObjectURL(File):UploadArea}
          className="h-[90px] w-[90px] rounded-full object-cover"
          alt="upload"
        />
      </label>
      <input type="file" id="imgg" name="ProfilePic" onChange={handlefile} hidden />
    </div>

    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Name"
        name="uname"
        className="h-9 w-full max-w-[310px] rounded-md border border-gray-300 px-2 focus:border-emerald-500 focus:outline-none"
        value={Signup.uname}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Email"
        name="email"
        className="h-9 w-full max-w-[310px] rounded-md border border-gray-300 px-2 focus:border-emerald-500 focus:outline-none"
        value={Signup.email}
        onChange={handleChange}
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        className="h-9 w-full max-w-[310px] rounded-md border border-gray-300 px-2 focus:border-emerald-500 focus:outline-none"
        value={Signup.password}
        onChange={handleChange}
      />

        <input
        type="password"
        placeholder="Confirm Password"
        name="confirmpassword"
        className="h-9 w-full max-w-[310px] rounded-md border border-gray-300 px-2 focus:border-emerald-500 focus:outline-none"
        value={Signup.confirmpassword}
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="h-9 w-full max-w-[310px] rounded-md bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
      >
        Signup
      </button>
    </div>

    <p className="mt-6 text-center text-sm">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 hover:underline">
        Login
      </Link>
    </p>
  </div>
</div>

  )
}
export default Signup