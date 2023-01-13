import { IPassengerDetails } from "./vehicleBooking.type";

export interface IRecentBooking{
    from:string;
    to:string;
    date:Date;
    Booking_id:string;
    passengerDetails:IPassengerDetails
}