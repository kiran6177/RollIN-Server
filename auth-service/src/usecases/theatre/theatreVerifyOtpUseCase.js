import { createRefreshToken, createToken } from "../../utils/jwt.js";

export class VerifyTheatre{
    constructor(dependencies){
        this.theatreRepository  = new dependencies.Repositories.MongoTheatreRepository();
    }

    async execute({id,otp},session,type){
        try {
            console.log(id,otp);
            console.log(session);
            if(session?.theatreOTP){
                const sessionOTP = session?.theatreOTP
                if(parseInt(sessionOTP) === otp){
                    const updateTheatre = this.theatreRepository.updateTheatreById(id,{isAccepted:true});
                    if(updateTheatre?.isVerified && updateTheatre?.isAccepted){
                        const theatreData = {
                            id:updateTheatre._id,
                            name:updateTheatre.name,
                            email:updateTheatre.email,
                            isCompleted:updateTheatre.isCompleted,
                            isAccepted:updateTheatre.isAccepted,
                            isVerified:updateTheatre.isVerified,
                            isBlocked:updateTheatre.isBlocked
                        }
                        const accessToken = await createToken(theatreData);
                        const refreshToken = await createRefreshToken(theatreData);
                        return {
                            theatreData,
                            accessToken,
                            refreshToken
                        }
                    }else{
                        if(type === 'login'){
                            const error = new Error();
                            error.statusCode = 403;
                            error.reasons = ['Registration completed. You are under verfication.'];
                            throw error;
                        }else{
                            return {
                                theatreData :null,
                                accessToken : null,
                                refreshToken:null
                            }
                        }
                    }
                }else{
                    const error = new Error();
                    error.statusCode = 400;
                    error.reasons = ['Invalid OTP!!'];
                    throw error
                }
            }else{
                const error = new Error();
                error.statusCode = 400;
                error.reasons = ['Ooops!! OTP timed out!!'];
                throw error
            }
        } catch (err) {
            const error = new Error(err.message)
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }

}