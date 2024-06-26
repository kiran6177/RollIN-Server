import express from 'express';
import { AuthHandler } from '../middlewares/auth-handler.js';
const theatreRouter = express.Router();
import dependencies from '../../frameworks/dependencies.js';
import {  TheatreAddScreenController, TheatreEditScreenController, TheatreEnrollMovieController, TheatreExtendMovieController, TheatreGetTheatreScreenController, TheatreRemoveMovieController, UserGetTheatresController } from '../controllers/index.js';

const controllers = {
    userGetTheatresController : new UserGetTheatresController(dependencies),
    theatreGetTheatreScreenController : new TheatreGetTheatreScreenController(dependencies),
    theatreAddScreenController : new TheatreAddScreenController(dependencies),
    theatreEnrollMovieController : new TheatreEnrollMovieController(dependencies),
    theatreEditScreenController : new TheatreEditScreenController(dependencies),
    theatreRemoveMovieController : new TheatreRemoveMovieController(dependencies),
    theatreExtendMovieController : new TheatreExtendMovieController(dependencies)
}

theatreRouter.get('/gettheatres',(req,res,next)=>{controllers.userGetTheatresController.getTheatres(req,res,next)})

theatreRouter.post('/gettheatredata',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreGetTheatreScreenController.getTheatreScreen(req,res,next)})
theatreRouter.post('/addscreen',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreAddScreenController.addScreen(req,res,next)})
theatreRouter.post('/enrollmovie',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreEnrollMovieController.enrollMovie(req,res,next)})
theatreRouter.post('/editscreen',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreEditScreenController.editScreen(req,res,next)})
theatreRouter.post('/removemoviefromscreen',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreRemoveMovieController.removeMovie(req,res,next)})
theatreRouter.post('/extendmovieforscreen',AuthHandler.isTheatreLogin,(req,res,next)=>{controllers.theatreExtendMovieController.extendMovie(req,res,next)})


export default theatreRouter