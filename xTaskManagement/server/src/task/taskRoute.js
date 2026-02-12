import express from 'express'
import taskController from './taskController.js'

const router = express.Router()

router.post('/posttask',taskController.postTaskController)
router.get('/gettask',taskController.getTaskController)
router.delete('/deltask/:id',taskController.delTaskController)
router.put('/updtask/:id',taskController.putTaskController)

export default router