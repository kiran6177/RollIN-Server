export class AdminTheatreApprove{
    constructor(dependencies){
        this.adminTheatreApproveUseCase = new dependencies.UseCase.TheatreApprove(dependencies);
    }

    async approve(req,res,next){
        try {
            console.log(req.body);
            const theatreData = await this.adminTheatreApproveUseCase.execute(req.body.theatreid);
            console.log(theatreData);
            res.status(200).json({theatreData})
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}