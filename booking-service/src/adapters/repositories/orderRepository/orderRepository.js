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
}