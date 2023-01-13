"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentSearchSchema = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utils/base.schema");
exports.recentSearchSchema = new base_schema_1.BaseSchema({
    vehicleClassType: {
        type: String,
    },
    vehicleNumber: {
        type: String,
    },
    station: {
        type: Array,
    },
    TotalAvailableSeat: {
        type: String,
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
    totalDistance: {
        type: Number
    },
    totalTravelTime: {
        type: Number
    },
    totalFare: {
        type: Number
    }
});
const RecentSearchModel = (0, mongoose_1.model)("recentSearch", exports.recentSearchSchema);
exports.default = RecentSearchModel;
//# sourceMappingURL=recentSearch.schema.js.map