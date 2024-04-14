import { Router } from "express";
import {userRegister} from "../controllers/userRegister.controller.js"
import {userLogin} from "../controllers/userLogin.js"
import {logout} from "../controllers/userLogout.js"
import {refreshAccessToken} from "../controllers/refreshToken.js"
import { changePassword } from "../controllers/changePassword.js";
import {verifyJWT} from "../middleware/auth.js"
import {upload} from "../middleware/multer.js"

const router = Router()

router.route("/register").post(upload.single("avtar"),userRegister)
router.route("/login").post(userLogin)

router.route("/logout").post(verifyJWT,logout)
router.route("/refresh-token").post(refreshAccessToken)
router.route("change-password").post(verifyJWT,changePassword)
router.route("currunt-user").post(verifyJWT,)

export default router