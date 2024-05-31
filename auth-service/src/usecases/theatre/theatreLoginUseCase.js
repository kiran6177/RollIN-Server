import { compare } from "bcrypt";
import { createRefreshToken, createToken } from "../../utils/jwt.js";

export class TheatreLogin{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
    }

    async execute(data){
        try {
            const  { email , password} = data;
            const theatreExist = await this.theatreRepository.findTheatreByEmail(email);
            console.log(theatreExist);
            if(theatreExist !== null){
                const isValidTheatre = await compare(password,theatreExist.password);
                if(isValidTheatre){
                    if(theatreExist.isVerified){
                        if(!theatreExist.isBlocked){
                            const theatreData = {
                                id:theatreExist._id,
                                name:theatreExist.name,
                                email:theatreExist.email,
                                isCompleted:theatreExist.isCompleted,
                                isVerified:theatreExist.isVerified,
                                isBlocked:theatreExist.isBlocked
                            }
                            const accessToken = await createToken(theatreData);
                            const refreshToken = await createRefreshToken(theatreData);
                            return {
                                theatreData,
                                accessToken,
                                refreshToken
                            }
                        }else{
                            const error = new Error();
                            error.statusCode = 403;
                            error.reasons = ['You are tempororily blocked by Admin!'];
                            throw error;
                        }
                    }else{
                        const error = new Error();
                        error.statusCode = 403;
                        error.reasons = ['You are under verfication. Please try again later.'];
                        throw error;
                    }
                }else{
                    const error = new Error();
                    error.statusCode = 404;
                    error.reasons = ['Invalid Password!'];
                    throw error;
                }
            }else{
                const error = new Error();
                error.statusCode = 404;
                error.reasons = ['Invalid User. Please Register!'];
                throw error;
            }
        } catch (err) {
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}