import express from 'express';
import { AuthHandler } from '../../middlewares/auth-handler.js'
import { AdminAddMovieToDBController, AdminGetAllTMDBMoviesController, AdminGetMoviesFromDBController, AdminGetTMDBMovieDetailController } from '../../controllers/index.js';
import dependencies from '../../../frameworks/dependencies.js';
const movieRouter = express.Router();

const controllers = {
    adminGetAllTMDBMoviesController : new AdminGetAllTMDBMoviesController(dependencies),
    adminGetTMDBMovieDetailController : new AdminGetTMDBMovieDetailController(dependencies),
    adminAddMovieToDBController : new AdminAddMovieToDBController(dependencies),
    adminGetMoviesFromDBController : new AdminGetMoviesFromDBController(dependencies)
}
movieRouter.post('/getalltmdbmovies',AuthHandler.isAdminLogin,(req,res,next)=>{controllers.adminGetAllTMDBMoviesController.getAllTMDBMovies(req,res,next)})
movieRouter.post('/gettmdbmoviedetail',AuthHandler.isAdminLogin,(req,res,next)=>{controllers.adminGetTMDBMovieDetailController.getTMDBMovieDetail(req,res,next)})
movieRouter.post('/addmovietodb',AuthHandler.isAdminLogin,(req,res,next)=>{controllers.adminAddMovieToDBController.addMovieToDB(req,res,next)})
movieRouter.post('/getallmovies',AuthHandler.isAdminLogin,(req,res,next)=>{controllers.adminGetMoviesFromDBController.getMoviesFromDB(req,res,next)})

export default movieRouter

