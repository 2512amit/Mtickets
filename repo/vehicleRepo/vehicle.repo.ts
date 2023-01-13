import VehicleModel from "../../models/vehiclesModel/vehicles.shema";
import { IVehicles } from "../../types/vehicles.type";

const create = (vehicle: IVehicles) => {
  return VehicleModel.create(vehicle);
};

export default {
  create,
};
