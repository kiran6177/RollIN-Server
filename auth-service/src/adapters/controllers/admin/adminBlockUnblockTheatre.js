export class AdminTheatreBlockUnblock{
    constructor(dependencies){
        this.adminTheatreBlockUnblockUseCase = new dependencies.UseCase.TheatreBlockUnblock(dependencies);
    }

    async blockUnblock(req,res,next){
        try {
            console.log(req.body);
            const theatreData = await this.adminTheatreBlockUnblockUseCase.execute(req.body.theatreid);
            console.log(theatreData);
            res.status(200).json({theatreData})
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}