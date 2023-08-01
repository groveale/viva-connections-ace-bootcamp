import { ICafeteriaMenuItem } from "../models/ICafeteriaMenuItem";

export interface ICafeteriaMenuService {  
    getMenuItems(siteUrl: string, listTitle: string): Promise<ICafeteriaMenuItem[]>;
}