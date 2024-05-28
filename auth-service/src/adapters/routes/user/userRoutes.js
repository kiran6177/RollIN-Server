import express from "express";
import { UserAuthController , UserLogoutController } from "../../controllers/index.js";
import dependencies from "../../../frameworks/dependencies.js";
import { AuthHandler } from "../../middlewares/auth-handler.js";
const userRouter = express.Router();


const controllers = { 
    userAuthController : new UserAuthController(dependencies),
    useLogoutController : new UserLogoutController(dependencies)

}
userRouter.post("/login/:type",(req,res,next)=>controllers.userAuthController.authenticateUser(req,res,next));
userRouter.post('/refresh',(req,res)=>{console.log(req.cookies.refreshToken);res.json({})});
userRouter.get('/logout',AuthHandler.isUserLogin,(req,res,next)=>controllers.useLogoutController.logoutUser(req,res,next))



export default userRouter;
