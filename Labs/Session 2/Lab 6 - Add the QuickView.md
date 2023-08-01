# Add the Quick View
In this exercise we will adding the QuickView that you worked on during a previous session. This will become the QuickView that is open by the ACE when the ACE is selected. We will be following on from the cafeteria ACE created in Lab 3 and worked on in lab 4 and 5 so please complete these first. 

This Lab will also assume you have the knowledge gained from the previous labs. Please refer back if you get stuck.

## Task 1 - Add the Cafeteria Adaptive Card (QuickView)

This Adaptive Card was built in Session 2 of the Bootcamp. The .json file for the card can be found [here](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/QuickViewTemplate.json)

1. Open existing QuickViewTemplate.json file that was added during the scaffolding of the project.

    ..\cafeteria-ace\src\adaptiveCardExtensions\helloCafeteria\quickView\template\QuickViewTemplate.json

2. Paste the content of the CafeteriaQuickView.json into this file.

3. Save your changes and check your workbench. Your QuickView should look like the following:

![New QuickView .json](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/CafeteriaQuickViewNew.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

## Task 2 - Add the backing data

You will have noticed the reference in the quickView. We now need to populate the quick view with data. To do this we will have to store some data within our solution. Typically data would be obtained from a data source using some form of API (more on this in the next sessions), but for this example we will hard code the meals data .json from session 2.

There are a number of steps required.

1. Open the QuickView.ts file

    ..\cafeteria-ace\src\adaptiveCardExtensions\helloCafeteria\quickView\QuickView.ts

2. Update the IQuickViewData interface to include the properties expected by the adaptive card. Example as below:

```typescript
export interface IQuickViewData {
  menus: any;
  restaurant_name: string;
  restaurant_state: string;
  time_to_close: string;
}
```

3. Update the `data()` method to include a static version of the CafeteriaMenuData.json (in string format). Parse this string as JSON and then return the expected values. Example as below:

```typescript
public get data(): IQuickViewData {

    var dataString: string = `{
      "menus": [
        {
            "day" : "Today",
            "title" : "Korean Cuisine",
            "description" : "Description for the koren cuisine",
            "imageUrl" : "https://raw.githubusercontent.com/pnp/AdaptiveCards-Templates/main/samples/visual-list/assets/korean.jpg"
        },
        {
            "day" : "Tomorrow",
            "title" : "Italian Cuisine",
            "description" : "Description for the peruvian cuisine",
            "imageUrl" : "https://raw.githubusercontent.com/pnp/AdaptiveCards-Templates/main/samples/visual-list/assets/pizza.jpg"
        }
      ],
      "restaurant_name": "The Bootcamp",
      "restaurant_state": "OPEN",
      "time_to_close": "1 hour"
    }`;

    const dataJson = JSON.parse(dataString);
    
    return {
      menus: dataJson.menus,
      restaurant_name: dataJson.restaurant_name,
      restaurant_state: dataJson.restaurant_state,
      time_to_close: dataJson.time_to_close
    };
}
```

3. Save you changes and check your workbench. Your QuickView should look like the below. You will likely need to remove the string import as it is no longer used in the QuickView.ts file

```typescript
import * as strings from 'HelloCafeteriaAdaptiveCardExtensionStrings';
```

![QuickView with data](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/CafeteriaQuickViewDataNew.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

> **Important**
>
> As Typescript is strongly typed. Any unused variables / reference will cause compiler errors.

## Task 3 - Final Touches

Let's update the CardView button text to say `Menu`

1. Open up the CardView.ts file and navigate to the `cardButtons()` method. Update it to reflect the following:

```typescript
public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
        {
        title: "Menu",
        action: {
            type: 'QuickView',
            parameters: {
            view: QUICK_VIEW_REGISTRY_ID
            }
        }
        }
    ];
}
```

3. Save you changes and check your workbench. Your ACE should look as follows:

![CardView with menu button](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/CafeteriaQuickCompleteNew.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

> **Remeber**
>
> You will need to remove any unused imports. 


