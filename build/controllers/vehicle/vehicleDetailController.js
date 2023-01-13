"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicles_shema_1 = __importDefault(require("../../models/vehiclesModel/vehicles.shema"));
const vehiclesDetailSchema_1 = __importDefault(require("../../models/vehiclesModel/vehiclesDetailSchema"));
const calculateDistanceDurationAndFare = (arrayLength, result, getType) => {
    const startingDistance = result[arrayLength - 1].destinationDistance;
    const lastStopDistance = result[0].destinationDistance;
    const totalDistance = Math.abs(startingDistance - lastStopDistance);
    const startingDuration = result[arrayLength - 1].destinationDuration;
    const lastStopDuration = result[0].destinationDuration;
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
const calculateSourceDistanceDurationAndFare = (arrayLength, result, getType) => {
    const startingDistance = result[arrayLength - 1].sourceDistance;
    const lastStopDistance = result[0].sourceDistance;
    const totalDistance = Math.abs(startingDistance - lastStopDistance);
    const startingDuration = result[arrayLength - 1].sourceDuration;
    const lastStopDuration = result[0].sourceDuration;
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
const vehicleDetailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleID, vehicleClassType, vehicleType, vehicleNumber, station, seatDetails, TotalAvailableSeat, vehicleName, dayOnWhichItRuns, routeStartDate, routeEndDate, operatorName, amenities, } = req.body;
    try {
        const VehicleId = yield vehicles_shema_1.default.findById(vehicleID);
        const vehicleIdExist = VehicleId === null || VehicleId === void 0 ? void 0 : VehicleId._id;
        if (!vehicleIdExist) {
            return next("vehicle ID not found");
        }
        const vehicleDetail = new vehiclesDetailSchema_1.default({
            vehicleID: vehicleID,
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
        yield vehicleDetail.save();
        res.send({
            message: "vehicle detail created successfully",
        });
    }
    catch (error) {
        return next(error);
    }
});
// const getVehicleOnThBasisOfType = async (
//   page?: number,
//   limit?: number,
//   filter?: string,
//   value?: string,
//   sortBy?: string,
//   order?: number
// ) => {
//   try {
//     const records = await vehicleDetailsRepo.get(
//       page,
//       limit,
//       filter,
//       value,
//       sortBy,
//       order || 1
//     );
//     const totalRecord = limit || 2;
//     const previousPage = (page || 1) > 1;
//     const nextPage =
//       (page || 1) - 1 < Math.floor(records.length / (limit || 2));
//     return { records, totalRecord, previousPage, nextPage };
//   } catch (e) {
//     console.log(e);
//     throw e;
//   }
// };
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield vehiclesDetailSchema_1.default.find();
        res.send(result);
    }
    catch (error) {
        throw error;
    }
});
const LIMIT_PER_PAGE = 5;
const PAGE_NUMBER = 1;
const getSearchResult = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, date, filterBy } = req.body;
        const { limit, page } = req.query;
        let filter = __rest(filterBy
        // console.log(filter)
        , []);
        // console.log(filter)
        const getFilterBy = (Object.keys(filterBy));
        const getLengthOfFilterBy = getFilterBy.length;
        let limitPerPage = Number(limit) || LIMIT_PER_PAGE;
        let pageNumber = Number(page) || PAGE_NUMBER;
        const totalRecord = yield vehiclesDetailSchema_1.default.count();
        const previousPage = (page || 1) > 1;
        const nextPage = (Number(page) || 1) - 1 < Math.floor(totalRecord / (Number(limit) || 2));
        const result = yield vehiclesDetailSchema_1.default.aggregate([
            {
                "$match": {
                    "$and": [
                        {
                            "station": {
                                $all: [
                                    { $elemMatch: { sourceName: from } },
                                    { $elemMatch: { sourceName: to } },
                                ]
                            }
                        },
                    ]
                }
            },
            {
                "$project": {
                    vehicleClassType: 1,
                    vehicleType: 1,
                    vehicleNumber: 1,
                    station: 1,
                    // station:{
                    //   $filter:{
                    //     input:''
                    //   }
                    // },
                    _id: 0,
                    seatDetails: 1,
                    TotalAvailableSeat: 1,
                    vehicleName: 1,
                    dayOnWhichItRuns: 1,
                    operatorName: 1,
                    amenities: 1,
                    routeEndDate: 1,
                    routeStartDate: 1
                }
            },
        ]).skip(((page || 1) - 1) * (limits || 2))
            .limit(limits || 2);
        // let unwindStation= await VehicleDetailModel.aggregate([
        //    {
        //     $match:{
        //       $cond:{
        //         if:{"$vehicleClassType"}
        //       }
        //     }
        //    }
        // ])
        //   db.collection.aggregate([
        //     {
        //         $match: {
        //             $cond: {
        //                 if: { $gt: [ "$field1", "$field2" ] },
        //                 then: { field1: { $gt: 50 } },
        //                 else: { field2: { $gt: 50 } }
        //             }
        //         }
        //     }
        // ])
        const stationDetail = result.map((item) => {
            let stationObj = item.station.sort((firstElem, secElement) => firstElem.stationId > secElement.stationId ? 1 : -1);
            const fromStationDataIndex = stationObj.findIndex((elem) => elem.sourceName === from);
            const toStationDataIndex = stationObj.findIndex((elem) => elem.sourceName === to);
            const isSourceStationIndexIsBigger = toStationDataIndex > fromStationDataIndex;
            const getVehicleType = item.vehicleType;
            const getVehicleClassType = item.vehicleClassType;
            const getType = getVehicleType.concat(getVehicleClassType);
            if (!isSourceStationIndexIsBigger) {
                stationObj = item.station.sort((firstElem, secElement) => firstElem.stationId > secElement.stationId ? -1 : 1);
                const fromStationDataIndex = stationObj.findIndex((elem) => elem.sourceName === from);
                const toStationDataIndex = stationObj.findIndex((elem) => elem.sourceName === to);
                const result = item.station.slice(fromStationDataIndex, toStationDataIndex + 1);
                const arrayLength = result.length;
                const value = calculateDistanceDurationAndFare(arrayLength, result, getType);
                const { routeEndDate, routeStartDate } = item, restItem = __rest(item, ["routeEndDate", "routeStartDate"]);
                return Object.assign(Object.assign(Object.assign({}, restItem), value), { station: result });
            }
            else {
                const result = stationObj.slice(fromStationDataIndex, toStationDataIndex + 1);
                const arrayLength = result.length;
                const value = calculateSourceDistanceDurationAndFare(arrayLength, result, getType);
                const { routeEndDate, routeStartDate } = item, restItem = __rest(item, ["routeEndDate", "routeStartDate"]);
                return Object.assign(Object.assign(Object.assign({}, restItem), value), { station: result });
            }
        });
        // SEARCH AFTER SPECIFIYING THE DATE
        const startDateResult = result.map((item) => item.routeStartDate.getTime());
        const endDateResult = result.map((item) => item.routeEndDate.getTime());
        let dateToCompare = new Date(date);
        if (startDateResult[0] <= dateToCompare &&
            dateToCompare <= endDateResult[0]) {
            if (getLengthOfFilterBy == 0) {
                return res.send({ data: stationDetail, totalRecord, previousPage, nextPage });
            }
            else if (getLengthOfFilterBy != 0) {
                const filterOnSearchResult = stationDetail.map((item) => item.station);
                const stationFilter = filterOnSearchResult.flat();
                //  for(let x of de){
                const de = __rest(stationFilter, []);
                for (let x in de) {
                    let boardingFilter = de[x]["BoardingPoint"];
                    for (let x in boardingFilter) {
                        let locationFilter = boardingFilter[x]["locationName"];
                    }
                }
                // console.log(de[0]["BoardingPoint"][0]["locationName"])
                res.send(stationDetail);
                //  }
            }
        }
        else {
            return next("Bus does not run on the specified date");
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    //   getVehicleOnThBasisOfType,
    vehicleDetailController,
    getAll,
    getSearchResult
};
//# sourceMappingURL=vehicleDetailController.js.map