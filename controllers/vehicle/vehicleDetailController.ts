import { Request, Response, NextFunction } from "express";
import VehicleBookingModel from "../../models/vehiclesModel/vehicleBooking.schema";
import VehicleModel from "../../models/vehiclesModel/vehicles.shema";
import VehicleDetailModel from "../../models/vehiclesModel/vehiclesDetailSchema";
import { ISourceStation } from "../../types/vehiclesDetails.type";

const calculateDistanceDurationAndFare = (
  arrayLength: number,
  result: ISourceStation[],
  getType: string
) => {
  const startingDistance: number = result[arrayLength - 1].destinationDistance;
  const lastStopDistance: number = result[0].destinationDistance;
  const totalDistance = Math.abs(startingDistance - lastStopDistance);
  const startingDuration: number = result[arrayLength - 1].destinationDuration;
  const lastStopDuration: number = result[0].destinationDuration;
  const totalTravelTime = Math.abs(startingDuration - lastStopDuration);
  let fixedFare;
  switch (getType) {
    case "ACSEATER":
      fixedFare = totalDistance * 9;
      break;
    case "NONACSEATER":
      fixedFare = totalDistance * 6;
      break;
    case "NONACSLEEPER":
      fixedFare = totalDistance * 8;
      break;
    case "ACSLEEPER":
      fixedFare = totalDistance * 12;
      break;
    default:
      break;
  }
  return { totalDistance, totalTravelTime, fixedFare };
};

const calculateSourceDistanceDurationAndFare = (
  arrayLength: number,
  result: ISourceStation[],
  getType: string
) => {
  const startingDistance: number = result[arrayLength - 1].sourceDistance;
  const lastStopDistance: number = result[0].sourceDistance;
  const totalDistance = Math.abs(startingDistance - lastStopDistance);
  const startingDuration: number = result[arrayLength - 1].sourceDuration;
  const lastStopDuration: number = result[0].sourceDuration;
  const totalTravelTime = Math.abs(startingDuration - lastStopDuration);
  let fixedFare;

  switch (getType) {
    case "ACSEATER":
      fixedFare = totalDistance * 9;
      break;
    case "NONACSEATER":
      fixedFare = totalDistance * 6;
      break;
    case "NONACSLEEPER":
      fixedFare = totalDistance * 8;
      break;
    case "ACSLEEPER":
      fixedFare = totalDistance * 12;
      break;
    default:
      break;
  }
  return { totalDistance, totalTravelTime, fixedFare };
};

const vehicleDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    vehicleClassType,
    vehicleType,
    vehicleNumber,
    station,
    seatDetails,
    TotalAvailableSeat,
    vehicleName,
    dayOnWhichItRuns,
    routeStartDate,
    routeEndDate,
    operatorName,
    amenities,
  } = req.body;

  try {
    const VehicleInfo= await VehicleModel.findOne({vehicleName:"Bus"})

    const vehicleDetail = new VehicleDetailModel({
      vehicleID:VehicleInfo?._id,
      vehicleClassType: vehicleClassType,
      vehicleType: vehicleType,
      vehicleNumber: vehicleNumber,
      station: station,
      seatDetails: seatDetails,
      TotalAvailableSeat: TotalAvailableSeat,
      vehicleName: vehicleName,
      dayOnWhichItRuns: dayOnWhichItRuns,
      routeStartDate: routeStartDate,
      routeEndDate: routeEndDate,
      operatorName: operatorName,
      amenities: amenities,
    });
    const result=await vehicleDetail.save();
    
    await VehicleBookingModel.create({
      vechileId:result._id
    })
  
    res.send({
      message: "vehicle detail created successfully",
    });
  } catch (error) {
    return next(error);
  }
};
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await VehicleDetailModel.find();
    res.send(result);
  } catch (error) {
    throw error;
  }
};

const LIMIT_PER_PAGE = 5;
const PAGE_NUMBER = 1;
const getSearchResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, date,filterBy,sortBy,} = req.body;
    const { limit, page, orderBy} = req.query;
    
   const lengthOfFilterObject=Object.values(filterBy).length

    let limitPerPage = Number(limit) || LIMIT_PER_PAGE;
    let pageNumber = Number(page) || PAGE_NUMBER;
    const totalRecord= await VehicleDetailModel.count()
    const previousPage = (page || pageNumber) >= 1;
    const nextPage =(Number(page) || pageNumber) - 1 <= (Math.floor(totalRecord / (Number(limit) || limitPerPage)))-Number(page)-1;
   
  const result = await VehicleDetailModel.find({
      isDeleted: false,
      $and: [
        {
          station: {
            $all: [
              { $elemMatch: { sourceName: from } },
              { $elemMatch: { sourceName: to } },
            ],
          },
        },
      ],
    })
      .select("-isDeleted -createdAt -updatedAt -__v -vehicleID")
      .skip(((Number(page) || 1) - 1) * (Number(limit) || 2))
      .limit(Number(limit) || 2)
      .lean();

     const stationDetail = result.map((item:any) => {
      let stationObj = item.station.sort((firstElem:any, secElement:any) =>
        firstElem.stationId > secElement.stationId ? 1 : -1
      );
      const fromStationDataIndex = stationObj.findIndex(
        (elem:any) => elem.sourceName === from
      );
      const toStationDataIndex = stationObj.findIndex(
        (elem:any) => elem.sourceName === to
      );
      const isSourceStationIndexIsBigger =
        toStationDataIndex > fromStationDataIndex;

      const getVehicleType = item.vehicleType;
      const getVehicleClassType = item.vehicleClassType;
      const getType = getVehicleType.concat(getVehicleClassType);

      if (!isSourceStationIndexIsBigger) {
        stationObj = item.station.sort((firstElem:any, secElement:any) =>
          firstElem.stationId > secElement.stationId ? -1 : 1
        );
        const fromStationDataIndex = stationObj.findIndex(
          (elem:any) => elem.sourceName === from
        );
        const toStationDataIndex = stationObj.findIndex(
          (elem:any) => elem.sourceName === to
        );
        const result = item.station.slice(
          fromStationDataIndex,
          toStationDataIndex + 1
        );

        const arrayLength = result.length;
        const value = calculateDistanceDurationAndFare(
          arrayLength,
          result,
          getType
        );
        const { routeEndDate, routeStartDate, ...restItem } = item;
        return {
          ...restItem,
          ...value,
          station: result,
        };
      } else {
        const result = stationObj.slice(
          fromStationDataIndex,
          toStationDataIndex + 1
        );

        const arrayLength = result.length;
        const value = calculateSourceDistanceDurationAndFare(
          arrayLength,
          result,
          getType
        );
        const { routeEndDate, routeStartDate, ...restItem } = item;

        return {
          ...restItem,
          ...value,
          station: result,
        };
      }
    });
    
    // SEARCH AFTER SPECIFIYING THE DATE
   
    const startDateResult: any = result.map((item:any) =>
      item.routeStartDate.getTime()
    );
   
    const endDateResult: any = result.map((item:any) =>
      item.routeEndDate.getTime()
    );
    let dateToCompare = new Date(date);
    if (
      startDateResult[0] <= dateToCompare &&
      dateToCompare <= endDateResult[0] && lengthOfFilterObject===0
    ) {

      return res.send({data:stationDetail,totalRecord,previousPage,nextPage})
    }
    else if(
      startDateResult[0] <= dateToCompare &&
      dateToCompare <= endDateResult[0] && lengthOfFilterObject!=0
    ){ 
     let filtered= stationDetail.filter(obj=>
       Object.entries(filterBy)
       .every(([prop,find])=>(find as any)
       .includes(obj[prop])
       )
      )
      
       return res.send({data: filtered,totalRecord,previousPage,nextPage})
    }
     else {
      return next("Bus does not run on the specified date");
    }
  } 
catch (error) {
    throw error;
  }
};

export default {
  vehicleDetailController,
  getAll,
  getSearchResult
};
