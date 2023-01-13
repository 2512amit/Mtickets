"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleDetailRouter = void 0;
const express_1 = require("express");
const vehicleDetailController_1 = __importDefault(require("../controllers/vehicle/vehicleDetailController"));
exports.vehicleDetailRouter = (0, express_1.Router)();
exports.vehicleDetailRouter.get("/getAll", vehicleDetailController_1.default.getAll);
exports.vehicleDetailRouter.post('/', vehicleDetailController_1.default.vehicleDetailController);
exports.vehicleDetailRouter.post('/search', vehicleDetailController_1.default.getSearchResult);
// vehicleDetailRouter.get("/",async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const{page,limit,filter,value,sortBy,order}=req.query
//         const result=await vehicleDetailController.getVehicleOnThBasisOfType(Number(page),Number(limit),filter as string,value as string,sortBy as string,Number(order))
//         res.send(result);
//     }catch(e){
//         next(e);
//     }
// })
//# sourceMappingURL=vehicleDetails.route.js.map