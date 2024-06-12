import { AddTheatreUseCase, AddUserUseCase, UpdateTheatreUseCase, UpdateUserUseCase } from '../usecases/index.js'
import { MongoTheatreRepository , MongoUserRepository } from '../adapters/repositories/index.js'

const ConsumeUseCase = {
    AddUserUseCase,
    AddTheatreUseCase,
    UpdateTheatreUseCase,
    UpdateUserUseCase
}

const Repositories = {
    MongoTheatreRepository,
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