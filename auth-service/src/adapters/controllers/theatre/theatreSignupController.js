export class TheatreSignup{
    constructor(dependencies){
        this.theatreSignupUseCase = new dependencies.UseCase.TheatreSignup(dependencies)
    }

    async signup(req,res,next){
        try {
            const {theatreData} = await this.theatreSignupUseCase.execute(req.body);
            res.status(200).json({
                theatreData,
            })
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    }

}