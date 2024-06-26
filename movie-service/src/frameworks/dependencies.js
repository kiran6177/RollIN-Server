import { MongoMovieRepository, MongoPersonRepository, MongoTheatreRepository, MongoUserRepository } from '../adapters/repositories/index.js'
import { AddTheatreUseCase, AddUserUseCase, AdminAllTMDBMoviesGet, AdminMovieToDBAdd, AdminMoviesFromDBGet, AdminPersonsFromDBGet, AdminTMDBMovieDetailGet, TheatreAllMoviesGet, UpdateTheatreUseCase, UpdateUserUseCase, UserAllMoviesWithFilterGet, UserBannerMoviesGet, UserMoviesByGenreGet } from '../usecases/index.js'

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
    AdminMoviesFromDBGet,
    AdminPersonsFromDBGet,
    UserBannerMoviesGet,
    UserMoviesByGenreGet,
    UserAllMoviesWithFilterGet,
    TheatreAllMoviesGet
}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies