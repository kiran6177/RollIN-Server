import { MongoAdminRepository, MongoTheatreRepository, MongoUserRepository } from '../adapters/repositories/index.js'
import { GoogleUserAuth , AdminLogin ,TheatreSignup, TheatreLogin ,
     CompleteProfile, TheatreGoogleAuth, VerifyTheatre, TheatreResendOTP,
      EmailUserAuth, VerifyUserOtp, GetUsers, UserBlockUnblock, GetTheatres,
       TheatreBlockUnblock, TheatreApprove,
       TheatreProfileUpdate,
       ResendOtpUser,
       UserProfileEdit,
       VerifyProfileOtp,
       UserEmailEdit,
       ResendProfileOtpUser} from '../usecases/index.js'

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
    ResendOtpUser,
    UserProfileEdit,
    UserEmailEdit,
    VerifyProfileOtp,
    ResendProfileOtpUser
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