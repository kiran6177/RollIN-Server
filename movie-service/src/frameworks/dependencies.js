import { MongoMovieRepository, MongoPersonRepository, MongoTheatreRepository, MongoUserRepository } from '../adapters/repositories/index.js'
import { AddMovieToTheatre, AddTheatreUseCase, AddUserUseCase, AdminAllTMDBMoviesGet, AdminMovieDisable, AdminMovieEnable, AdminMovieToDBAdd, AdminMoviesFromDBGet, AdminPersonsFromDBGet, AdminTMDBMovieDetailGet, RemoveMovieFromTheatre, TheatreAllMoviesGet, UpdateTheatreUseCase, UpdateUserUseCase, UserAllMoviesWithFilterGet, UserBannerMoviesGet, UserMoviesByGenreGet, UserPersonGet, UserRecommendedMoviesGet, UserSingleMovieGet } from '../usecases/index.js'

const ConsumeUseCase = {
    AddUserUseCase,
    AddTheatreUseCase,
    UpdateTheatreUseCase,
    UpdateUserUseCase,
    AddMovieToTheatre,
    RemoveMovieFromTheatre
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
    TheatreAllMoviesGet,
    UserRecommendedMoviesGet,
    UserPersonGet,
    UserSingleMovieGet,
    AdminMovieDisable,
    AdminMovieEnable
}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies