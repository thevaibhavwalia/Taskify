import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const Register = async(req,res,next) => {
    try{
      const {name , email , password, picturePath} = req.body
      const isUser = await User.findOne({email})
      if(isUser){
        return res.send("email already present");
      }
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(password , salt)
      const user = new User({name , email , password: hashedPassword , picturePath})
      const savedUser = await user.save()
      return res.status(201).json(user)
    }
    catch(err){
        next(err)
    }
}

export const Login = async(req,res,next) => {
    try{
     const {email , password} = req.body
     const isUser = await User.findOne({email})
     if(!isUser) {
        

     return res.json({error:'Wrong Email'})
     } 
     const isMatched = await bcrypt.compare(password , isUser.password)
     if(!isMatched) {
        
        return res.json({error:'Wrong Password'})
     }
     const token = jwt.sign({id: isUser._id}, process.env.SECRET_KEY)
     if(isUser) {
        //password will be stored in password and rest of properties will be stored in userRes
        const {password , ...userRes} = isUser._doc
        return res.status(201).cookie('token', {token}, {httpOnly: true}).json({user: userRes})
     }
     
    }
    catch(err){
        next(err)
    }
}