export class TheatreBlockUnblock{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
    }

    async execute(theatreid){
        try {
            const theatreExist = await this.theatreRepository.findTheatreById(theatreid)
            console.log(theatreExist);
            if(theatreExist){
                const updateTheatre = await this.theatreRepository.updateTheatreById(theatreid,{isBlocked:!theatreExist.isBlocked})
                const updateTheatreWOP = {
                    id:updateTheatre._id,
                    name:updateTheatre.name,
                    email:updateTheatre.email,
                    isVerified:updateTheatre.isVerified,
                    isCompleted:updateTheatre.isCompleted,
                    isAccepted:updateTheatre.isAccepted,
                    isBlocked:updateTheatre.isBlocked,
                    address:updateTheatre.address ? updateTheatre.address : null,
                    location:updateTheatre.location ? updateTheatre.location : null
                }
                return updateTheatreWOP
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['ERROR. Unable to perform this action!!']
                throw error;
            }
        } catch (err) {
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}