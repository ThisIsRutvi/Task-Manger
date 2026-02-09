import express from 'express'
import AuthController from './AuthController.js'

const router = express.Router()

router.post('/signup',AuthController.SignupController)
router.post('/login',AuthController.LoginController)

export default router