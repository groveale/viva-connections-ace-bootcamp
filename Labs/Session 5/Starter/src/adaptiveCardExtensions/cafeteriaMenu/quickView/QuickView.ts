import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import { ICafeteriaMenuAdaptiveCardExtensionProps, ICafeteriaMenuAdaptiveCardExtensionState } from '../CafeteriaMenuAdaptiveCardExtension';

export interface IQuickViewData {
  menus: any;
  restaurant_name: string;
  restaurant_state: string;
  time_to_close: string;
}

export class QuickView extends BaseAdaptiveCardView<
  ICafeteriaMenuAdaptiveCardExtensionProps,
  ICafeteriaMenuAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    let dataString: string = `{
      "menus": [
        {
            "day" : "Today",
            "title" : "Korean Cuisine",
            "description" : "Description for the Korean cuisine",
            "imageUrl" : "https://raw.githubusercontent.com/pnp/AdaptiveCards-Templates/main/samples/visual-list/assets/korean.jpg"
        },
        {
            "day" : "Tomorrow",
            "title" : "Italian Cuisine",
            "description" : "Description for the Italian cuisine",
            "imageUrl" : "https://raw.githubusercontent.com/pnp/AdaptiveCards-Templates/main/samples/visual-list/assets/pizza.jpg"
        }
      ],
      "restaurant_name": "Bootcamp Cafe",
      "restaurant_state": "OPEN",
      "time_to_close": "1 hour"
    }`;

    const dataJson = JSON.parse(dataString);
    
    return {
      menus: this.state.menuItems,
      restaurant_name: dataJson.restaurant_name,
      restaurant_state: dataJson.restaurant_state,
      time_to_close: dataJson.time_to_close
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}