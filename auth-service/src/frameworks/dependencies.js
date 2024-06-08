import { MongoAdminRepository, MongoTheatreRepository, MongoUserRepository } from '../adapters/repositories/index.js'
import { GoogleUserAuth , AdminLogin ,TheatreSignup, TheatreLogin ,
     CompleteProfile, TheatreGoogleAuth, VerifyTheatre, TheatreResendOTP,
      EmailUserAuth, VerifyUserOtp, GetUsers, UserBlockUnblock, GetTheatres,
       TheatreBlockUnblock, TheatreApprove,
       TheatreProfileUpdate,
       ResendOtpUser} from '../usecases/index.js'

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
    TheatreBlockUnblock,
    TheatreApprove,
    TheatreProfileUpdate,
    ResendOtpUser
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