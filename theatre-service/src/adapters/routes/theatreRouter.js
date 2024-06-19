import express from 'express';
import { AuthHandler } from '../middlewares/auth-handler.js';
const theatreRouter = express.Router();
import dependencies from '../../frameworks/dependencies.js';
import { UserGetTheatresController } from '../controllers/index.js';

const controllers = {
    userGetTheatresController : new UserGetTheatresController(dependencies)
}

theatreRouter.get('/gettheatres',(req,res,next)=>{controllers.userGetTheatresController.getTheatres(req,res,next)})

export default theatreRouter