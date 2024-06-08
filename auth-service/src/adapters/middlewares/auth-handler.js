import { verifyAccessToken } from "../../utils/jwt.js";

export class AuthHandler{
    static async isUserLogin(req,res,next){
        try{
            if(req.headers && req.headers['authorization']){
                const access_token = req.headers['authorization'].split(' ')[1]
                const decoded = await verifyAccessToken(access_token);
                console.log(decoded);
                if(decoded){
                    req.user = decoded
                    console.log("decIN",req.user);
                    next()
                }else{
                    const error = new Error();
                    error.statusCode = 401;
                    error.reasons = ['UnAuthorized User!!']
                    throw error
                }
            }else{
                const error = new Error();
                error.statusCode = 401;
                error.reasons = ['Invalid Token!!']
                throw error
            }
        }catch(err){
            console.log(err.message);
            next(err)
        }
    }
    static async isAdminLogin(req,res,next){
        try{
            if(req.headers && req.headers['authorization']){
                const access_token = req.headers['authorization'].split(' ')[1]
                const decoded = await verifyAccessToken(access_token);
                console.log(decoded);
                if(decoded){
                    req.admin = decoded
                    console.log("decINAdmin",req.admin);
                    next()
                }else{
                    const error = new Error();
                    error.statusCode = 401;
                    error.reasons = ['UnAuthorized Admin!!']
                    throw error
                }
            }else{
                const error = new Error();
                error.statusCode = 401;
                error.reasons = ['Invalid Token!!']
                throw error
            }
        }catch(err){
            console.log(err.message);
            next(err)
        }
    }
    static async isTheatreLogin(req,res,next){
        try{
            if(req.headers && req.headers['authorization']){
                const access_token = req.headers['authorization'].split(' ')[1];
                const decoded = await verifyAccessToken(access_token);
                if(decoded){
                    req.theatre = decoded
                    console.log("decInTheatre",req.theatre);
                    next()
                }else{
                    const error = new Error();
                    error.statusCode = 401;
                    error.reasons = ['UnAuthorized Theatre!!']
                    throw error
                }
            }else{
                const error = new Error();
                error.statusCode = 401;
                error.reasons = ['Invalid Token!!']
                throw error
            }
        }catch(err){
            console.log(err.message);
            next(err)
        }
    }
}