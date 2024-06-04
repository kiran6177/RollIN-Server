import axios from 'axios'
import { createToken, createRefreshToken } from '../../utils/jwt.js';

export class GoogleUserAuth{
    constructor(dependencies){
        this.userRepository = new dependencies.Repositories.MongoUserRepository();
    }

    async execute(access_token){
        try{
            const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{headers:{
                Authorization: `Bearer ${access_token}`
            }})
            const userData = res.data;
            if(userData.email_verified){
                // const data =  await this.userRepository.loginGoogle(userData)
                const userExist = await this.userRepository.findUserByEmail(userData.email);
                let data;
                if(userExist){
                    if(userExist.isVerified){
                        data = {
                            id:userExist.id,
                            email:userExist.email,
                            mobile:userExist.mobile,
                            firstname:userExist.firstname,
                            lastname:userExist.lastname,
                            dob:userExist.dob,
                            address:userExist.address,
                            walletBalance:userExist.walletBalance,
                        }
                    }else{
                        const error = new Error()
                        error.statusCode = 403;
                        error.reasons = ['You are temporarily blocked by Admin.']
                        throw error;
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

                    const udata = await this.userRepository.createUser(userToInsert)
                    data = {
                        id:udata._id,
                        email:udata.email,
                        mobile:udata.mobile,
                        firstname:udata.firstname,
                        lastname:udata.lastname,
                        dob:udata.dob,
                        address:udata.address,
                        walletBalance:udata.walletBalance,
                    }

                }

                console.log(data);
                const accessToken = await createToken(data);
                const refreshToken = await createRefreshToken(data);

                return {
                    data,
                    accessToken,
                    refreshToken
                }
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['User is not verified']
                throw error;
            }
        }catch(err){
            console.log(err);
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}