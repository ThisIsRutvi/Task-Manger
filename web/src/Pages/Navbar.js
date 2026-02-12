import TaskFlow from '../Assests/TaskFlow.webp'
import { useNavigate } from 'react-router-dom'
import DefaultAvatar from'../Assests/profilee.jpg'


function Navbar(){

    const navigate = useNavigate()

      const user = JSON.parse(localStorage.getItem("user"))

    const logout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }
    return(
        <div className="flex justify-between items-center bg-white shadow-md px-6 py-3">
      {/* Logo */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
        <img src={TaskFlow} alt="logo" className="h-14 w-14 object-contain" />
        <p className="text-2xl font-bold text-blue-950 tracking-tight">TaskFlow</p>
      </div>

      {/* Profile + Logout */}
      <div className="flex items-center space-x-6">
        <img
          onClick={() => user && navigate(`/profileupdate/${user?._id}`)}
          src={user?.profilePic ? `http://localhost:4000/uploads/${user.profilePic}` : DefaultAvatar}
          alt="profile"
          className="h-12 w-12 rounded-full border-2 border-blue-600 cursor-pointer hover:scale-105 transition-transform duration-200"
        />
        <button
          onClick={logout}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
    )
}

export default Navbar