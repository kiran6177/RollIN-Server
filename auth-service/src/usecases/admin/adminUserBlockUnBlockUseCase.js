export class UserBlockUnblock{
    constructor(dependencies){
        this.userRepository = new dependencies.Repositories.MongoUserRepository()
    }

    async execute(userid){
        try {
            const userExist = await this.userRepository.findUserById(userid)
            console.log(userExist);
            if(userExist){
                const updateUser = await this.userRepository.updateUserById(userid,{isVerified:!userExist.isVerified})
                const updateUserWOP = {
                    id:updateUser._id,
                    email:updateUser.email,
                    mobile:updateUser.mobile,
                    firstname:updateUser.firstname,
                    lastname:updateUser.lastname,
                    isVerified:updateUser.isVerified,
                }
                return updateUserWOP
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['ERROR. Unable to perform this action!!']
                throw error;
            }
        } catch (err) {
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}