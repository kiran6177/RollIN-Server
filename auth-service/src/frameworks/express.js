import express from 'express';
import cookieParser from 'cookie-parser';
import { userRouter } from '../adapters/routes/index.js';
import { ErrorHandler } from '../adapters/middlewares/error-handler.js';

export default ()=>{
    const app = express()
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use(cookieParser());
    
    app.use('/auth/user',userRouter);

    app.use(ErrorHandler.handleError)
    return app
}
