import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import { DETAILED_VIEW_REGISTRY_ID, ICafeteriaMenuAdaptiveCardExtensionProps, ICafeteriaMenuAdaptiveCardExtensionState } from '../CafeteriaMenuAdaptiveCardExtension';
import * as strings from 'CafeteriaMenuAdaptiveCardExtensionStrings';

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

    let hoursToClose = "0"
    if (this.state.restaurantState.state === 'CLOSED') {
      hoursToClose = "N/A";
    }
    else {
      hoursToClose = `${this.state.restaurantState.hours.toString()} hours`;
    }

    return {
      menus: this.state.menuItems,
      restaurant_name: strings.PrimaryText,
      restaurant_state: this.state.restaurantState.state,
      time_to_close: hoursToClose
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