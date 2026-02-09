import express from 'express'
import AuthRoute from '../Auth/AuthRoute.js'
import TaskRoute from '../Task/TaskRoute.js'

const router = express.Router()

router.use('/auth',AuthRoute)
router.use('/task',TaskRoute)

export default router