import mongoose from "mongoose";

export const movieSchema = new mongoose.Schema({
    movie_id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        default:"UNAVAILABLE"
    },
    release_date:{
        type:Date,
        required:true
    },
    popularity:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    },
    genres:{
        type:Array,
        default:[]
    },
    video_link:{
        type:String,
        default:null
    },
    runtime:{
        type:Number,
        default:0
    },
    backdrop_path:{
        type:String,
        required:true
    },
    poster_path:{
        type:String,
        required:true
    },
    cast:{
        type:Array,
    },
    crew:{
        type:Array,
    }
})

