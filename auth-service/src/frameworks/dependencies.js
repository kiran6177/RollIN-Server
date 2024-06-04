import { MongoAdminRepository, MongoTheatreRepository, MongoUserRepository } from '../adapters/repositories/index.js'
import { GoogleUserAuth , AdminLogin ,TheatreSignup, TheatreLogin , CompleteProfile, TheatreGoogleAuth, VerifyTheatre, TheatreResendOTP, EmailUserAuth, VerifyUserOtp, GetUsers, UserBlockUnblock, GetTheatres, TheatreBlockUnblock} from '../usecases/index.js'

const UseCase = {
    GoogleUserAuth,
    AdminLogin,
    TheatreSignup,
    TheatreLogin,
    CompleteProfile,
    TheatreGoogleAuth,
    VerifyTheatre,
    TheatreResendOTP,
    EmailUserAuth,
    VerifyUserOtp,
    GetUsers,
    UserBlockUnblock,
    GetTheatres,
    TheatreBlockUnblock
}

const Repositories = {
    MongoUserRepository,
    MongoAdminRepository,
    MongoTheatreRepository
}

const dependencies = {
    UseCase,
    Repositories
}


export default dependencies