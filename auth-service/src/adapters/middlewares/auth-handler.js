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
                    res.status(400).json('UnAuthorized User!!')
                }
            }else{
                res.status(400).json('Invalid Token!!')
            }
        }catch(err){
            console.log(err.message);
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
                    res.status(400).json('UnAuthorized Admin!!')
                }
            }else{
                res.status(400).json('Invalid Token!!')
            }
        }catch(err){
            console.log(err.message);
        }
    }
}