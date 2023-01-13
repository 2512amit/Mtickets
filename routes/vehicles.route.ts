import { Router } from "express";
import vehicleControllers from "../controllers/vehicle/vehicle.controllers";
import { IVehicles } from "../types/vehicles.type";

export const vehicleRouter = Router();
vehicleRouter.post('/stationName',vehicleControllers.createStationName)

vehicleRouter.post("/", async (req, res, next) => {
  try {
    const result = await vehicleControllers.createVehicle(
      req.body as IVehicles
    );
    res.send({ message: "vehicle added successfully" });
  } catch (error) {
    throw error;
  }
});

vehicleRouter.get('/',vehicleControllers.getAllStation)




