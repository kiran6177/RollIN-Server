export class AdminGetTheatres{
    constructor(dependencies){
        this.AdminGetTheatresUseCase = new dependencies.UseCase.GetTheatres(dependencies)
    }

    async getTheatres(req,res,next){
        try {
            const TheatresData = await this.AdminGetTheatresUseCase.execute()
            console.log(TheatresData);
            res.status(200).json(TheatresData)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}