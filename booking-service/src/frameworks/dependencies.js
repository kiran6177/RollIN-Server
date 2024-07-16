import { MongoTheatreRepository, MongoUserRepository , MongoScreenRepository, MongoReservationRepository, MongoOrderRepository} from '../adapters/repositories/index.js'
import { AddScreenUseCase, AddTheatreUseCase, AddUserUseCase, ShowAddedUseCase, TheatreShowBookingGet, TheatreShowCancellation, UpdateScreenUseCase, UpdateTheatreUseCase, UpdateUserUseCase, UserInitiatePayment, UserProcessPayment, UserReserveSeat, UserShowByMovieGet, UserShowDataGet, UserSingleShowDataGet } from '../usecases/index.js'

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
    MongoReservationRepository,
    MongoOrderRepository
}

const UseCase = {
    TheatreShowBookingGet,
    TheatreShowCancellation,
    UserShowDataGet,
    UserSingleShowDataGet,
    UserShowByMovieGet,
    UserReserveSeat,
    UserInitiatePayment,
    UserProcessPayment
}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies