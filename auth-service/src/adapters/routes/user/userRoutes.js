import express from "express";
import { UserAuthController , UserLogoutController, UserResendOtpController, UserVerifyOtpController } from "../../controllers/index.js";
import dependencies from "../../../frameworks/dependencies.js";
import { AuthHandler } from "../../middlewares/auth-handler.js";
const userRouter = express.Router();


const controllers = { 
    userAuthController : new UserAuthController(dependencies),
    useLogoutController : new UserLogoutController(dependencies),
    userVerifyOtpController : new UserVerifyOtpController(dependencies),
    userResendOtpController : new UserResendOtpController(dependencies)

}
userRouter.post("/login/:type",(req,res,next)=>controllers.userAuthController.authenticateUser(req,res,next));
userRouter.post('/verifyotp/:type',(req,res,next)=>{controllers.userVerifyOtpController.verifyUser(req,res,next)})
userRouter.post('/resendotp',(req,res,next)=>{controllers.userResendOtpController.resendOtp(req,res,next)});
userRouter.get('/logout',AuthHandler.isUserLogin,(req,res,next)=>controllers.useLogoutController.logoutUser(req,res,next))



export default userRouter;
