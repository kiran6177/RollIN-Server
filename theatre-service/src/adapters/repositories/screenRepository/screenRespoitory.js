import { ScreenModel } from '../../database/index.js'
import { ObjectId } from 'mongodb'

class ScreenRepository{
    async addScreen(){
        throw new Error('addScreen not implemented')
    }
    async enrollMovie(){
        throw new Error('enrollMovie not implemented')
    }
    async findScreenById(){
        throw new Error('findScreenById not implemented')
    }
    async findScreenAndUpdate(){
        throw new Error('findScreenAndUpdate not implemented')
    }
    async removeMovie(){
        throw new Error('removeMovie not implemented')
    }
    async extendMovie(){
        throw new Error('extendMovie not implemented')
    }
    async findMovieRunning(){
        throw new Error('findMovieRunning not implemented')
    }
    async findMovieEnrolled(){
        throw new Error('findMovieEnrolled not implemented')
    }
}

export class MongoScreenRepository extends ScreenRepository{
    async addScreen(data){
        try {
            return await ScreenModel.create(data)
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }

    async enrollMovie(id,data){
        try {
            return await ScreenModel.findByIdAndUpdate({_id:id},{$push:{running_movies:data}},{new:true}).lean()
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async findScreenById(id){
        try {
            return await ScreenModel.findById({_id:id})
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async findScreenAndUpdate(id,data){
        try {
            return await ScreenModel.findByIdAndUpdate({_id:id},{$set:data},{new:true}).lean()
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async removeMovie(screen_id,movie_id){
        try {
            return await ScreenModel.findByIdAndUpdate({_id:screen_id},{$pull:{running_movies:{movie_id:movie_id}}},{new:true}).lean()
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async findMovieRunning(screen_id,movie_id){
        try {
            return await ScreenModel.aggregate([{$match:{_id:new ObjectId(screen_id)}},{$unwind:'$showtimes'},{$match:{'showtimes.movie_id':movie_id}}])
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async findMovieEnrolled(screen_id,movie_id){
        try {
            return await ScreenModel.aggregate([{$match:{_id:new ObjectId(screen_id)}},{$unwind:'$running_movies'},{$match:{'running_movies.movie_id':movie_id}}])
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }
    async extendMovie(screen_id,movie_id,date){
        try {
            return await ScreenModel.findOneAndUpdate({_id:screen_id,'running_movies.movie_id':movie_id},{$set:{'running_movies.$.enroll_to':date}},{new:true}).lean()
        } catch (err) {
            console.log(err);
            const error = new Error();
            error.statusCode = 500;
            error.reasons = [err.message]
            throw error
        }
    }

}