import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'cookie-session'
import { userRouter ,adminRouter, theatreRouter } from '../adapters/routes/index.js';
import { ErrorHandler } from '../adapters/middlewares/error-handler.js';
import { createServer } from 'http'

export default ()=>{
    const app = express()
    const server = createServer(app)
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use(cookieParser());
    app.use(session({
        name:'ROLLIN_SESSION',
        keys:[process.env.SESSION_SECRET],
        maxAge: 24* 60 * 60 * 1000
    }))

    app.use('/auth/user',userRouter);
    app.use('/auth/admin',adminRouter);
    app.use('/auth/theatre',theatreRouter);

    app.use(ErrorHandler.handleError)
    return server
}
