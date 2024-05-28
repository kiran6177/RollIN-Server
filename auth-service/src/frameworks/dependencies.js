import { MongoUserRepository } from '../adapters/repositories/index.js'
import { GoogleUserAuth } from '../usecases/index.js'

const UseCase = {
    GoogleUserAuth,
}

const Repositories = {
    MongoUserRepository
}

const dependencies = {
    UseCase,
    Repositories
}


export default dependencies