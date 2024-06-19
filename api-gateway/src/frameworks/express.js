import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authrouter, movieRouter, theatreRouter } from '../adapters/routes/index.js';

const createServer = ()=>{
    const app = express();

    dotenv.config();
    app.use(cors({
        origin:'http://localhost:3000',
        credentials:true
    }));
    
    app.use('/api/auth',authrouter);
    app.use('/api/movie',movieRouter);
    app.use('/api/theatre',theatreRouter)
    
    return app
}

export default createServer