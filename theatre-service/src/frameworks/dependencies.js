import { AddTheatreUseCase, AddUserUseCase, TheatreMovieEnroll, TheatreMovieExtend, TheatreMovieRemove, TheatreScreenAdd, TheatreScreenDataGet, TheatreScreenEdit, TheatreShowMovieChange, TheatreTierEdit, TheatreTierOrderChange, UpdateTheatreUseCase, UpdateUserUseCase, UserSingleTheatreGet, UserTheatresGet } from '../usecases/index.js'
import { MongoScreenRepository, MongoTheatreRepository , MongoUserRepository } from '../adapters/repositories/index.js'

const ConsumeUseCase = {
    AddUserUseCase,
    AddTheatreUseCase,
    UpdateTheatreUseCase,
    UpdateUserUseCase
}

const Repositories = {
    MongoTheatreRepository,
    MongoUserRepository,
    MongoScreenRepository
}

const UseCase = {
    UserTheatresGet,
    TheatreScreenDataGet,
    TheatreScreenAdd,
    TheatreMovieEnroll,
    TheatreScreenEdit,
    TheatreMovieRemove,
    TheatreMovieExtend,
    TheatreTierEdit,
    TheatreTierOrderChange,
    UserSingleTheatreGet,
    TheatreShowMovieChange
}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies