import { OrderModel } from "../../database/index.js";
import { ObjectId } from "mongodb";

class OrderRepository{
    async createOrder(){
        throw new Error('createOrder not implemented')
    }
    async updateOrderById(){
        throw new Error('updateOrderById not implemented')
    }
    async findOrderByOrderId(){
        throw new Error('findOrderByOrderId not implemented')
    }
    async removeOrderById(){
        throw new Error('removeOrderById not implemented')
    }
    async getOrdersByUserIdWithPage(){
        throw new Error('getOrdersByUserIdWithPage not implemented')
    }
    async getOrdersByTheatreWithFilters(){
        throw new Error('getOrdersByTheatreWithFilters not implemented')
    }
}

export class MongoOrderRepository extends OrderRepository{
    async createOrder(data){
        try {
            return await OrderModel.create(data)
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async updateOrderById(id,data){
        try {
            return await OrderModel.findByIdAndUpdate({_id:id},{$set:data},{new:true})
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async findOrderByOrderId(order_id){
        try {
            return await OrderModel.findOne({order_id}).populate('theatre_id')
            } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async removeOrderById(id){
        try {
            return await OrderModel.findByIdAndDelete({_id:id})
            } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async getOrdersByUserIdWithPage(id,limit,skip){
        try {
            return await OrderModel.find({user_id:id}).sort({createdAt:-1}).populate('theatre_id').skip(skip).limit(limit)
            } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async getOrdersByTheatreWithFilters(filterArr,skip,LIMIT){
        try {
            return await OrderModel.aggregate([{$match:{$and:filterArr}},{$lookup:{from:'users',localField:'user_id',foreignField:'_id',as:'user_data'}},{$skip:skip},{$limit:LIMIT}])
            } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    } 
}