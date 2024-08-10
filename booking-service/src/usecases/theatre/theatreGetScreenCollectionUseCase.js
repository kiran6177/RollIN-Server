import { getMonthRange, getSevenDayRange, getWeekRange, getYearRange } from "../../utils/getRange.js";

class GetCollections{
    constructor(dependencies){
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
        this.orderRepository = new dependencies.Repositories.MongoOrderRepository()
    }

    async getCollections(type,dateRanges,screens){
        try {
            let resultObj = new Map();
            if(screens?.length > 0){
                for(let screenId of screens){
                    const screenData = await this.screenRepository.findScreenById(screenId);
                    for(let {startDate,endDate} of dateRanges){
                        const getTotalAmount = await this.orderRepository.getCollectionByScreenInRange(screenId.toString(),startDate,endDate)
                        let dateString ;
                        if(type === "DAILY"){
                            dateString = endDate.toLocaleDateString('en-US',{month:'long',day:'numeric'})
                        }else if(type === "WEEKLY"){
                            let startDateString = startDate.toLocaleDateString('en-US',{month:'long',day:'numeric'})
                            let endDateString = endDate.toLocaleDateString('en-US',{month:'long',day:'numeric'})
                            dateString = startDateString+ ' - ' + endDateString ;
                        }else if(type === "MONTHLY"){
                            dateString = startDate.toLocaleDateString('en-US',{month:'long'})
                        }else if(type === 'YEARLY'){
                            dateString = endDate.toLocaleDateString('en-US',{year:'numeric'})
                            console.log("DATESTRING",dateString);
                            
                        }
                        if(getTotalAmount?.length < 1){
                            if(resultObj.has(dateString)){
                                resultObj.set(dateString,[...resultObj.get(dateString),{screenId,screen:screenData?.name || null,totalAmount:getTotalAmount[0]?.totalAmount || 0}])
                            }else{
                                resultObj.set(dateString,[{screenId,screen:screenData?.name || null,totalAmount:getTotalAmount[0]?.totalAmount || 0}])
                            }
                        }else{
                            if(resultObj.has(dateString)){
                                resultObj.set(dateString,[...resultObj.get(dateString),{screenId,screen:screenData?.name || null,totalAmount:getTotalAmount[0]?.totalAmount || 0}])
                            }else{
                                resultObj.set(dateString,[{screenId,screen:screenData?.name || null,totalAmount:getTotalAmount[0]?.totalAmount || 0}])
                            }
                        }
                    }
                }
            }else{
                for(let {endDate} of dailyRange){
                    let dateString ;
                    if(type === "DAILY"){
                        dateString = endDate.toLocaleDateString('en-US',{month:'long',day:'numeric'})
                    }else if(type === "WEEKLY"){
                        let startDateString = startDate.toLocaleDateString('en-US',{month:'long',day:'numeric'})
                        let endDateString = endDate.toLocaleDateString('en-US',{month:'long',day:'numeric'})
                        dateString = startDateString+ ' - ' + endDateString ;
                    }else if(type === "MONTHLY"){
                        dateString = endDate.toLocaleDateString('en-US',{month:'long'})
                    }else if(type === 'YEARLY'){
                        dateString = endDate.toLocaleDateString('en-US',{year:'numeric'})
                    }
                    if(resultObj.has(dateString)){
                        resultObj.set(dateString,[...resultObj.get(dateString),{screenId:null,screen:null,totalAmount:0}])
                    }else{
                        resultObj.set(dateString,[{screenId:null,screen:null,totalAmount:0}])
                    }
                }
            } 
            return Array.from(resultObj)
        } catch (err) {
            console.log(err);
            const error = new Error()
            error.statusCode = err.statusCode;
            error.reasons = err.reasons;
            throw error;
        }
    }
}

export class TheatreScreenCollectionGet{
    constructor(dependencies){
        this.theatreRepository = new dependencies.Repositories.MongoTheatreRepository()
        this.screenRepository = new dependencies.Repositories.MongoScreenRepository()
        this.orderRepository = new dependencies.Repositories.MongoOrderRepository()
        this.getCollectionsHelper = new GetCollections(dependencies)
    }

    async execute({dataFrame},{id}){
        try {
            if(dataFrame && id){
                let now = new Date()
                let screenData = await this.theatreRepository.findTheatreById(id)
                const screens = screenData?.screens || [];
                let resultData = [];
                switch (dataFrame){
                    case "DAILY":
                        const dailyRange = await getSevenDayRange(now)
                        resultData = await this.getCollectionsHelper.getCollections("DAILY",dailyRange,screens)

                        break;
                    case "WEEKLY":
                        const weekRange = await getWeekRange(now)
                        resultData = await this.getCollectionsHelper.getCollections("WEEKLY",weekRange,screens)
                        break;
                    case "MONTHLY":
                        const monthRange = await getMonthRange(now);
                        resultData = await this.getCollectionsHelper.getCollections("MONTHLY",monthRange,screens)
                        break;
                    case "YEARLY":
                        const yearRange = await getYearRange(now)
                        resultData = await this.getCollectionsHelper.getCollections("YEARLY",yearRange,screens)
                        break;    
                }
                console.log(resultData);
                return resultData
            }else{
                const error = new Error()
                error.statusCode = 400;
                error.reasons = ['Invalid Inputs!!'];
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