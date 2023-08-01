import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'CafeteriaMenuAdaptiveCardExtensionStrings';

export class CafeteriaMenuPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
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
            }
          ]
        }
      ]
    };
  }
}
