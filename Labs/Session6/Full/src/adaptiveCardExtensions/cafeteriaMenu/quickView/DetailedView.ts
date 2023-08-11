import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import { ICafeteriaMenuAdaptiveCardExtensionProps, ICafeteriaMenuAdaptiveCardExtensionState } from '../CafeteriaMenuAdaptiveCardExtension';
import { ICafeteriaMenu } from '../models/ICafeteriaMenu';

export interface IDetailedViewData {
  menu: ICafeteriaMenu
}

export class DetailedView extends BaseAdaptiveCardView<
  ICafeteriaMenuAdaptiveCardExtensionProps,
  ICafeteriaMenuAdaptiveCardExtensionState,
  IDetailedViewData
> {
  public get data(): IDetailedViewData {
    return {
        menu: this.state.selectedMenuItem
    }
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/DetailedViewTemplate.json');
  }
}