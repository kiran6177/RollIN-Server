import { UNKNOWN_IMAGE } from "../../config/constants/movieApi.js";
import { AwsConfig } from "../../utils/aws-s3.js";
const MOVIE_OWNER = 'movie';
const PEOPLE_OWNER = 'people'

export class UserMoviesByGenreGet{
    constructor(dependencies){
        this.movieRepository = new dependencies.Repositories.MongoMovieRepository()
        this.awsConfig = new AwsConfig()
    }

    async execute(){
        try {
            const movieByGenre = await this.movieRepository.findMoviesByGenreWithLimit(10)
            let moviesOutput = []
            for(let genreMovie of movieByGenre){
                let reGenreMovies = []
                for(let movie of genreMovie?.movies){
                    const backdrop_path = await this.awsConfig.getImage(movie.backdrop_path,MOVIE_OWNER)
                    const poster_path = await this.awsConfig.getImage(movie.poster_path,MOVIE_OWNER)
                    let castDataImg = []
                    let crewDataImg = []
                    // let genres = []
                    //     for(let genre of movie.genres){
                    //         genres.push(genre.name)
                    //     }
    
                        for(let castData of movie.cast){
                                let profile_path;
                                if(castData?.cast_id?.profile_path){
                                    let url = await this.awsConfig.getImage(castData.cast_id.profile_path,PEOPLE_OWNER)
                                    if(url){
                                        profile_path = url;
                                    }else{
                                        profile_path = UNKNOWN_IMAGE
                                    }
                                }else{
                                    profile_path = UNKNOWN_IMAGE
                                }
                                castDataImg.push({
                                    ...castData.cast_id,
                                    profile_path,
                                    character:castData.character
                                })
                        }
    
                        for(let crewData of movie.crew){
                            let profile_path;
                                if(crewData?.crew_id?.profile_path){
                                    let url = await this.awsConfig.getImage(crewData.crew_id.profile_path,PEOPLE_OWNER)
                                    if(url){
                                        profile_path = url;
                                    }else{
                                        profile_path = UNKNOWN_IMAGE
                                    }
                                }else{
                                    profile_path = UNKNOWN_IMAGE
                                }
                                crewDataImg.push({
                                    ...crewData.crew_id,
                                    profile_path,
                                })
                        }
                    let release_date = new Date(movie.release_date)
                    reGenreMovies.push({
                        ...movie,
                        backdrop_path,
                        poster_path,
                        genres:[movie.genres],
                        release_date:release_date.getFullYear()+'-'+((release_date.getMonth()+1) < 10 ? '0'+(release_date.getMonth()+1) : release_date.getMonth()+1)+'-'+release_date.getDate(),
                        cast:castDataImg,
                        crew:crewDataImg
                    })
                }
                if(moviesOutput.length < 4){
                    moviesOutput.push({
                        genre:genreMovie._id,
                        movies:reGenreMovies
                    })
                }
            }
            console.log(moviesOutput);
            return moviesOutput
        }catch (err) {
            console.log(err);
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}