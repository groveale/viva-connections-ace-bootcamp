# Update ACE Manifest
In this exercise you will modify the ACE Manifest. You will be continue to use the **Cafeteria ACE** created in **Lab 3** so please complete that first. This Lab will assume you have the knowledge gained from the previous labs.

## Task 1 - Update the ACE Name 
1. Review the ACE project files in the Files tab in VSCode
        
![ACE Files](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/solution-files.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

2. Open the manifest file. This should be called `HelloCafeteriaAdaptiveCardExtension.manifest.json` and should look like the example below:

``` json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/adaptive-card-extension-manifest.schema.json",
  "id": "e2b7a39b-abfa-4f44-a3c9-3c8916555d03",
  "alias": "HelloCafeteriaAdaptiveCardExtension",
  "componentType": "AdaptiveCardExtension",

  // The "*" signifies that the version should be taken from the package.json
  "version": "*",
  "manifestVersion": 2,

  // If true, the component can only be installed on sites where Custom Script is allowed.
  // Components that allow authors to embed arbitrary script code should set this to true.
  // https://support.office.com/en-us/article/Turn-scripting-capabilities-on-or-off-1f2c515f-5d7e-448a-9fd7-835da935584f
  "requiresCustomScript": false,
  "supportedHosts": ["Dashboard"],
  "preconfiguredEntries": [{
    "groupId": "bd067b1e-3ad5-4d5d-a5fe-505f07d7f59c", // Dashboard
    "group": { "default": "Dashboard" },
    "title": { "default": "HelloCafeteria" },
    "description": { "default": "HelloCafeteria description" },
    "iconImageUrl": "https://res.cdn.office.net/files/fabric-cdn-prod_20230308.001/assets/brand-icons/product-monoline/svg/vivaconnections_32x1.svg",
    "properties": {
      "title": "HelloCafeteria"
    },
    "cardSize": "Medium"
  }]
}
```

3. Update the ACE Title as shown below

``` json
"title": { "default": "Cafeteria" },
```

4. Check that the manifest change has updated the ACE - Go back to your workbench and reload. Your ACE should look as follows

![ACE Rename](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/manifest-rename.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)


> **Note**
>
> Make sure gulp serve is running!

## Task 2 - Update the ACE Icon

1. Navigate back to your manifest file and add an additional property to the `preconfiguredEntries` array. You will also need to comment out the iconImageUrl. The `EatDrink` string can be any [Office UI Fabric Icon](https://uifabricicons.azurewebsites.net/) friendly name. Please feel free to use a different icon if you prefer.

```json
"description": { "default": "HelloCafeteria description" },
"officeFabricIconFontName": "EatDrink",
//"iconImageUrl": "https://res.cdn.office.net/files/fabric-cdn-prod_20230308.001/assets/brand-icons/product-monoline/svg/vivaconnections_32x1.svg",
```

2. Check that the manifest change has updated the ACE - Go back to your workbench and reload. This should have updated the icon seen when adding the ACE

![ACE Icon Add](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/manifest-icon1new.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

> **Note**
>
> We have used the Office UI Fabric Icon here to show alternative options. The default experience is using an icon from a web link. Feel free to use either option but remember the link must be accessible

## Task 3 - Update default properties

You may want the default size of this card to be Large. This can be achieved by updating the manifest.

1. Navigate back to your manifest file and update the `cardSize` property. (At the bottom)

```json
"cardSize": "Large"
```

2. Whilst we are here we can also update the default value for the `title` property. It's worth noting that the `title` property is different to the ACE title.

```json
"properties": {
    "title": "Cafeteria Lab4"
},
```

3. Check that the manifest change has updated the ACE - Go back to the workbench and reload. This should have updated the card defult size seen when adding the ACE.

![ACE Property Change](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/manifest-propertiesnew.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

> **Note**
>
> Update sometimes are not reflected immediately. You may need to hard refresh your workbench. OR even remove your ACE and re-add it to the workbench.

4. If you have made all the changes above your manifest file should now look like this:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/adaptive-card-extension-manifest.schema.json",
  "id": "e2b7a39b-abfa-4f44-a3c9-3c8916555d03",
  "alias": "HelloCafeteriaAdaptiveCardExtension",
  "componentType": "AdaptiveCardExtension",

  // The "*" signifies that the version should be taken from the package.json
  "version": "*",
  "manifestVersion": 2,

  // If true, the component can only be installed on sites where Custom Script is allowed.
  // Components that allow authors to embed arbitrary script code should set this to true.
  // https://support.office.com/en-us/article/Turn-scripting-capabilities-on-or-off-1f2c515f-5d7e-448a-9fd7-835da935584f
  "requiresCustomScript": false,
  "supportedHosts": ["Dashboard"],
  "preconfiguredEntries": [{
    "groupId": "bd067b1e-3ad5-4d5d-a5fe-505f07d7f59c", // Dashboard
    "group": { "default": "Dashboard" },
    "title": { "default": "Cafeteria" },
    "description": { "default": "HelloCafeteria description" },
    "officeFabricIconFontName": "EatDrink",
    //"iconImageUrl": "https://res.cdn.office.net/files/fabric-cdn-prod_20230308.001/assets/brand-icons/product-monoline/svg/vivaconnections_32x1.svg",
    "properties": {
      "title": "Cafeteria Lab4"
    },
    "cardSize": "Large"
  }]
}
```