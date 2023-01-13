"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleDetailSchema = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utils/base.schema");
exports.vehicleDetailSchema = new base_schema_1.BaseSchema({
    // vehicleId:{
    //     type:Schema.Types.ObjectId,
    //     ref:"vehicle",
    //     required:true
    // },
    vehicleID: {
        type: String,
        required: true
    },
    vehicleClassType: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true,
        unique: true,
    },
    station: {
        type: Array,
        required: true
    },
    TotalAvailableSeat: {
        type: String,
        required: true
    },
    seatDetails: {
        type: Array,
        required: true
    },
    vehicleName: {
        type: String,
        required: true
    },
    dayOnWhichItRuns: {
        type: Array,
        required: true
    },
    routeStartDate: {
        type: Date,
        required: true
    },
    routeEndDate: {
        type: Date,
        required: true
    },
    operatorName: {
        type: String,
        required: true
    },
    amenities: {
        type: Array,
        required: true
    }
});
const VehicleDetailModel = (0, mongoose_1.model)("vehicleDetail", exports.vehicleDetailSchema);
exports.default = VehicleDetailModel;
//# sourceMappingURL=vehiclesDetailSchema.js.map