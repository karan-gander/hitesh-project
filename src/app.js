import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors({
    credentials:true
}))


app.use(express.json({limit:"30mb"}))
app.use(express.urlencoded({extended:true,limit:"30mb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes calling 
import userSignUp from "./routes/user.routes.js"
app.use("/api/v1/user",userSignUp)


export {app}
