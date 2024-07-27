export class UserGetRecommendedMovies{
    constructor(dependencies){
        this.userGetRecommendedMoviesUseCase = new dependencies.UseCase.UserRecommendedMoviesGet(dependencies)
    }

    async getRecommendedMovies(req,res,next){
        try {
            const resultData = await this.userGetRecommendedMoviesUseCase.execute(req.body,req?.user);
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