import { UNKNOWN_IMAGE } from "../../config/api.js";
import { AwsConfig } from "../../utils/aws-s3.js";
const MOVIE_OWNER = 'movie';
const PEOPLE_OWNER = 'people'

export class TheatreTierOrderChange{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
        this.awsConfig = new AwsConfig()
    }

    async execute({screen_id,tiers}){
        try {
            console.log(screen_id,tiers);
            if(screen_id && tiers?.length > 0){
                const isValid = await this.screenRepository.findScreenById(screen_id)
                if(isValid){
                    const updatedTiers = await this.screenRepository.updateTiersOrderByScreen(screen_id,tiers)
                    console.log(updatedTiers);
                    return updatedTiers
                }else{
                    const error = new Error()
                    error.statusCode = 400;
                    error.reasons = ['Invalid screen!!'];
                    throw error;
                }
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['Invalid inputs!!'];
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