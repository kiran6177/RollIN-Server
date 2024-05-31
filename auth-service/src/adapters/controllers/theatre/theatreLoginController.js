export class TheatreLogin{
    constructor(dependencies){
        this.theatreLoginUseCase = new dependencies.UseCase.TheatreLogin(dependencies)
    }

    async login(req,res,next){
        try {
            const {  email , password } = req.body;
            const {theatreData,accessToken,refreshToken} = await this.theatreLoginUseCase.execute({email,password});
            console.log(refreshToken);
            res.status(200).json({theatreData,accessToken})
        } catch (error) {
            next(error)
        }
    }

}