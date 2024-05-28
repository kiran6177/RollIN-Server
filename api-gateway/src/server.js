import createServer from "./frameworks/express.js";

const app = createServer();
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("gateway listening on ",PORT);
})