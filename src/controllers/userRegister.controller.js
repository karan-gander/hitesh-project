import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/users.model.js"
import {fileUploadOnCloud} from "../utils/cloudinary.js"
const userRegister = asyncHandler(async (req,res)=>{
    // res.status(200).json({message:"Api is working well"})
    const {username,password,fullName,avtar,email} = req.body
     console.log(username,fullName,password,email)

    if([username,password,fullName,avtar,email].some((field)=>(field.trim() === "")))
    {
        throw new ApiError(401,"All field are required");
    }

    const excitedUser = await User.findOne({$or:[{username},{email}]})
    if(excitedUser){
        throw new ApiError(500,"User is already register");
    }

    const avtarImgLocalPath = req.file
    console.log(avtarImgLocalPath)
    const avtarImg = await fileUploadOnCloud(avtarImgLocalPath)
    
   const user =  await User.create({
        username,
        password,
        email,
        fullName,
        avtar:avtarImg.url
    })


    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering an user")
    }

    return res.status(201).json(ApiError(200,createdUser,"user created successfully"))



    

})

export {userRegister}