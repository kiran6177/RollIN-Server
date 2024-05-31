import { MongoAdminRepository, MongoTheatreRepository, MongoUserRepository } from '../adapters/repositories/index.js'
import { GoogleUserAuth , AdminLogin ,TheatreSignup, TheatreLogin , CompleteProfile} from '../usecases/index.js'

const UseCase = {
    GoogleUserAuth,
    AdminLogin,
    TheatreSignup,
    TheatreLogin,
    CompleteProfile
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