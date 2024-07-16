import express  from "express";
import {createProxyMiddleware} from 'http-proxy-middleware'
import { BOOKING_SERVICE_API } from "../../config/config.js";
const bookingRouter = express.Router();

bookingRouter.use(createProxyMiddleware({
    target: BOOKING_SERVICE_API,
    changeOrigin: true,
  }))


export default bookingRouter