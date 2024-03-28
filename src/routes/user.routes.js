import { Router } from "express";
import {userRegister} from "../controllers/userRegister.controller.js"
import {upload} from "../middleware/multer.js"
const router = Router()

router.route("/register").post(upload.single("avtar"),userRegister)

export default router