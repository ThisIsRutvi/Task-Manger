import express from 'express'
import TaskController from './TaskController.js'
import { auth } from '../Middleware/AuthMiddleware.js'

const router = express.Router()

router.post('/addtask',auth,TaskController.AddTaskController)
router.get('/gettask',auth,TaskController.GetTaskController)
router.get('/gettask/:id',auth,TaskController.GetoneTaskController)
router.put('/updatetask/:id',auth,TaskController.UpdateTaskController)
router.delete('/deleteTask/:id',auth,TaskController.deletetaskController)
router.patch("/:id/status", auth, TaskController.TaskStatusController)

export default router