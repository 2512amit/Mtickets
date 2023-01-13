import  { model, Document } from "mongoose";
import { IRecentSearch } from "../../types/recentSearch.type";

import { BaseSchema } from "../../utils/base.schema";

export const recentSearchSchema=new BaseSchema({
    vehicleClassType:{
        type:String,
    },
    vehicleNumber:{
        type:String,
    },
    station: {
        type:Array, 
    },
    TotalAvailableSeat:{
        type:String,
        required:true
    },
    vehicleName:{
        type:String,
        required:true
    },
    dayOnWhichItRuns:{
        type:Array,
        required:true
    },
    totalDistance:{
       type:Number  
    },
    totalTravelTime:{
       type:Number  
    },
    totalFare:{
        type:Number 
    }

})


type IRecentSearchDocument = Document & IRecentSearch
const RecentSearchModel = model<IRecentSearchDocument>("recentSearch", recentSearchSchema);
export default RecentSearchModel;