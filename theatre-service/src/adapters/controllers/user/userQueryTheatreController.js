export class UserTheatreQuery{
    constructor(dependencies){
        this.UserTheatreQueryUseCase = new dependencies.UseCase.UserQueryTheatre(dependencies)
    }

    async theatreQuery(req,res,next){
        try {
            const resultData = await this.UserTheatreQueryUseCase.execute(req.body);
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