export class TheatreScreenAdd{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
    }

    async execute({theatreid,name,tierData,showData,speakers}){
        try {
            console.log(name,tierData,showData,speakers);
            if(theatreid){
                const theatreValid = await this.theatreRepository.findTheatreById(theatreid)
                if(theatreValid){
                    if(tierData?.length > 0 && showData?.length > 0 && speakers !== null){
                        const tiers = tierData.map((tierObj,i)=>{
                            return {
                                name:tierObj.name.trim(),
                                seats:tierObj.seats,
                                rate:tierObj.rate,
                                order:i
                            }
                        })
                        const showtimes = showData.map(showObj=>{
                            return {
                                showtime:showObj.showtime,
                                movie_id:showObj.movie
                            }
                        })
                        const dataToAdd = {
                            name,
                            tiers,
                            showtimes,
                            sound_setup:speakers
                        }
                        const addedScreen = await this.screenRepository.addScreen(dataToAdd)
                        console.log(addedScreen);
                        const addedToTheatre = await this.theatreRepository.addScreenToTheatre(theatreid,addedScreen._id)
                        return true
                    }else{
                        const error = new Error()
                        error.statusCode = 400;
                        error.reasons = ['Invalid input data!!'];
                        throw error;
                    }
                }else{
                    const error = new Error()
                    error.statusCode = 400;
                    error.reasons = ['Invalid theatre data!!'];
                    throw error;
                }                
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['Invalid theatre data!!'];
                throw error;
            }
            
        } catch (err) {
            console.log(err);
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}