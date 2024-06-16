import { MongoMovieRepository, MongoPersonRepository, MongoTheatreRepository, MongoUserRepository } from '../adapters/repositories/index.js'
import { AddTheatreUseCase, AddUserUseCase, AdminAllTMDBMoviesGet, AdminMovieToDBAdd, AdminMoviesFromDBGet, AdminTMDBMovieDetailGet, UpdateTheatreUseCase, UpdateUserUseCase } from '../usecases/index.js'

const ConsumeUseCase = {
    AddUserUseCase,
    AddTheatreUseCase,
    UpdateTheatreUseCase,
    UpdateUserUseCase
}

const Repositories = {
    MongoUserRepository,
    MongoTheatreRepository,
    MongoPersonRepository,
    MongoMovieRepository
}

const UseCase = {
    AdminAllTMDBMoviesGet,
    AdminTMDBMovieDetailGet,
    AdminMovieToDBAdd,
    AdminMoviesFromDBGet
}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies