import { createRefreshToken, createToken } from "../../utils/jwt.js";

export class VerifyUserOtp{
    constructor(dependencies){
        this.userRepository = new dependencies.Repositories.MongoUserRepository()
    }

    async execute(id,otp,sessionOTP){
        try {
            const userExist = await this.userRepository.findUserById(id);
            console.log(userExist);
            if(userExist){
                if(sessionOTP){
                    if(parseInt(sessionOTP) === otp){

                        const userWOP = {
                            id:userExist.id,
                            email:userExist.email,
                            mobile:userExist.mobile,
                            firstname:userExist.firstname,
                            lastname:userExist.lastname,
                            dob:userExist.dob,
                            address:userExist.address,
                            walletBalance:userExist.walletBalance,
                        }

                        const accessToken = await createToken(userWOP);
                        const refreshToken = await createRefreshToken(userWOP)

                        return {
                            data :userWOP,
                            accessToken,
                            refreshToken
                        }
                    }else{
                        const error = new Error()
                        error.statusCode = 500;
                        error.reasons = ['Ooops. Invalid OTP!!']
                        throw error;
                    }
                }else{
                    const error = new Error()
                    error.statusCode = 500;
                    error.reasons = ['Ooops. OTP timed out!!']
                    throw error;
                }
            }else{
                const error = new Error()
                error.statusCode = 500;
                error.reasons = ['Ooops. Some error occured. Please retry!!']
                throw error;
            }
        } catch (err) {
            console.log(err.message);
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}