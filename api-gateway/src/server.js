import createServer from "./frameworks/express.js";

const server = createServer();
const PORT = process.env.PORT;

server.listen(PORT,()=>{
    console.log("gateway listening on ",PORT);
})