import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authrouter } from '../adapters/routes/index.js';

const createServer = ()=>{
    const app = express();

    dotenv.config();
    app.use(cors({
        origin:'http://localhost:3000',
        credentials:true
    }));
    
    app.use('/api/auth',authrouter);
    
    return app
}

export default createServer