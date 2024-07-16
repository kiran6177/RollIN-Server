export class UserPaymentProcess{
    constructor(dependencies){
        this.UserPaymentProcessUseCase = new dependencies.UseCase.UserProcessPayment(dependencies)
    }

    async processPayment(req,res,next){
        try {
            const resultData = await this.UserPaymentProcessUseCase.execute(req.body,req?.user);
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