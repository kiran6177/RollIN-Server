import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authrouter, bookingRouter, movieRouter, theatreRouter } from '../adapters/routes/index.js';

const createServer = ()=>{
    const app = express();

    dotenv.config();
    app.use(cors({
        origin:['http://localhost:3000','http://52.66.25.127','https://52.66.25.127'],
        credentials:true
    }));
    
    app.use('/api/auth',authrouter);
    app.use('/api/movie',movieRouter);
    app.use('/api/theatre',theatreRouter)
    app.use('/api/booking',bookingRouter)
    
    return app
}

export default createServer