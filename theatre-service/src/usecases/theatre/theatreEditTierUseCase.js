import { UNKNOWN_IMAGE } from "../../config/api.js";
import { AwsConfig } from "../../utils/aws-s3.js";
const MOVIE_OWNER = 'movie';
const PEOPLE_OWNER = 'people'

export class TheatreTierEdit{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
        this.awsConfig = new AwsConfig()
    }

    async execute({screen_id,tier_id,tierdata}){
        try {
            console.log(screen_id,tier_id,tierdata);
            if(screen_id && tier_id && tierdata){
                const isValid = await this.screenRepository.findScreenById(screen_id)
                if(isValid){
                    if(tierdata?.name && tierdata?.seats && tierdata?.columns && 
                        tierdata?.layout && tierdata?.horizontal_partition && tierdata?.order && tierdata?.rate){
                            const updatedTier = await this.screenRepository.updateTierByIds(screen_id,tier_id,tierdata);
                            console.log(updatedTier);
                            return updatedTier
                    }else{
                        const error = new Error()
                        error.statusCode = 400;
                        error.reasons = ['Invalid inputs!!'];
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