export class UserGetSingleTheatre{
    constructor(dependencies){
        this.UserGetSingleTheatreUseCase = new dependencies.UseCase.UserSingleTheatreGet(dependencies)
    }

    async getSingleTheatre(req,res,next){
        try {
            const resultData = await this.UserGetSingleTheatreUseCase.execute(req.body);
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