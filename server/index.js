import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './Route/route.js'

dotenv.config()

const port = 4000
const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('mogodb got connected'))
.catch((err)=>console.log(err))

app.use('/api',router)

app.listen(port,((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`server is running on ${port}`)
    }
}))