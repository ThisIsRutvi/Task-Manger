import AuthService from "./AuthService.js"

const SignupController = async(req,res)=>{
    try {
        const data=await AuthService.SignupService(req.body)

        res.status(201).json({message:'User created',token:data.token,user:data.user})
    }catch (error) {
  console.log(error.message);
  res.status(400).json({ message: error.message });
}



}

const LoginController = async(req,res)=>{
    try {
        const user = await AuthService.LoginService(req.body)
        res.status(200).json({message:'user loggedin',user})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export default{
    SignupController,
    LoginController
}