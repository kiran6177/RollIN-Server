import mongoose from 'mongoose'

export const connection = ()=>{
    mongoose.connect('mongodb://localhost:27017/rollin-booking')
    mongoose.connection.on("connected", () => {
        console.log("Booking Connected to MongoDB");
      })
      
      mongoose.connection.on("error", (err) => {
        console.log("Booking Error connecting to MongoDB");
      })
      
      mongoose.connection.on("disconnected", () => {
        console.log("Booking Disconnected from MongoDB");
      })
}