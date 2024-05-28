export class UserLogout{
    constructor(dependencies){
    }
    async logoutUser(req,res,next){
        try {
            console.log(req.cookies.refreshToken);
            res.cookie('refreshToken',null,{httpOnly:true,secure:true,maxAge:0})
            res.status(200).json({message:'Logout Successfully.'})
        } catch (err) {
            console.log(err.message);
            const error = new Error()
            error.statusCode = 500;
            error.reasons = [err.message];
            next(error)
        }
    }
}