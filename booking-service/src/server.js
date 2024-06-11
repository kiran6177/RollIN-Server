import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config();


const PORT = process.env.PORT

const startServer = ()=>{
    app.listen(PORT,()=>{
        console.log("Booking Listening on ",PORT);
    })
}

startServer() 