"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicles_shema_1 = __importDefault(require("../../models/vehiclesModel/vehicles.shema"));
const create = (vehicle) => {
    return vehicles_shema_1.default.create(vehicle);
};
exports.default = {
    create,
};
//# sourceMappingURL=vehicle.repo.js.map