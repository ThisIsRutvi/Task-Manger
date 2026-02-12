import express from 'express'
import taskrouter from '../task/taskRoute.js'

const router= express.Router()

router.use('/task',taskrouter)

export default router