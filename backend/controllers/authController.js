const User = require("../model/User")

const bcrypt =  require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")

const genetateToken =(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'7d'})
 }
const registerUser = async(req , res)=>{
 
   const {name,email,password}=req.body

   try {
      const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({message: 'User already exists'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
     const otp = Math.floor(100000 + Math.random()* 900000).toString()
    const user = await User.create({name , email , password: hashedPassword, otp})
    if(user){
        const message = ` 
        welcome to ShopNest, ${name}!thankyou for registering with us.we are excited to have you as part of our community.to complete your registration please use the one time password(OTP).Your OTP for ShopNest registration is: ${otp}`;
        // we will import the send mail function in utils and then import it
        await sendEmail(email, 'welcome tpo ShopNest-your OTP registration' , message)
        res.status(201).json({
            _id: user._id, 
            name: user.name,
            email: user.email,
            role: user.role,
            token: genetateToken(user._id)
         })

    // TODOS : HASH THE PASSWORFD BEFORE SAVING TO THE DATABASE
    // TODOS: Implementing JWT TOKEN generation for authentication
    // TODOS: OTP sending and varification for email confirmation
    // TODOS: Implement password reset functionality
    // TODO  WElcome mail to user 
   }
else{
    res.status(400).json({message: 'invalid user data'})
} 

}
catch (error) {
    res.status(500).json({message: 'server error' , error})
   }
}




const loginUser = async(req , res)=>{
    const {email , password}= req.body;
    try {
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password, user.password))){
             res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
             token: genetateToken(user._id)
             })
        }
        else{
            res.status(400).json({message: 'invalid email and password'})
        }


    }
     catch (error) {
         res.status(500).json({message: 'server error'})
    }
};



const getUsers = async(req,res)=>{
    try {
        const users = await User.find({}).select('-password');
        res.json(users);

    } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    console.log(error.stack);

    return res.status(500).json({
        message: error.message
    });
}
}
module.exports = {
registerUser,
loginUser,
getUsers
}



