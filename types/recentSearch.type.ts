import { ISourceStation } from "./vehiclesDetails.type";

export interface IRecentSearch{
    vehicleClassType:string;
    vehicleNumber: string;
    station:ISourceStation[];
    TotalAvailableSeat:string;
    vehicleName:string;
    dayOnWhichItRuns:[object];
    totalDistance:number;
    totalTravelTime:number;
    totalFare:number
}




  

