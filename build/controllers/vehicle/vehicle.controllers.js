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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_repo_1 = __importDefault(require("../../repo/vehicleRepo/vehicle.repo"));
const stationName_schema_1 = __importDefault(require("../../models/vehiclesModel/stationName.schema"));
const createVehicle = (vehicle) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield vehicle_repo_1.default.create(vehicle);
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
});
const createStationName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stationName, station_id } = req.body;
        const result = new stationName_schema_1.default({
            stationName: stationName,
            station_id: station_id
        });
        yield result.save();
        res.send({
            message: "station created successfully",
        });
    }
    catch (error) {
        throw error;
    }
});
const getAllStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield stationName_schema_1.default.find().select('_id stationName');
        res.send(result);
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    createVehicle,
    createStationName,
    getAllStation
};
//# sourceMappingURL=vehicle.controllers.js.map