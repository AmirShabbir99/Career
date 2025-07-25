import express from "express"
import { getuser, login,logout,register } from "../controllers/userController.js"
import { isAuthorized } from "../middleware/Auth.js"

const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",isAuthorized,logout)
router.get("/getuser",getuser)


export default router;



