import AuthService from "./AuthService.js"

export const SignupController = async(req,res)=>{
    try {
        const data=await AuthService.SignupService({...req.body,profilePic:req.file?req.file.filename:null})
console.log("FILE:", req.file);
console.log("BODY:", req.body);

        res.status(201).json({message:'User created',token:data.token,user:data.user})
    }catch (error) {
  console.log(error.message);
  res.status(400).json({ message: error.message });
}
}

export const LoginController = async(req,res)=>{
    try {
        const user = await AuthService.LoginService(req.body)
        res.status(200).json({message:'user loggedin',user})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getUserController = async(req,res)=>{
    try {
        const user = await AuthService.getUser(req.user.id)
        res.status(200).json({message:'user feetched',user})

    } catch (error) {
        res.status(500).json({error:error.message})

    }
}

export const UpdateUserController = async (req, res) => {
  try {
    const { uname, password } = req.body;
    const profilePic = req.file ? req.file.filename : undefined;

    const user = await AuthService.updateUser(req.user.id, { uname, password, profilePic });

    res.status(200).json({ message: 'user updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default{
    SignupController,
    LoginController,

}