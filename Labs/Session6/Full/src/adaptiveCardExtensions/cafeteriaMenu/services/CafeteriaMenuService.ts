import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { ICafeteriaMenuItem } from "../models/ICafeteriaMenuItem";
import { ICafeteriaMenuService } from "./ICafeteriaMenuService";
import { SPHttpClient, HttpClient } from '@microsoft/sp-http'
import { ICafeteriaMenu } from "../models/ICafeteriaMenu";
import { IRestaurantState } from "../models/IRestaurantState";

export class CafeteriaMenuService implements ICafeteriaMenuService {

    public static readonly serviceKey: ServiceKey<ICafeteriaMenuService> = 
        ServiceKey.create<ICafeteriaMenuService>('AceBootcamp.CafeteriaMenuService', CafeteriaMenuService);

    private _client: SPHttpClient;
    private _resturantAPI: HttpClient    

    constructor(serviceScope: ServiceScope) { 
        serviceScope.whenFinished(() => {
            this._client = serviceScope.consume(SPHttpClient.serviceKey);
            this._resturantAPI = serviceScope.consume(HttpClient.serviceKey);
        });
    }


    public getHoursUntilClose(): Promise<IRestaurantState> {
        if (this._resturantAPI === undefined){
            throw new Error('CafeteriaMenuService not initialized!')
        }

        return this._resturantAPI.get(
            `https://bootcampcafeag.azurewebsites.net/api/GetHoursUntilClose`,
            HttpClient.configurations.v1
        )
        .then((response: any) => response.json())
        .then((jsonResponse: IRestaurantState) => 
        {
            return {
                state: jsonResponse.state,
                hours: jsonResponse.hours
            }
        });
    }

    
    public getMenuItems(siteUrl: string, listTitle: string): Promise<ICafeteriaMenu[]> {
        if (this._client === undefined){
            throw new Error('CafeteriaMenuService not initialized!')
        }
        return this._client.get(
            `${siteUrl}` +
            `/_api/web/lists/getByTitle('${listTitle}')/items`,
            SPHttpClient.configurations.v1,
            { headers: { 'accept': 'application/json;odata.metadata=none' }}
        )
        .then((response: any) => response.json())
        .then((jsonResponse: any) => jsonResponse.value.map(
        (item: any) => 
        { 
            return { 
                title: item.Title, 
                description: item.Description,
                day: item.Day,
                imageUrl: item.ImageUrl,
                url: `${siteUrl}/lists/${listTitle}/dispform.aspx?ID=${item.ID}`,
                itemName: item.ItemName,
                itemDescription: item.ItemDescription,
                itemPrice: item.Price,
                itemCalories: item.Calories
            }; 
        }))
        .then((menuItems: ICafeteriaMenuItem[]) => {
            // Group the menu items by day of the week into ICafeteriaMenu[]
            // Sort of like a SQL GROUP BY
            let menus: ICafeteriaMenu[] = [];
            menuItems.forEach((item) => {
                // We are search our array of menus for a menu that matches the day of the week of the current item.
                // filter return an array so we want the first item in the array.
                let menu = menus.filter((menu) => menu.day === item.day)[0];
                // If we don't find a menu for the current item, create a new menu and add it to the array of menus.
                if (menu === undefined) {
                    menu = {
                        day: item.day,
                        title: item.title,
                        description: item.description,
                        imageUrl: item.imageUrl,
                        menuItems: []
                    };
                    menus.push(menu);
                }
                menu.menuItems.push(item);
            });
            return menus;
        });
    }
}