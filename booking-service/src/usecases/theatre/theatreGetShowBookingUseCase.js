export class TheatreShowBookingGet{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
        this.reservationRepository = new dependencies.Repositories.MongoReservationRepository()
    }

    async execute({screen_id,showdata}){
        try {
            console.log(screen_id,showdata);
            const {showtime,_id} = showdata
            if(screen_id){
                const screenValid = await this.screenRepository.findScreenById(screen_id)
                if(screenValid){
                    const bookingData = await this.reservationRepository.getShowReservations(showtime,_id)
                    let hasBookings = false;
                    let hasData = false;
                    let hasFilledBookings = false;
                    let hasFilledDates = 0;
                    if(bookingData?.length > 0){
                        hasData = true
                        const dates = new Set();
                        for(let doc of bookingData){
                            if(doc?.reservations?.length > 0){
                                for(let seatObj of doc.reservations){
                                    Object.values(seatObj)[0].map(obj=>{
                                        if(obj.status !== 'INVALID' && obj.status !== 'AVAILABLE'){
                                            dates.add(doc.reserved_date)
                                        }
                                    })
                                }
                            }
                        }
                        console.log("DAATES",dates);
                        if(dates?.size > 0){
                            hasBookings = true;
                        }
                        if(dates?.size === bookingData.length){
                            hasFilledBookings = true;
                            hasFilledDates = dates.size;
                        }
                    }
                    return {hasBookings,hasData,hasFilledBookings,hasFilledDates}
                 }else{
                    const error = new Error()
                    error.statusCode = 400;
                    error.reasons = ['Invalid screen data!!'];
                    throw error;
                }
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['Invalid screen data!!'];
                throw error;
            }
        } catch (err) {
            console.log(err);
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}