export class UserShowByMovieGet{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
        this.reservationRepository = new dependencies.Repositories.MongoReservationRepository()
    }

    async execute({date,movie_id}){
        try {
            if(date && movie_id){
                console.log(date,movie_id);
                const showData = await this.reservationRepository.getShowDataByMovieIdAndDate(movie_id,date);
                console.log(showData);
                const resultData = showData.map(show=>{
                    let updatedShow;
                    show.shows[0]?.screenData[0]?.running_movies.map(movie=>{
                        if(movie_id.toString() == movie?.movie_id){
                            updatedShow = {
                                ...show,
                                movie,
                                theatre:show.shows[0]?.theatreData[0]
                            }
                        }
                    })
                    console.log("Up",updatedShow);
                    return updatedShow
                })
                console.log(resultData);
                return resultData
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['Invalid input data!!'];
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