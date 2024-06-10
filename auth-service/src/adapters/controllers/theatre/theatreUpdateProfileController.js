export class TheatreUpdateProfile{
    constructor(dependencies){
        this.theatreProfileUpdateUseCase = new dependencies.UseCase.TheatreProfileUpdate(dependencies)
    }

    async updateProfile(req,res,next){
        try {           
            const profileUpdateData = await this.theatreProfileUpdateUseCase.execute(req.body.data,req.files)
            console.log("UPDATEEED",profileUpdateData);
            if(!profileUpdateData.isVerified){
                res.cookie('theatreRefreshToken',null,{httpOnly:true,secure:true,maxAge:0})
                res.status(201).json({success:false})
            }else{
                const dataToFrontend = {
                    success:true,
                    theatreData:profileUpdateData
                }
                    if(req?.newTheatreToken){
                        dataToFrontend.newTheatreToken = req?.newTheatreToken
                        dataToFrontend.newTheatreData = req?.theatre
                    }
                res.status(201).json(dataToFrontend)
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}