export class UserSeatReservation{
    constructor(dependencies){
        this.userSeatReservationUseCase = new dependencies.UseCase.UserReserveSeat(dependencies)
    }

    async seatReservation(req,res,next){
        try {
            const resultData = await this.userSeatReservationUseCase.execute(req.body,req?.user);
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