import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uname:{
        type:String,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
    }
},
{
    timestamps:true
}
)

const User = mongoose.model('User',UserSchema)
export default User