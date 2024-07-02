import { AwsConfig } from "../../../utils/aws-s3.js";
const THEATRE_OWNER = 'theatre';

export class TheatreChangeTierOrder{
    constructor(dependencies){
        this.theatreChangeTierOrderUseCase = new dependencies.UseCase.TheatreTierOrderChange(dependencies)
        this.awsConfig = new AwsConfig()
    }

    async changeTierOrder(req,res,next){
        try {
            const key = req.body?.key || null;
            const resultData = await this.theatreChangeTierOrderUseCase.execute(req.body);
            const dataToFrontend = {
                resultData,
            }
            if(key){
                dataToFrontend.key = key;
            }
            if(req?.newTheatreToken){
                let images =  []
                if(req.theatre && req.theatre.images && req.theatre.images.length > 0){
                    for(let image of req.theatre.images){
                        const url = await this.awsConfig.getImage(image,THEATRE_OWNER)
                        images.push({filename:image,url})
                    }
                }
                dataToFrontend.newTheatreToken = req?.newTheatreToken
                dataToFrontend.newTheatreData = {...req?.theatre,images}
            }
            res.status(200).json(dataToFrontend)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}