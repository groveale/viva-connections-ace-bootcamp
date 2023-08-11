import { ICafeteriaMenu } from "../models/ICafeteriaMenu";
import { IRestaurantState } from "../models/IRestaurantState";

export interface ICafeteriaMenuService {  
    getMenuItems(siteUrl: string, listTitle: string): Promise<ICafeteriaMenu[]>;
    getHoursUntilClose(): Promise<IRestaurantState>;
}