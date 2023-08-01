# Exercise 12 - Prepare for Multiple QuickViews

In this exercise we will be adding functionality to the ACE to show a detailed view. A user can click on the days menu and see the food that is available in that menu.

For this to work we need to update our data source. Add an additional AdaptiveCard (QuickView) and handel interaction in our current QuickView.

## Task 1 - Update our Model

We need to update our model definition to store data for menu items but maintaining the current structure. Notice in the below interface, properties for each item have been added.

1. Update the `ICafeteriaMenuItem` as below:

```typescript
export interface ICafeteriaMenuItem {
    itemName: string;
    itemDescription: string;
    itemPrice: number;
    itemCalories: number;
    day: string;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}
```

2. Update the return object in our `getMenuItems()` definition in the `CafeteriaMenuService`. We need to populate our new property values.

```typescript
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
}
```

## Task 2 - Update the data source

We need to update (or create) a list that will work with the updated interface. To do this, we have prepared a `PowerShell` script that uses `PnP.PowerShell` to streamline the process.

1. Download the script from [here](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Labs/Session%206/CreateListv2.ps1). You will also need to download a copy of [`meals.json`](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Labs/Session%206/session6Meals.json)

2. Open the downloaded script and update the following variables in the script to reflect your environment. 
Make sure the `siteUrl` is your SPO home site or root site (`https://<yourtenant>.sharepoint.com` **or** `https://<yourtenant>.sharepoint.com/sites/home`).

```powershell
$siteUrl = "https://groverale.sharepoint.com/sites/home"
$listName = "MealsBootCamp"

$mealsJsonPath = ".\meals.json"
```
3. Run the script

`.\CreateList.ps1`

You may see the following if you are using the same name as an existing list (created int he previous lab).

![Confirm List Deletion](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/DeleteList.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

4. Check your SPO Site, you should see a list similar to the below:

![Updated SPO List](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/UpdatedSPOList.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

5. Be sure to update the default `listTitle` in the ACE manifest

`src\adaptiveCardExtensions\cafeteriaMenu\CafeteriaMenuAdaptiveCardExtension.manifest.json`

```
"properties": {
    "title": "Cafeteria",
    "listTitle": "CafeteriaMenu",
    "imageUrl": "https://media.akamai.odsp.cdn.office.net/uksouth1-mediap.svc.ms/transform/thumbnail?provider=url&inputFormat=jpg&docid=https%3A%2F%2Fcdn.hubblecontent.osi.office.net%2Fm365content%2Fpublish%2Fb0e728ff-166f-4ab8-8a94-c89a1f27670b%2F1063044852.jpg&w=400"
},
```

## Task 3 - Confirm we are getting the data (Debug)

Before we attempt to use the data in a new QuickView let's confirm we have the expected data. To do this we will use a technique called debugging. Typically you will only use debugging to figure out what is going wrong but this will be a good exercise to demonstrate how to perform debugging in SPFx using vscode.

1. Check that gulp serve is running. We need a running version of the code to attach a debug session to

2. Add a break point on where we want to inspect the code. In vscode this is achieved by clicking to the left of the line that you want to toggle the breakpoint on. Add it to the `setState()` part of the `_fetchData()` function.

![BreakPoint](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/BreakPoint.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

3. Open up the debug menu from the left rail. Confirm that you have a debug configuration called `Hosted workbench`. Clicking ont he cog will open up this config, confirm that the `url` and `type` values are correct. The default configuration is to launch edge. This may need to be changed to chrome if you don't use edge.

![Debug Menu and Configuration](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/DebugMenu.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

4. Click the Play button. This should launch a new browser session at the Url specified in the debug configuration. You may be prompted to authenticate. 
You may see many errors pop up in your debug console in vscode, but you can ignore them. Go ahead and try to add the cafeteria ACE to the workbench.

If you see an error (the irony of an error when trying to debug). This due to incorrect SPO list being referenced in the `listTitle` property. Update this in the ACE manifest as specified in Task 2 - Step 5.

5. If all has gone to plan vscode should stop at the breakpoint you added you should be able to inspect the property values. You can see in the image below that we are not receiving the items with the updated data.

![Debug Values](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/DebugValues.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

## Task 4 - Update the ACE to support the new data.

If you open up the QuickView you will see nothing. The QuickView will open but it will be empty like below:

![Quick View Empty](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/QuickViewEmpty.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

This is because our QuickView has an error. SPFx still compiles as the error is in the AdaptiveCard layer of the stack. This error is due to having multiple ids of the same value. Almost all AdaptiveCard are down to Ids...

We have got our work cut out here. we need to update a few things

1. Add an additional interface to the models folder called ICafeteriaMenu.

```typescript
import { ICafeteriaMenuItem } from "./ICafeteriaMenuItem";

export interface ICafeteriaMenu {
    day: string;
    title: string;
    description: string;
    imageUrl: string;
    menuItems: ICafeteriaMenuItem[];
}
```
We will use this model to group our menuitems once they are returned from SPO.

2. Update the `ICafeteriaMenuService` service definition to return an array of our new `ICafeteriaMenu`

```typescript
import { ICafeteriaMenu } from "../models/ICafeteriaMenu";

export interface ICafeteriaMenuService {  
    getMenuItems(siteUrl: string, listTitle: string): Promise<ICafeteriaMenu[]>;
}
```

3. Update the `getMenuItems` function as below:

```typescript
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
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse.value.map(
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
```

This has got a little unwieldy. To summarise what has changed. We have updated the return type to be `ICafeteriaMenu[]`. We have also added another .then step. This final step will group our menu items into day arrays.

## Task 5 update the ACE state property.

1. Update the menuItems state property type. You will need to update your imports too.

```typescript
export interface ICafeteriaMenuAdaptiveCardExtensionState {
  menuItems: ICafeteriaMenu[];
}
```

2. Save everything a check your workbench. Should be the same as always. But know that in the background alot has changed. Crucially our menuitems now contain meals.

![ACE With new Data](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/ACEWithNewData.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)