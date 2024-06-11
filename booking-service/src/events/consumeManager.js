import { UserCreatedConsumeController } from "../adapters/controllers/index.js";
import dependencies from "../frameworks/dependencies.js";
import { TYPE_USER_CREATED } from "./config.js";

export class ConsumeManager{
    constructor(){
        this.userCreatedConsumer = new UserCreatedConsumeController(dependencies)
    }
    async manageConsumer(type,value){
        try {
            const data = JSON.parse(value)
            switch (type) {
                case TYPE_USER_CREATED:
                    return await this.userCreatedConsumer.createUser(data)  
                default:
                    const error = new Error();
                    error.statusCode = 500;
                    error.reasons = ['Invalid type of message!']
                    throw error
            }
        } catch (err) {
            console.log("MANAGE",err);
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }

}