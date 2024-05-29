import { AdminModel } from "../../database/index.js";

class AdminRepository{
    async findAdminByEmail(){
        throw new Error('findAdminByEmail not implemented!!');
    }
}
export class MongoAdminRepository extends AdminRepository{

    async findAdminByEmail(email){
        try {
            return await AdminModel.findOne({email});
        } catch (err) {
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }

}