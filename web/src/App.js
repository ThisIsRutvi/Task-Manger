import logo from './logo.svg';
import './App.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Task from './Pages/Task';
import TaskDetail from './Pages/TaskDeatil';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace></Navigate>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/detail/:id' element={<TaskDetail></TaskDetail>}></Route>
        <Route path='/task' element={<Task></Task>}></Route>
      </Routes>
    </div>
  );
}

export default App;
