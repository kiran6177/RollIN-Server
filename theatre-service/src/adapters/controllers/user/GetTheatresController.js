export class UserGetTheatres{
    constructor(dependencies){
        this.UserGetTheatresUseCase = new dependencies.UseCase.UserTheatresGet(dependencies)
    }

    async getTheatres(req,res,next){
        try {
            const resultData = await this.UserGetTheatresUseCase.execute(req.body);
            const dataToFrontend = {
                resultData,
            }
            // if(req?.newUserToken){
            //     dataToFrontend.newUserToken = req?.newUserToken
            //     dataToFrontend.newUserData = req?.user
            // }
            res.status(200).json(dataToFrontend)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}