import { UserModel } from "../../database/index.js";

class UserRepository{
    async createUser(){
        throw new Error('CreateUser not implemented!!');
    }
    async findUserById(){
        throw new Error('findUserById not implemented!!');
    }
    async deleteUserById(){
        throw new Error('deleteUserById not implemented!!');
    }
    async loginGoogle(){
        throw new Error('loginGoogle not implemented!!');
    }
    async findUserByEmail(){
        throw new Error('findUserByEmail not implemented!!');
    }
    async updateUserById(){
        throw new Error('updateUserById not implemented!!');
    }
}

export class MongoUserRepository extends UserRepository{
    async createUser(userData){
        return await UserModel.create(userData);
    }
    // async loginGoogle(userData){
    //     try{
    //         const userExist = await UserModel.findOne({email:userData.email});
    //         if(userExist){
    //             if(userExist.isVerified){
    //                 return {
    //                     id:userExist.id,
    //                     email:userExist.email,
    //                     mobile:userExist.mobile,
    //                     firstname:userExist.firstname,
    //                     lastname:userExist.lastname,
    //                     dob:userExist.dob,
    //                     address:userExist.address,
    //                     walletBalance:userExist.walletBalance,
    //                 }
    //             }else{
    //                 const error = new Error()
    //                 error.statusCode = 403;
    //                 error.reasons = ['You are temporarily blocked by Admin.']
    //                 throw error;
    //             }
    //         }
    //         else{
    //             const firstname = userData.name.split(' ')[0];
    //             const lastname = userData.name.split(' ')[1];
    //             const userToInsert = {
    //                 email: userData.email,
    //                 mobile:0,
    //                 firstname,
    //                 lastname,
    //                 address:{
    //                     street:'nil',
    //                     landmark:'nil',
    //                     city:'nil',
    //                     state:'nil',
    //                     pincode:0
    //                 },
    //                 isVerified:true,
    //                 type:'GOOGLE-AUTH',
    //                 password:'nil'
    //             }
    //             const createUser = new UserModel(userToInsert);
                
    //             const udata = await createUser.save();
    //             return {
    //                 id:udata._id,
    //                 email:udata.email,
    //                 mobile:udata.mobile,
    //                 firstname:udata.firstname,
    //                 lastname:udata.lastname,
    //                 dob:udata.dob,
    //                 address:udata.address,
    //                 walletBalance:udata.walletBalance,
    //             }
                
    //         }
    //     }catch(err){
    //         console.log(err);
    //          const error = new Error();
    //          error.statusCode = 500;
    //          error.reasons = [err.message]
    //          throw error
    //     }
    // }
    async findUserByEmail(email){
        try {
            return await UserModel.findOne({email})
        } catch (err) {
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }

    async findUserById(id){
        try {
            return await UserModel.findById({_id:id})
        } catch (err) {
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }

    async updateUserById(id,data){
        try {
            return await UserModel.findByIdAndUpdate({_id:id},{$set:data},{new:true})
        } catch (err) {
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }

}