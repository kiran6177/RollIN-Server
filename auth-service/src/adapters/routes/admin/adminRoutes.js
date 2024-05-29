import express from "express";
import dependencies from "../../../frameworks/dependencies.js";
import { AuthHandler } from "../../middlewares/auth-handler.js";
import { AdminLoginController , AdminLogoutController } from "../../controllers/index.js";
const adminRouter = express.Router();

const controllers = {
    adminLoginController : new AdminLoginController(dependencies),
    adminLogoutController : new AdminLogoutController(dependencies)
}

adminRouter.post('/login',async(req,res,next)=>{controllers.adminLoginController.loginAdmin(req,res,next)});
adminRouter.get('/logout',AuthHandler.isAdminLogin,(req,res,next)=>{controllers.adminLogoutController.logoutAdmin(req,res,next)})

export default adminRouter;