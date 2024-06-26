import { UNKNOWN_IMAGE } from "../../config/api.js";
import { AwsConfig } from "../../utils/aws-s3.js";
const MOVIE_OWNER = 'movie';
const PEOPLE_OWNER = 'people'

export class TheatreMovieRemove{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
        this.awsConfig = new AwsConfig()
    }

    async execute({screen_id,movie_id}){
        try {
            if(screen_id){
                const screenValid = await this.screenRepository.findScreenById(screen_id)
                if(screenValid){
                    console.log(movie_id);
                    const findMovieRunning = await this.screenRepository.findMovieRunning(screen_id,movie_id)
                    if(findMovieRunning?.length === 0){
                        const removedMovieScreen =  await this.screenRepository.removeMovie(screen_id,movie_id)
                        let dataWithImages = {}
                        if(removedMovieScreen?.running_movies?.length > 0){
                            let running_movies = []
                            for(let movie of removedMovieScreen.running_movies){
                                const backdrop_path = await this.awsConfig.getImage(movie.backdrop_path,MOVIE_OWNER)
                                const poster_path = await this.awsConfig.getImage(movie.poster_path,MOVIE_OWNER)
                                const cast = []
                                for(let castObj of movie.cast){
                                    if(castObj.profile_path){
                                        let profile_path = await this.awsConfig.getImage(castObj.profile_path,PEOPLE_OWNER)
                                        cast.push({
                                            ...castObj,
                                            profile_path
                                        })
                                    }else{
                                        cast.push({
                                            ...castObj,
                                            profile_path:UNKNOWN_IMAGE
                                        })
                                    }
                                    
                                }
                                const crew = []
                                for(let crewObj of movie.crew){
                                    if(crewObj.profile_path){
                                        let profile_path = await this.awsConfig.getImage(crewObj.profile_path,PEOPLE_OWNER)
                                        crew.push({
                                            ...crewObj,
                                            profile_path,
                                        })
                                    }else{
                                        crew.push({
                                            ...crewObj,
                                            profile_path:UNKNOWN_IMAGE
                                        })
                                    }
                                }
                                running_movies.push({
                                    ...movie,
                                    backdrop_path,
                                    poster_path,
                                    cast,
                                    crew
                                })
                            }
                            dataWithImages = {
                                ...removedMovieScreen,
                                running_movies
                            }
                        }
                        console.log("REMOVEDIMG",dataWithImages);
                        return dataWithImages;
                    }else{
                        const error = new Error()
                        error.statusCode = 400;
                        error.reasons = ['Movie is running for some shows.'];
                        throw error
                    }
                }else{
                    const error = new Error()
                    error.statusCode = 400;
                    error.reasons = ['Invalid screen data!!'];
                    throw error;    
                }
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['Invalid screen data!!'];
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