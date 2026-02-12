import logo from './logo.svg';
import './App.css';
import { Routes,Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Task from './Pages/Task';
import TaskDetail from './Pages/TaskDeatil';
import Navbar from './Pages/Navbar';
import ProfileUpdate from './Pages/ProfileUpdate';

function App() {

  const location = useLocation()

  const hidenavbar = ['/login','/signup']

  const shouldhidenavbar = hidenavbar.includes(location.pathname)

  return (
    <div >
      { !shouldhidenavbar &&
     <Navbar></Navbar>}
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace></Navigate>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/detail/:id' element={<TaskDetail></TaskDetail>}></Route>
        <Route path='/task' element={<Task></Task>}></Route>
        <Route path='/profileupdate/:id'element={<ProfileUpdate></ProfileUpdate>}></Route>
      </Routes>
    </div>
  );
}

export default App;
