import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import {  THEATRE_SERVICE_API } from '../../config/config.js';
const theatreRouter = express.Router();

theatreRouter.use(createProxyMiddleware({
    target: THEATRE_SERVICE_API,
    changeOrigin: true,
  }))


export default theatreRouter

