export class GetTheatres{
    constructor(dependencies){
        this.adminRepository = new dependencies.Repositories.MongoAdminRepository()
    }

    async execute(){
        try {
            const theatres = await this.adminRepository.getAllTheatres();
            console.log(theatres);
            const theatresWOP = theatres.map(theatre=>{
                return {
                    id:theatre._id,
                    name:theatre.name,
                    email:theatre.email,
                    isVerified:theatre.isVerified,
                    isCompleted:theatre.isCompleted,
                    isAccepted:theatre.isAccepted,
                    isBlocked:theatre.isBlocked,
                    address:theatre.address ? theatre.address : null,
                    location:theatre.location ? theatre.location : null
                }
            })
            return theatresWOP
        } catch (err) {
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}