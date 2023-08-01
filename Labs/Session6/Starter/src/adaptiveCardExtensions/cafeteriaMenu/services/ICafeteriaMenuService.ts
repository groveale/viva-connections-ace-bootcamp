import { ICafeteriaMenu } from "../models/ICafeteriaMenu";

export interface ICafeteriaMenuService {  
    getMenuItems(siteUrl: string, listTitle: string): Promise<ICafeteriaMenu[]>;
}