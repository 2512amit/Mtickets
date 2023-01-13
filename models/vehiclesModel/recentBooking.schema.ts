import { model, Document } from "mongoose";
import { IRecentBooking } from "../../types/recentBooking.type";
import { BaseSchema } from "../../utils/base.schema";

export const recentBookingSchema=new BaseSchema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    bookingId:{
        type:String,
    },

    passengerDetails:{
      type:[
        {
          passengerName:{
            type:String,
            required:true
          },
          passengerAge:{
            type:Number,
          required:true
        },
          passengerGender:{
            type:String,
            required:true
          },
          passengerSeat:{
            type:String,
            required:true
          },
         totalFare:{
            type:Number,
            required:true
         },
          email:{
            type:String,
            required:true
          },
        }
      ],
      default:undefined
    }

})


type IRecentBookingDocument = Document & IRecentBooking
const RecentBookingModel = model<IRecentBookingDocument>("recentBooking",recentBookingSchema );
export default RecentBookingModel;