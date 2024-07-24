import { MongoTheatreRepository, MongoUserRepository , MongoScreenRepository, MongoReservationRepository, MongoOrderRepository} from '../adapters/repositories/index.js'
import { AddScreenUseCase, AddTheatreUseCase, AddUserUseCase, ShowAddedUseCase, TheatreCompleteOrdersGet, TheatreScreenBookingsGet, TheatreSeatBook, TheatreShowBookingGet, TheatreShowCancellation, TheatreSingleShowGet, UpdateScreenUseCase, UpdateTheatreUseCase, UpdateUserUseCase, UserInitiatePayment, UserOrdersGet, UserProcessPayment, UserReserveSeat, UserShowByMovieGet, UserShowDataGet, UserSingleShowDataGet } from '../usecases/index.js'

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
    UserProcessPayment,
    UserOrdersGet,
    TheatreScreenBookingsGet,
    TheatreSingleShowGet,
    TheatreCompleteOrdersGet,
    TheatreSeatBook
}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies