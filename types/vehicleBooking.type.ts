
export interface IvehicleBooking {
 vechileId: string;
 passengerDetails:IPassengerDetails[],
}

export interface IPassengerDetails{
  passengerName: string;
  passengerAge:number;
  passengerGender:string;
  passengerSeat:string;
  seat_booking_status:boolean;
  payment_status:boolean;
  email:string;
  phoneNumber:number;
  userId:string;
  bookingId:string;
  from:string;
  to:string;
  departureDate:Date;
  departureTime:string;
  arrivalDate:Date;
  arrivalTime:string;
  
}

