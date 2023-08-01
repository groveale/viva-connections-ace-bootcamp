import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import { DETAILED_VIEW_REGISTRY_ID, ICafeteriaMenuAdaptiveCardExtensionProps, ICafeteriaMenuAdaptiveCardExtensionState } from '../CafeteriaMenuAdaptiveCardExtension';

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
      "menus": [],
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

  public async onAction(action: IActionArguments): Promise<void> {
    if ((<ISubmitActionArguments>action).type === 'Submit') {
      const submitAction = <ISubmitActionArguments>action;
      const { id, selectedDay } = submitAction.data;
      if (id === 'menuSelected') {
        const selectedMenuItem = this.state.menuItems.filter((item) => item.day === selectedDay)[0];
        this.setState({ selectedMenuItem: selectedMenuItem });
        this.quickViewNavigator.push(DETAILED_VIEW_REGISTRY_ID);
      }
    }
  }
}