export class UserPaymentInitiate{
    constructor(dependencies){
        this.UserPaymentInitiateUseCase = new dependencies.UseCase.UserInitiatePayment(dependencies)
    }

    async initiatePayment(req,res,next){
        try {
            const resultData = await this.UserPaymentInitiateUseCase.execute(req.body,req?.user);
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