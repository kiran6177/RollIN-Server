import express  from "express";
import {createProxyMiddleware} from 'http-proxy-middleware'
import { AuthHandler } from "../middlewares/auth-handler.js";
import { AUTH_SERVICE_API } from "../../config/config.js";
const authrouter = express.Router();

authrouter.use(createProxyMiddleware({
    target: AUTH_SERVICE_API,
    changeOrigin: true,
  }))


export default authrouter