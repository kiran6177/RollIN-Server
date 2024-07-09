import express from 'express';
import { AuthHandler } from '../middlewares/auth-handler.js'
const bookingRouter = express.Router();
import dependencies from '../../frameworks/dependencies.js';
import { TheatreGetShowBookingController, TheatreShowCancellationController, UserGetShowDataController, UserGetSingleShowDataController } from '../controllers/index.js';

const controllers = {
    theatreGetShowBookingController : new TheatreGetShowBookingController(dependencies),
    theatreShowCancellationController : new TheatreShowCancellationController(dependencies),
    userGetShowDataController : new UserGetShowDataController(dependencies),
    userGetSingleShowDataController : new UserGetSingleShowDataController(dependencies)
}

bookingRouter.post('/getshowbookingstatus',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreGetShowBookingController.getShowBooking(req,res,next)})
bookingRouter.post('/cancelshowbookings',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreShowCancellationController.showCancellation(req,res,next)})
bookingRouter.post('/getshowdata',(req,res,next)=>{controllers.userGetShowDataController.getShowData(req,res,next)})
bookingRouter.post('/getsingleshowdata',AuthHandler.isUserLogin,(req,res,next)=>{controllers.userGetSingleShowDataController.getSingleShowData(req,res,next)})

export default bookingRouter