export class CompleteProfile{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository();
    }

    async execute(data){
        try {
            console.log(data);
            const isExist = await this.theatreRepository.findTheatreById(data.id);
            console.log(isExist);
            if(isExist){
                const dataForUpdate = {
                    name:data.name,
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
            console.log(dataForUpdate);
            const updated = await this.theatreRepository.updateTheatreById(data.id,dataForUpdate);
                if(updated){
                    const theatreDataWOP = {
                        id:updated._id,
                        name:updated.name,
                        email:updated.email,
                        isCompleted:updated.isCompleted,
                        isVerified:updated.isVerified,
                        isBlocked:updated.isBlocked,
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