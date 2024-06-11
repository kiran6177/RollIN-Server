import { MongoUserRepository } from '../adapters/repositories/index.js'
import { AddUserUseCase } from '../usecases/index.js'

const ConsumeUseCase = {
    AddUserUseCase
}

const Repositories = {
    MongoUserRepository
}

const UseCase = {

}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies