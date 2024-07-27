import { UNKNOWN_IMAGE } from "../../config/api.js";
import { BOOKING_TOPIC, MOVIE_TOPIC, TYPE_MOVIESTATUS_CHANGED, TYPE_SCREEN_UPDATED, TYPE_SHOWMOVIE_ADDED } from "../../events/config.js";
import { KafkaService } from "../../events/kafkaclient.js";
import { AwsConfig } from "../../utils/aws-s3.js"
const MOVIE_OWNER = 'movie';
const PEOPLE_OWNER = 'people'

export class TheatreShowMovieChange{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
        this.awsConfig = new AwsConfig()
        this.kafkaClient = new KafkaService()
    }

    async execute({screen_id,showdata}){
        try {
            if(screen_id){
                const screenValid = await this.screenRepository.findScreenById(screen_id)
                if(screenValid){
                    const updateShowMovie = await this.screenRepository.updateShowByScreen(screen_id,showdata)
                    console.log(updateShowMovie);
                    this.kafkaClient.produceMessage(BOOKING_TOPIC,{
                        type:TYPE_SCREEN_UPDATED,
                        value:JSON.stringify(updateShowMovie)
                    })
                    if(updateShowMovie && showdata?.movie_id){
                        await this.screenRepository.updateMovieStatusByMovieId(screen_id,showdata.movie_id,true)
                        this.kafkaClient.produceMessage(BOOKING_TOPIC,{
                            type:TYPE_MOVIESTATUS_CHANGED,
                            value:JSON.stringify({screen_id,movie_id:showdata.movie_id,status:true})
                        })
                        this.kafkaClient.produceMessage(MOVIE_TOPIC,{
                            type:TYPE_MOVIESTATUS_CHANGED,
                            value:JSON.stringify({screen_id,movie_id:showdata.movie_id,status:true})
                        })
                        this.kafkaClient.produceMessage(BOOKING_TOPIC,{
                            type:TYPE_SHOWMOVIE_ADDED,
                            value:JSON.stringify({screenData:updateShowMovie,showdata})
                        })
                    }
                    // else{
                    //     let movie_id ;
                    //     screenValid.showtimes.forEach(showObj => {
                    //         if(showObj._id.toString() === showdata._id.toString()){
                    //             movie_id = showObj.movie_id
                    //         }
                    //     });
                    //     console.log("MOVIEID",movie_id);
                    //     await this.screenRepository.updateMovieStatusByMovieId(screen_id,movie_id,false)
                    //     this.kafkaClient.produceMessage(BOOKING_TOPIC,{
                    //         type:TYPE_MOVIESTATUS_CHANGED,
                    //         value:JSON.stringify({screen_id,movie_id:movie_id,status:false})
                    //     })
                    //     this.kafkaClient.produceMessage(MOVIE_TOPIC,{
                    //         type:TYPE_MOVIESTATUS_CHANGED,
                    //         value:JSON.stringify({screen_id,movie_id:movie_id,status:false})
                    //     })
                    // }
                    let dataWithImages = updateShowMovie
                    if(updateShowMovie?.running_movies?.length > 0){
                        let running_movies = []
                        for(let movie of updateShowMovie.running_movies){
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
                            ...updateShowMovie,
                            running_movies
                        }
                    }
                    return dataWithImages
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