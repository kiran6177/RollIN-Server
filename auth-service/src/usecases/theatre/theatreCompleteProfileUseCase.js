import { AwsConfig } from "../../utils/aws-s3.js";

export class CompleteProfile{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository();
        this.awsConfig = new AwsConfig();
    }

    async execute(data,files){
        try {
            console.log(data);
            console.log(files);
            let fileLength = files.length;
            let successLength = 0;
            let fileNameArray = []
            for(let file of files){
                console.log(file);
                const filename = Date.now()+file.originalname;
                const trimmed = filename.replace(/\s+/g, "");
                console.log(trimmed);
                fileNameArray.push(trimmed);
               const result = await this.awsConfig.uploadImageOfTheatre(trimmed,file.buffer,file.mimetype)
               if(result){
                console.log("uploaded");
                successLength++;
               }
            }
            console.log(fileLength,successLength);
            if(successLength !== fileLength){
                const error = new Error();
                error.statusCode = 500;
                error.reasons = ['Unable to upload Image. Please retry.'];
                throw error;
            }
            const isExist = await this.theatreRepository.findTheatreById(data.id);
            console.log(isExist);
            if(isExist){
                const dataForUpdate = {
                    name:data.name,
                    images:fileNameArray,
                    location:{
                        coordinates : [ data.latlng.lat , data.latlng.lng]
                    },
                    address:{
                        street:data.street,
                        landmark:data.landmark,
                        city:data.city,
                        state:data.state,
                        pincode:data.pin,
                        completeLocation:data.location
                    },
                    isCompleted:true
    
                }
                if(data.email !== isExist.email){
                    dataForUpdate.email = data.email;
                    dataForUpdate.isVerified = false;
                }
            // console.log("forupdate",dataForUpdate);
            const updated = await this.theatreRepository.updateTheatreById(data.id,dataForUpdate);
                if(updated){
                    const theatreDataWOP = {
                        id:updated._id,
                        name:updated.name,
                        email:updated.email,
                        isCompleted:updated.isCompleted,
                        isVerified:updated.isVerified,
                        isBlocked:updated.isBlocked,
                        isAccepted:updated.isAccepted,
                        authType:updated.authType,
                        location:updated.location,
                        address:updated.address,
                    }
                    return theatreDataWOP
                }else{
                    const error = new Error()
                    error.statusCode = 400;
                    error.reasons = ['Updation Error!!'];
                    throw error;
                }
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['Invalid User!!'];
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