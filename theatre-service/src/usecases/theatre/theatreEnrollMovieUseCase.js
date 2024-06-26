import { UNKNOWN_IMAGE } from "../../config/api.js";
import { GENRES } from "../../config/constants/movie-constants/genres.js";
import { AwsConfig } from "../../utils/aws-s3.js";
const MOVIE_OWNER = 'movie';
const PEOPLE_OWNER = 'people'


export class TheatreMovieEnroll{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
        this.awsConfig = new AwsConfig()
    }

    async execute({screen_id,movie,enroll_from,enroll_to}){
        try {
            console.log(screen_id);
            if(screen_id ){
                const isValid = await this.screenRepository.findScreenById(screen_id)
                if(isValid){
                    if(movie){
                        if((enroll_from && enroll_to)&& (enroll_to > enroll_from)){
                            console.log("VALID");

                            const runningNow = await this.screenRepository.findMovieEnrolled(screen_id,movie._id)
                            console.log(runningNow);
                            if(runningNow?.length === 0){
                                const genres = [];
                                GENRES.map(genreObj=>{
                                    movie.genres.map(genre=>{
                                        if(genre === genreObj.name){
                                            genres.push(genreObj)
                                        }
                                    })
                                })
                                const cast = []
                                for(let castObj of movie.cast){
                                    cast.push({
                                        ...castObj,
                                        profile_path:castObj.profile_path.split('?')[0].split('/').reverse()[0] != 'images' ? castObj.profile_path.split('?')[0].split('/').reverse()[0] : null
                                    })
                                }
                                const crew = []
                                for(let crewObj of movie.crew){
                                    crew.push({
                                        ...crewObj,
                                        profile_path:crewObj.profile_path.split('?')[0].split('/').reverse()[0] != 'images' ? crewObj.profile_path.split('?')[0].split('/').reverse()[0] : null
                                    })
                                }
    
                                const data = {
                                    movie_id:movie?._id,
                                    title:movie?.title,
                                    language:movie?.language,
                                    overview:movie?.overview,
                                    release_date:new Date(movie?.release_date),
                                    popularity:movie?.popularity,
                                    rating:movie?.rating,
                                    genres,
                                    crew,
                                    cast,
                                    video_link:movie?.video_link,
                                    runtime:movie?.runtime,
                                    backdrop_path:movie?.backdrop_path.split('?')[0].split('/').reverse()[0],
                                    poster_path:movie?.poster_path.split('?')[0].split('/').reverse()[0],
                                    enroll_from,
                                    enroll_to
                                }
                                console.log(data);
                                const enrolledMovieResult = await this.screenRepository.enrollMovie(screen_id,data);
                                console.log(enrolledMovieResult);
                                let dataWithImages = {}
                                if(enrolledMovieResult?.running_movies?.length > 0){
                                    let running_movies = []
                                    for(let movie of enrolledMovieResult.running_movies){
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
                                        ...enrolledMovieResult,
                                        running_movies
                                    }
                                }
                                console.log("IMGDAAAA",dataWithImages);
                                return dataWithImages;
                            }else{
                                const error = new Error()
                                error.statusCode = 400;
                                error.reasons = ['Movie already enrolled!!'];
                                throw error;
                            }
                            
                        }else{
                            const error = new Error()
                            error.statusCode = 400;
                            error.reasons = ['Invalid date range!!'];
                            throw error;
                        }
                    }else{
                        const error = new Error()
                        error.statusCode = 400;
                        error.reasons = ['Invalid movie data!!'];
                        throw error;
                    }
                }else{
                    const error = new Error()
                    error.statusCode = 400;
                    error.reasons = ['Invalid screen!!'];
                    throw error;
                }
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['Invalid screen id!!'];
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