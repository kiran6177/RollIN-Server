import express from "express";
import dependencies from "../../../frameworks/dependencies.js";
import { AuthHandler } from "../../middlewares/auth-handler.js";
import { TheatreLoginController, TheatreLogoutContrller, TheatreSignupController ,TheatreProfileCompleteController } from "../../controllers/index.js";
const theatreRouter = express.Router();

const controllers = {
    theatreSignupController : new TheatreSignupController(dependencies),
    theatreLogoutController : new TheatreLogoutContrller(dependencies),
    theatreLoginController : new TheatreLoginController(dependencies),
    theatreProfileCompleteController : new TheatreProfileCompleteController(dependencies)
}

theatreRouter.post('/login',async(req,res,next)=>{controllers.theatreLoginController.login(req,res,next)});
theatreRouter.post('/signup',async(req,res,next)=>{controllers.theatreSignupController.signup(req,res,next)});

theatreRouter.post('/completeprofile',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreProfileCompleteController.completeProfile(req,res,next)})

theatreRouter.get('/logout',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreLogoutController.logout(req,res,next)})

export default theatreRouter;