import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    avtar:{
        type:String,
        required:false
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
   try {
     if(!this.isModified("password")) return next()
     
      this.password = await bcrypt.hash(this.password,8)
      next()
   } catch (error) {
    console.log(error)
   }
})



userSchema.methods.isPasswordCorrect  = async function(password){
    
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = async function(){

    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}


userSchema.methods.generateRefreshToken = async function(){
    console.log("Hi i am refresh")
    return jwt.sign(
        {   
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}

export const  User = mongoose.model("User",userSchema)