export class UserGetOrders{
    constructor(dependencies){
        this.userGetOrdersUseCase = new dependencies.UseCase.UserOrdersGet(dependencies)
    }

    async getOrders(req,res,next){
        try {
            const resultData = await this.userGetOrdersUseCase.execute(req.body,req?.user);
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