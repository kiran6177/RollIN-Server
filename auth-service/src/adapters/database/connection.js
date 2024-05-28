import mongoose from 'mongoose'
const MONGOPASS = process.env.MONGOPASS
export const connection = ()=>{
    // mongoose.connect(`mongodb://kir4ns6177:${MONGOPASS}@ac-ob9eqiw-shard-00-00.if2ar0n.mongodb.net:27017,ac-ob9eqiw-shard-00-01.if2ar0n.mongodb.net:27017,ac-ob9eqiw-shard-00-02.if2ar0n.mongodb.net:27017/rollin-auth?ssl=true&replicaSet=atlas-xc4i4r-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`)
    mongoose.connect('mongodb://localhost:27017/rollin-auth')
    mongoose.connection.on("connected", () => {
        console.log("Auth Connected to MongoDB");
      })
      
      mongoose.connection.on("error", (err) => {
        console.log("Auth Error connecting to MongoDB");
      })
      
      mongoose.connection.on("disconnected", () => {
        console.log("Auth Disconnected from MongoDB");
      })
}