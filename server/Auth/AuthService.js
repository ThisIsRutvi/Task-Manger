import User from "../Model/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SignupService = async({uname,email,password,profilePic})=>{

    const user = await User.findOne({email})

    if(user){
        throw new Error('user aready exists.')
    }

    const hashed= await bcrypt.hash(password,10)

    const newuser = await User.create({
    uname,
    email,
    password:hashed,
    profilePic
})

  const token= jwt.sign(
    {id:newuser._id,
    email:newuser.email},
    process.env.JWT_SECRET,
    {expiresIn:'1d'}
   )

    return {
        token,
        user: {
            id: newuser._id,
            uname: newuser.uname,
            email: newuser.email,
            profilePic: newuser.profilePic
        }
    };
}

const LoginService = async({email,password})=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error('User does not exists')
    }

    const ismatch = await bcrypt.compare(password,user.password)

    if(!ismatch){
        throw new Error('invalid credentails')
    }

    const token= jwt.sign(
        {id:user._id,
        email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
   )

   return({
    token,
        user:{
            id:user._id,
            email:user.email,
                profilePic: user.profilePic
        }
    }
   )
}

const getUser = async(id)=>{
    const user = await User.findById({_id:id})
    return user
}

const updateUser = async (id, data) => {
  const updates = {};

  if (data.profilePic) {
    updates.profilePic = data.profilePic; // now this comes from req.file.filename
  }
  if (data.uname) updates.uname = data.uname;
  if (data.password) updates.password = await bcrypt.hash(data.password, 10);

  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  return user;
};


export default {
    SignupService,
    LoginService,
    getUser,
    updateUser
}