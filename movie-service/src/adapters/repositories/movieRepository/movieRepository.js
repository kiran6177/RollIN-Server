import {MovieModel} from '../../database/index.js'
class MovieRepository{
    async createMovie(){
        throw new Error('createMovie not implemented')
    }
    async findMovieById(){
        throw new Error('findMovieById not implemented')
    }
    async findMovieByEmail(){
        throw new Error('findMovieByEmail not implemented')
    }
    async updateMovieById(){
        throw new Error('updateMovieById not implemented')
    }
    async findMovieByMovieId(){
        throw new Error('findMovieByMovieId not implemented')
    }
    async GetMoviesAndPeopleWithLimit(){
        throw new Error('GetMoviesAndPeopleWithLimit not implemented')
    }
}

export class MongoMovieRepository extends MovieRepository{

    async createMovie(data){
        try {
            const movie = new MovieModel(data)
            return await movie.save();
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async findMovieByMovieId(id){
        try {
            return await MovieModel.findOne({movie_id:id})
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }

    async GetMoviesAndPeopleWithLimit(skip,limit){
        try {
            return await MovieModel.find().skip(skip).limit(limit).populate('cast.cast_id').populate('crew.crew_id').lean();
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
}