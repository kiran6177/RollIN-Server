import mongoose from 'mongoose'

export const connection = ()=>{
    mongoose.connect('mongodb://localhost:27017/rollin-movie')
    mongoose.connection.on("connected", () => {
        console.log("Movie Connected to MongoDB");
      })
      
      mongoose.connection.on("error", (err) => {
        console.log("Movie Error connecting to MongoDB");
      })
      
      mongoose.connection.on("disconnected", () => {
        console.log("Movie Disconnected from MongoDB");
      })
}