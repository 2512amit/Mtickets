import { Router } from "express";
import vehicleBookingController from "../controllers/vehicle/vehicleBooking.controller";


export const vehicleBookingRouter=Router()
vehicleBookingRouter.put('/newPassenger/:id',vehicleBookingController.addNewPassengers)
vehicleBookingRouter.post('/paymentStatus/:bookingId',vehicleBookingController.getPaymentDetails),
vehicleBookingRouter.post('/',vehicleBookingController.vehicleBookingController),
// vehicleBookingRouter.get('/seatStatus/:userId',vehicleBookingController.seatStatus),
vehicleBookingRouter.get('/getSeatStatus/:id/:seatid?',vehicleBookingController.getSeatStatus),
vehicleBookingRouter.get('/recentlyBookedTicket/:userId',vehicleBookingController.getRecentlyBookedTicket),
vehicleBookingRouter.get('/:bookingId',vehicleBookingController.getResultWithSameBookingId)
