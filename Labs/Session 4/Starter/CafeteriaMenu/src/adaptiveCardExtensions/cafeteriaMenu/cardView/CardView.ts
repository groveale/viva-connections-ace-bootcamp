import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'CafeteriaMenuAdaptiveCardExtensionStrings';
import { ICafeteriaMenuAdaptiveCardExtensionProps, ICafeteriaMenuAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../CafeteriaMenuAdaptiveCardExtension';

export class CardView extends BaseImageCardView<ICafeteriaMenuAdaptiveCardExtensionProps, ICafeteriaMenuAdaptiveCardExtensionState> {
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

  public get data(): IImageCardParameters {
    return {
      primaryText: strings.PrimaryText,
      title: this.properties.title,
      imageUrl: this.properties.imageUrl
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
        parameters: {
          view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}
