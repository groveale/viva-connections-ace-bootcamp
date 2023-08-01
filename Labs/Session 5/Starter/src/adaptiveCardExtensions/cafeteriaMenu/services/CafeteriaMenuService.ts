import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { ICafeteriaMenuItem } from "../models/ICafeteriaMenuItem";
import { ICafeteriaMenuService } from "./ICafeteriaMenuService";
import { SPHttpClient } from '@microsoft/sp-http'

export class CafeteriaMenuService implements ICafeteriaMenuService {

    public static readonly serviceKey: ServiceKey<ICafeteriaMenuService> = 
        ServiceKey.create<ICafeteriaMenuService>('AceBootcamp.CafeteriaMenuService', CafeteriaMenuService);

    private _client: SPHttpClient;    

    constructor(serviceScope: ServiceScope) { 
        serviceScope.whenFinished(() => {
            this._client = serviceScope.consume(SPHttpClient.serviceKey);
        });
    }
    
    public getMenuItems(siteUrl: string, listTitle: string): Promise<ICafeteriaMenuItem[]> {
        // Check if the CafeteriaMenuService has been initialized.
        if (this._client === undefined){
            throw new Error('CafeteriaMenuService not initialized!')
        }

        // Step 1: Use the SharePoint HTTP client to send a GET request to retrieve data from the specified SharePoint list.
        // The URL for the request is built using the SharePoint API with the list title from the properties.
        return this._client.get(
            `${siteUrl}` +
            `/_api/web/lists/getByTitle('${listTitle}')/items`,
            SPHttpClient.configurations.v1,
            { headers: { 'accept': 'application/json;odata.metadata=none' }}
        )
        // Step 2: After getting a response from the server, convert it to JSON format.
        .then((response) => response.json())
        // Step 3: Map the JSON response to a new array of objects representing the menu items.
        .then((jsonResponse) => jsonResponse.value.map(
        (item: any) => 
        { 
            // Step 4: Extract specific properties (Title, Description, Day, ImageUrl) from each item in the JSON response.
            // Return a new object for each item with the extracted properties.
            return { 
                title: item.Title, 
                description: item.Description,
                day: item.Day,
                imageUrl: item.ImageUrl,
                url: `${siteUrl}/lists/${listTitle}/dispform.aspx?ID=${item.ID}`
            }; 
        }))
    }
}