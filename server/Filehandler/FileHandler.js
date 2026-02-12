import multer from 'multer'
import express from 'express'

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'upload/')
    },
    filename:(req,file,cb)=>{
            const originalname = file.originalname.split(' ').join('_')

        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.mimetype.split("/")[1]
        cb(null,`profile_${originalname}_${uniqueName}.${ext}`)
    }
})

const FileFilter = (req,file,cb)=>{
    const fname = file.originalname.toLowerCase()

    if(fname.endswith('.jpg')||fname.endswith('.jpeg')||fname.endswith('.png')){
        cb(null,true)
    }
    else{
        cb(new Error("Only JPG, JPEG, or PNG files allowed"), false);
    }
}

const upload = multer({
    storage,
    limits:{fileSize:5*1024*1024},
    FileFilter
})




export default upload