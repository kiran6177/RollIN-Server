import { MongoTheatreRepository, MongoUserRepository , MongoScreenRepository, MongoReservationRepository} from '../adapters/repositories/index.js'
import { AddScreenUseCase, AddTheatreUseCase, AddUserUseCase, ShowAddedUseCase, TheatreShowBookingGet, TheatreShowCancellation, UpdateScreenUseCase, UpdateTheatreUseCase, UpdateUserUseCase, UserShowDataGet, UserSingleShowDataGet } from '../usecases/index.js'

const ConsumeUseCase = {
    AddUserUseCase,
    AddTheatreUseCase,
    UpdateTheatreUseCase,
    UpdateUserUseCase,
    AddScreenUseCase,
    UpdateScreenUseCase,
    ShowAddedUseCase
}

const Repositories = {
    MongoUserRepository,
    MongoTheatreRepository,
    MongoScreenRepository,
    MongoReservationRepository
}

const UseCase = {
    TheatreShowBookingGet,
    TheatreShowCancellation,
    UserShowDataGet,
    UserSingleShowDataGet
}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies