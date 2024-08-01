import mongoose from "mongoose";
import { movieSchema } from "./movieSchema.js";

export const orderSchema = new mongoose.Schema({
    order_id:{
        type:String,
        required:true
    },
    attachment_details:{
        email:{
            type:String,
            required:true
        },
        mobile:{
            type:Number,
            required:true
        }
    },
    show_id:{
        type:String,
        required:true
    },
    show_date:{
        type:Date,
        required:true
    },
    show_time:{
        type:String,
        required:true
    },
    seatdata:[{
        tier_name:{
            type:String,
            required:true
        },
        rate:{
            type:Number,
            required:true
        },
        seats:[{
            type:String,
            required:true
        }]
    }],
    movie:{
        type:movieSchema
    },
    screendata:{
        screen_id:{
            type:String,
            required:true
        },
        screen_name:{
            type:String,
            required:true
        }
    },
    theatre_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'theatre',
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    billing_amount:{
        type:Number,
        required:true
    },
    payment_session_id:{
        type:String,
        default:null
    },
    payment_status:{
        type:String,
        required:true,
        default:"PROCESSING"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

})