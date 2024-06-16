import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import {  MOVIE_SERVICE_API } from '../../config/config.js';
const movieRouter = express.Router();

movieRouter.use(createProxyMiddleware({
    target: MOVIE_SERVICE_API,
    changeOrigin: true,
  }))


export default movieRouter

