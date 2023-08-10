import {
    BasePrimaryTextCardView,
    IPrimaryTextCardParameters
  } from '@microsoft/sp-adaptive-card-extension-base';
  import { ICafeteriaMenuAdaptiveCardExtensionProps, ICafeteriaMenuAdaptiveCardExtensionState } from '../CafeteriaMenuAdaptiveCardExtension';
  
  export class ErrorView extends BasePrimaryTextCardView<ICafeteriaMenuAdaptiveCardExtensionProps, ICafeteriaMenuAdaptiveCardExtensionState> {
  
    public get data(): IPrimaryTextCardParameters {
      return {
        title: "Uh oh!",
        primaryText: "Error",
        description: this.state.errorMessage,
        iconProperty: "Error"
      };
    }
  }
  