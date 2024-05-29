import { MongoAdminRepository, MongoUserRepository } from '../adapters/repositories/index.js'
import { GoogleUserAuth , AdminLogin } from '../usecases/index.js'

const UseCase = {
    GoogleUserAuth,
    AdminLogin
}

const Repositories = {
    MongoUserRepository,
    MongoAdminRepository
}

const dependencies = {
    UseCase,
    Repositories
}


export default dependencies