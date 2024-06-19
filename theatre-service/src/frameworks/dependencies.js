import { AddTheatreUseCase, AddUserUseCase, UpdateTheatreUseCase, UpdateUserUseCase, UserTheatresGet } from '../usecases/index.js'
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
    UserTheatresGet
}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies