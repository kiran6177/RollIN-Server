export class UserGetUpcomingMovies{
    constructor(dependencies){
        this.userGetUpcomingMoviesUseCase = new dependencies.UseCase.UserUpcomingMoviesGet(dependencies)
    }

    async getUpcomingMovies(req,res,next){
        try {
            const resultData = await this.userGetUpcomingMoviesUseCase.execute(req.body,req?.user);
            const dataToFrontend = {
                resultData,
            }
            if(req?.newUserToken){
                dataToFrontend.newUserToken = req?.newUserToken
                dataToFrontend.newUserData = req?.user
            }
            res.status(200).json(dataToFrontend)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}