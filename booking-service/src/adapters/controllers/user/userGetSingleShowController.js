import { AwsConfig } from "../../../utils/aws-s3.js";
const THEATRE_OWNER = 'theatre';

export class UserGetSingleShowData{
    constructor(dependencies){
        this.userGetSingleShowDataUseCase = new dependencies.UseCase.UserSingleShowDataGet(dependencies)
        this.awsConfig = new AwsConfig()
    }

    async getSingleShowData(req,res,next){
        try {
            const resultData = await this.userGetSingleShowDataUseCase.execute(req.body);
            const dataToFrontend = {
                resultData,
            }
            if(req?.newUserToken){
                dataToFrontend.newUserToken = req?.newUserToken
                dataToFrontend.newUserData = req?.user
            }
            res.status(200).json(dataToFrontend)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}