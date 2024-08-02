import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authrouter, bookingRouter, movieRouter, theatreRouter } from '../adapters/routes/index.js';
import { createServer } from 'http'

const startServer = ()=>{
    const app = express();
    const server = createServer(app)
    dotenv.config();
    app.use(cors({
        origin:['http://localhost:3000'],
        credentials:true
    }));

    app.use('/api/auth',authrouter);
    app.use('/api/movie',movieRouter);
    app.use('/api/theatre',theatreRouter)
    app.use('/api/booking',bookingRouter)
    return server
}

export default startServer