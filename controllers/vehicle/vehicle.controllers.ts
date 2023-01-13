import vehicleRepo from "../../repo/vehicleRepo/vehicle.repo";
import { IVehicles } from "../../types/vehicles.type";
import { Request,Response,NextFunction } from "express";
import StationNameModel from "../../models/vehiclesModel/stationName.schema";
const createVehicle = async (vehicle: IVehicles) => {
  try {
    const result = await vehicleRepo.create(vehicle);
    return result;
  } catch (error) {
    throw error;
  }
};

const createStationName=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const{stationName,station_id}=req.body
    const result = new StationNameModel({
      stationName: stationName,
      station_id:station_id
    });
    await result.save();
    res.send({
      message: "station created successfully",
    });
  } catch (error) {
    throw error
  }
}

const getAllStation=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const result=await StationNameModel.find().select('_id stationName')
    res.send(result)
  } catch (error) {
    throw error
  }
}

export default {
  createVehicle,
  createStationName,
  getAllStation
};
