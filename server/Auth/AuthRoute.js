import express from 'express'
import {SignupController,LoginController, getUserController, UpdateUserController} from './AuthController.js'
import upload from '../Filehandler/FileHandler.js'
import { auth } from '../Middleware/AuthMiddleware.js'

const router = express.Router()

router.post('/signup',upload.single('ProfilePic'),SignupController)
router.post('/login',LoginController)
router.get('/getuser',auth ,getUserController)
router.put('/updateuser',auth, upload.single("profilePic"),UpdateUserController)

export default router