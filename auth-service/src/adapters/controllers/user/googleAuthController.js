export class UserAuth{
    constructor(dependencies){
        this.googleLoginUseCase = new dependencies.UseCase.GoogleUserAuth(dependencies);
    }

    async authenticateUser(req,res,next){
        try {
            const { type } = req.params;
            console.log(type);
            if(type==='google'){
                const {data,accessToken,refreshToken} = await this.googleLoginUseCase.execute(req.body.access_token)
                console.log(refreshToken);
                res.cookie('refreshToken',refreshToken,{
                    httpOnly:true,
                    secure:true,
                    maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
                })
                res.status(200).json({data,accessToken});
            }else if(type === 'email'){

            }else{

            }
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

}