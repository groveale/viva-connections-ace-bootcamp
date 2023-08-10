import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { CafeteriaMenuPropertyPane } from './CafeteriaMenuPropertyPane';
import { CafeteriaMenuService } from './services/CafeteriaMenuService';
import { ICafeteriaMenuService } from './services/ICafeteriaMenuService';
import { ICafeteriaMenu } from './models/ICafeteriaMenu';
import { DetailedView } from './quickView/DetailedView';
import { ErrorView } from './cardView/ErrorView';

export interface ICafeteriaMenuAdaptiveCardExtensionProps {
  title: string;
  listTitle: string;
  imageUrl: string;
}

export interface ICafeteriaMenuAdaptiveCardExtensionState {
  menuItems: ICafeteriaMenu[];
  selectedMenuItem: ICafeteriaMenu;
  error: boolean
  errorMessage: string
}

const CARD_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_CARD_VIEW';
const ERROR_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_ERROR_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_QUICK_VIEW';
export const DETAILED_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_DETAILED_VIEW';

export default class CafeteriaMenuAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  ICafeteriaMenuAdaptiveCardExtensionProps,
  ICafeteriaMenuAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: CafeteriaMenuPropertyPane;
  private _client: ICafeteriaMenuService;

  public onInit(): Promise<void> {
    this.state = {
      menuItems: [],
      selectedMenuItem: {} as ICafeteriaMenu,
      error: false,
      errorMessage: ''
    };

    this._client = this.context.serviceScope.consume(CafeteriaMenuService.serviceKey);

    console.log(`this.properties.listTitle: ${this.properties.listTitle}`);
    this.cardNavigator.register(ERROR_VIEW_REGISTRY_ID, () => new ErrorView());
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
    this.quickViewNavigator.register(DETAILED_VIEW_REGISTRY_ID, () => new DetailedView());

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
    if (this.state.error) {
      return ERROR_VIEW_REGISTRY_ID;
    }
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }

  private _fetchData(): Promise<void> {
    try {
      return this._client.getMenuItems(this.context.pageContext.site.absoluteUrl, this.properties.listTitle)
        .then((items) => this.setState(
          {
            menuItems: items
          }));
    }
    catch {
      (error: any) => {
        this.setState({
          error: true,
          errorMessage: error.message
        });
      }
    }
    finally {
      return Promise.resolve();
    }
  }
}
