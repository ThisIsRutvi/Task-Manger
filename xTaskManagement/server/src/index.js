import express from 'express'
import mongoose from 'mongoose'
import router from './Route/Router.js'
import cors from 'cors'

const app = express()
const port = 4000

app.use(express.json())
app.use(cors())
mongoose.connect('mongodb://localhost:27017/taskk')
.then(console.log('connected'))
.catch((err)=>console.log(err))

app.use('/api',router)

app.listen(port,(err)=>{
    if(err){
        console.log('there is an error')
    }
    else{
        console.log(`server is running on ${port}`)
    }
})