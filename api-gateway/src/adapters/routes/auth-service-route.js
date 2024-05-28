import express  from "express";
import {createProxyMiddleware} from 'http-proxy-middleware'
import { AuthHandler } from "../middlewares/auth-handler.js";
const authrouter = express.Router();

authrouter.use(createProxyMiddleware({
    target: 'http://localhost:4001/auth',
    changeOrigin: true,
  }))


export default authrouter