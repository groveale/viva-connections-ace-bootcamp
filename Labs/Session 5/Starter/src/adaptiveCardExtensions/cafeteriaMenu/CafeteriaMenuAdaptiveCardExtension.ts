import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { CafeteriaMenuPropertyPane } from './CafeteriaMenuPropertyPane';
import { ICafeteriaMenuItem } from './models/ICafeteriaMenuItem';
import { CafeteriaMenuService } from './services/CafeteriaMenuService';
import { ICafeteriaMenuService } from './services/ICafeteriaMenuService';

export interface ICafeteriaMenuAdaptiveCardExtensionProps {
  title: string;
  listTitle: string;
  imageUrl: string;
}

export interface ICafeteriaMenuAdaptiveCardExtensionState {
  menuItems: ICafeteriaMenuItem[];
}

const CARD_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_QUICK_VIEW';

export default class CafeteriaMenuAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  ICafeteriaMenuAdaptiveCardExtensionProps,
  ICafeteriaMenuAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: CafeteriaMenuPropertyPane;
  private _client: ICafeteriaMenuService;

  public onInit(): Promise<void> {
    this.state = {
      menuItems: []
    };

    this._client = this.context.serviceScope.consume(CafeteriaMenuService.serviceKey);

    console.log(`this.properties.listTitle: ${this.properties.listTitle}`);
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return this._fetchData();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'CafeteriaMenu-property-pane'*/
      './CafeteriaMenuPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.CafeteriaMenuPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }

  private _fetchData(): Promise<void> {
    return this._client.getMenuItems(this.context.pageContext.site.absoluteUrl, this.properties.listTitle)
      .then((items) => this.setState(
      { 
        menuItems: items 
      }));
  }
  
}
