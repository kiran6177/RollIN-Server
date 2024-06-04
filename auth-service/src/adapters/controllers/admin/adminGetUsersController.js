export class AdminGetUsers{
    constructor(dependencies){
        this.AdminGetUsersUseCase = new dependencies.UseCase.GetUsers(dependencies)
    }

    async getUsers(req,res,next){
        try {
            const usersData = await this.AdminGetUsersUseCase.execute()
            console.log(usersData);
            res.status(200).json(usersData)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}