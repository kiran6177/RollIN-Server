export class TheatreProfileComplete{
    constructor(dependencies){
        this.completeProfileUseCase = new dependencies.UseCase.CompleteProfile(dependencies)
    }

    async completeProfile(req,res,next){
        try {
            const {} = req.body;
            console.log(req.body);
            const result = await this.completeProfileUseCase.execute(req.body)
            console.log(result);
            if(!result.isVerified){
                res.cookie('theatreRefreshToken',null,{httpOnly:true,secure:true,maxAge:0})
            }
            res.status(200).json({theatreData:result});
        } catch (error) {
            next(error)
        }
    }

}