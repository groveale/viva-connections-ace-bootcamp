# Exercise 8 - Customise the property pane
In this exercise we will add controls to the property pane to enable users of the ACE to update the ACE properties. This will allow the ACE to be customised without needing to update the source code

We will be following on from the cafeteria ACE created in the pervious Lab Session so please complete this first. 

## Task 1 - Add Controls to the property pane

1. We will now be working with the file that controls the Property Pane. Open the file called `HelloCafeteriaPropertyPane.ts`

    `..\cafeteria-ace\src\adaptiveCardExtensions\helloCafeteria\HelloCafeteriaPropertyPane.ts`

2. Add `TextField` controls for our two properties, `listTitle` and `imageUrl`. Add two additional controls to the existing `groupFields` array as below:

```typescript
groupFields: [
    PropertyPaneTextField('title', {
        label: strings.TitleFieldLabel
    }),
    PropertyPaneTextField('listTitle', {
        label: "List Title"
    }),
    PropertyPaneTextField('imageUrl', {
        label: "Image URL"
    })
]
```

3. Save you changes and check your workbench. Clicking edit on your ACE should open the Property Pane with the additional controls

> **Note**
>
> The values are pre populated with the default values specified in the manifest file.

![Property Pane Open](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/PropertyPane.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

4. Update the Image URL property, notice how this is immediately reflected in your CardView. Pretty awesome.

## Task 2 - Implement Localisation for the Property Pane

You many have noticed the use of `string.TitleFieldLabel` in the Property Pane configuration. It's good practice to use Localisation as this enables you to easily support  multiple languages and cultural requirements. While it may not be initially required for you ACE, it's great to adopt the framework to make it easy to add down the line. We will now add Localisation support to our property pane.

1. Open up the mystring.d.ts file. This file contains an Interface that defines the Localisation strings that will be available in your ACE solution using `strings.` 

    `..\cafeteria-ace\src\adaptiveCardExtensions\cafeteriaMenu\loc\mystring.d.ts`

2. Add two strings for our Property Pane Field labels.

```typescript
declare interface ICafeteriaMenuAdaptiveCardExtensionStrings {
  ...
  ListTitleFieldLabel: string;
  ImageURLFieldLabel: string;
}
```

3. Now we need to add the values of these string for the languages that we are supporting. These are JavaScript files that are also in the `loc` folder. In our solution we are just supporting `en-us` so open that file and add the two key value paris to the return object of the function.

```javascript
define([], function() {
  return {
    "PropertyPaneDescription": "Bootcamp Cafe ACE to illustrate ACE features.",
    ...
    "ListTitleFieldLabel": "List Title",
    "ImageURLFieldLabel": "Image URL",
  }
});
```

> **Note**
>
> This is where you would add additional files if you need to support multiple languages

## Task 3 - Use Localisation in the Property Pane

Now we have implemented Localisation can use it within our Property Pane

1. Replace the hardcoded strings we added to the Property Pane in Task 1 with our Localisations strings.

```typescript
groupFields: [
    PropertyPaneTextField('title', {
        label: strings.TitleFieldLabel
    }),
    PropertyPaneTextField('listTitle', {
        label: strings.ListTitleFieldLabel
    }),
    PropertyPaneTextField('imageUrl', {
        label: strings.ImageURLFieldLabel
    })
]
```

2. Save you changes and check your workbench. Clicking edit on your ACE should open the Property Pane. There will be no noticeable change but know that under the covers SPFx will be using the localisation file that represents your local. (If it was configured)

![Property Pane with Localisations](https://dev.azure.com/CEandS/836eb273-0e36-48af-a1c0-a78790ff1bec/_apis/git/repositories/f8282c8f-7b8c-4f7f-962e-fa6118fb3ef7/items?path=/Assets/PropertyPaneLocal.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=main&resolveLfs=true&%24format=octetStream&api-version=5.0)

> **Note**
>
> Localisation can be used throughout the ACE, not just in the Property Pane!