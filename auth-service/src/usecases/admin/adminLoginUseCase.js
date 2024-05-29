import { compare } from 'bcrypt';
import { createRefreshToken, createToken } from '../../utils/jwt.js';


export class AdminLogin{
    constructor(dependencies){
        this.adminRepository = new dependencies.Repositories.MongoAdminRepository()
    }

    async execute(data){
        try {
            const adminExist = await this.adminRepository.findAdminByEmail(data.email)
            if(adminExist){
                const isValid = await compare(data.password,adminExist.password);
                if(isValid){
                    const adminData = {
                        name:adminExist.name,
                        email:adminExist.email,
                        mobile:adminExist.mobile
                    }
                    const accessToken = createToken(adminData)
                    const refreshToken = createRefreshToken(adminData);
                    return {
                        adminData,
                        accessToken,
                        refreshToken
                    }
                }else{
                    const error = new Error()
                    error.statusCode = 400;
                    error.reasons = ['Invalid Admin Credentials!!']
                    throw error;
                }
            }else{
                const error = new Error()
                error.statusCode = 404;
                error.reasons = ['Invalid Admin!!']
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