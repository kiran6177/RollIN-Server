import mongoose from 'mongoose'

export const connection = ()=>{
    mongoose.connect('mongodb://localhost:27017/rollin-theatre')
    mongoose.connection.on("connected", () => {
        console.log("Theatre Connected to MongoDB");
      })
      
      mongoose.connection.on("error", (err) => {
        console.log("Theatre Error connecting to MongoDB");
      })
      
      mongoose.connection.on("disconnected", () => {
        console.log("Theatre Disconnected from MongoDB");
      })
}