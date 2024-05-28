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
                const data =  await this.userRepository.loginGoogle(userData)
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
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}