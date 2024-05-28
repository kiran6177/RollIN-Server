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
}

export class MongoUserRepository extends UserRepository{
    async createUser(userData){
        return await UserModel.create(userData);
    }
    async loginGoogle(userData){
        try{
            const userExist = await UserModel.findOne({email:userData.email,type:'GOOGLE-AUTH',isVerified:true});
            if(userExist){
                return {
                    email:userExist.email,
                    mobile:userExist.mobile,
                    firstname:userExist.firstname,
                    lastname:userExist.lastname,
                    dob:userExist.dob,
                    address:userExist.address,
                    walletBalance:userExist.walletBalance,
                }
            }
            else{
                const firstname = userData.name.split(' ')[0];
                const lastname = userData.name.split(' ')[1];
                const userToInsert = {
                    email: userData.email,
                    mobile:0,
                    firstname,
                    lastname,
                    address:{
                        street:'nil',
                        landmark:'nil',
                        city:'nil',
                        state:'nil',
                        pincode:0
                    },
                    isVerified:true,
                    type:'GOOGLE-AUTH',
                    password:'nil'
                }
                const createUser = new UserModel(userToInsert);
                
                const udata = await createUser.save();
                return {
                    email:udata.email,
                    mobile:udata.mobile,
                    firstname:udata.firstname,
                    lastname:udata.lastname,
                    dob:udata.dob,
                    address:udata.address,
                    walletBalance:udata.walletBalance,
                }
                
            }
        }catch(err){
             const error = new Error();
             error.statusCode = 500;
             error.reasons = [err.message]
             throw error
        }
    }
}