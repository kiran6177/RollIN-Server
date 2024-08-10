import { MongoTheatreRepository, MongoUserRepository , MongoScreenRepository, MongoReservationRepository, MongoOrderRepository} from '../adapters/repositories/index.js'
import { AddScreenUseCase, AddTheatreUseCase, AddUserUseCase, AdminHighGrossMoviesGet, ShowAddedUseCase, TheatreCompleteOrdersGet, TheatreLatestOrdersGet, TheatreMovieCollectionGet, TheatreScreenBookingsGet, TheatreScreenCollectionGet, TheatreSeatBook, TheatreShowBookingGet, TheatreShowCancellation, TheatreSingleShowGet, UpdateMovieStatusUseCase, UpdateScreenUseCase, UpdateTheatreUseCase, UpdateUserUseCase, UserInitiatePayment, UserOrdersGet, UserProcessPayment, UserRecommendedMoviesGet, UserReserveSeat, UserShowByMovieGet, UserShowDataGet, UserSingleShowDataGet, UserUpcomingMoviesGet } from '../usecases/index.js'

const ConsumeUseCase = {
    AddUserUseCase,
    AddTheatreUseCase,
    UpdateTheatreUseCase,
    UpdateUserUseCase,
    AddScreenUseCase,
    UpdateScreenUseCase,
    ShowAddedUseCase,
    UpdateMovieStatusUseCase
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
    TheatreSeatBook,
    UserUpcomingMoviesGet,
    UserRecommendedMoviesGet,
    TheatreScreenCollectionGet,
    TheatreMovieCollectionGet,
    TheatreLatestOrdersGet,
    AdminHighGrossMoviesGet
}

const dependencies = {
    UseCase,
    ConsumeUseCase,
    Repositories
}

export default dependencies