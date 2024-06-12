import { MongoTheatreRepository, MongoUserRepository } from '../adapters/repositories/index.js'
import { AddTheatreUseCase, UpdateTheatreUseCase, UpdateUserUseCase } from '../usecases/index.js'
import { AddUserUseCase } from '../usecases/index.js'

const ConsumeUseCase = {
    AddUserUseCase,
    AddTheatreUseCase,
    UpdateTheatreUseCase,
    UpdateUserUseCase
}

const Repositories = {
    MongoUserRepository,
    MongoTheatreRepository
}

const UseCase = {

}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies